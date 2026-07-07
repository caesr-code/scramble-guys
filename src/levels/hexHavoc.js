import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { BaseLevel } from './baseLevel.js';

// HEX HAVOC survival finale. Stage 6 turns the finale from random disappearing
// floor into Fall-Guys-style stepped tiles: tiles warn, wobble, then drop after
// a bean touches them. The stack remains four playable layers: yellow, yellow,
// blue, blue.
export class HexHavocLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'HEX HAVOC';
    this.timeLimit = 150;
    this.killY = -32;
    this.tiles = [];
    this.dropTimer = 0;
    this.dropInterval = 3.8;
    this.elapsed = 0;
  }

  build() {
    const b = this.builder;
    const hexRadius = 1.35;
    const ringsCount = 5;
    const layerGap = 6.8; // about four beans of vertical space between layers
    const layerColors = [0xFFD23F, 0xFFE56A, 0x49B8FF, 0x247CFF];

    const addHex = (q, r, layer) => {
      const x = hexRadius * 1.5 * q;
      const z = hexRadius * Math.sqrt(3) * (r + q / 2);
      const y = -layer * layerGap;
      const color = layerColors[layer];
      const { mesh, body } = b.hexPrism(hexRadius * 1.03, 0.76, new THREE.Vector3(x, y, z), { color, mass: 0 });
      mesh.userData.layer = layer;
      this.tiles.push({
        mesh, body, x, z, layer, dropped: false, dropTime: 0, baseY: y, color,
        fadeTimer: null, touched: false, touchTimer: 0, pulse: Math.random() * 10,
      });
    };

    for (let layer = 0; layer < 4; layer++) {
      for (let q = -ringsCount; q <= ringsCount; q++) {
        for (let r = -ringsCount; r <= ringsCount; r++) {
          if (Math.abs(q + r) <= ringsCount) addHex(q, r, layer);
        }
      }
    }

    // A soft visual rim under the stack makes depth/readability much better but
    // does not create collision, so it cannot trap players inside the level.
    for (let layer = 0; layer < 4; layer++) {
      const y = -layer * layerGap - 0.38;
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(9.9, 0.07, 8, 72),
        new THREE.MeshToonMaterial({ color: layer < 2 ? 0xFFF0A8 : 0x99DDFF, transparent: true, opacity: 0.45 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, y, 0);
      this.scene.add(ring);
    }

    // Spawns are on the top yellow layer only.
    this.spawnPoints = this.tiles
      .filter(t => t.layer === 0 && Math.abs(t.x) < 5 && Math.abs(t.z) < 5)
      .slice(0, 20)
      .map(t => new THREE.Vector3(t.x, 1.65, t.z));
    while (this.spawnPoints.length < 20) this.spawnPoints.push(new THREE.Vector3(0, 1.65, 0));
  }

  _tileAtPosition(pos) {
    // Match the hex layers by height first so a player falling between layers
    // cannot accidentally trigger tiles below before landing on them.
    let best = null;
    let bestD = Infinity;
    for (let i = 0; i < this.tiles.length; i++) {
      const tile = this.tiles[i];
      if (tile.dropped || tile.touched) continue;
      if (Math.abs(pos.y - (tile.baseY + 1.05)) > 2.25) continue;
      const dx = pos.x - tile.x;
      const dz = pos.z - tile.z;
      const d = Math.hypot(dx, dz);
      if (d < 1.32 && d < bestD) { best = { tile, index: i }; bestD = d; }
    }
    return best;
  }

  tryTouchTileUnder(pos) {
    const hit = this._tileAtPosition(pos);
    if (!hit) return null;
    this.touchTile(hit.index);
    return hit.index;
  }

  touchTile(index) {
    const tile = this.tiles[index];
    if (!tile || tile.dropped || tile.touched) return;
    tile.touched = true;
    tile.touchTimer = 0.42;
    if (tile.mesh.material && tile.mesh.material.color) tile.mesh.material.color.setHex(0xFFFFFF);
  }

  update(dt, t) {
    // Visual-only: safe to run on every machine (host and clients alike), since
    // it only animates/copies state for tiles whose touched/dropped status was
    // already decided authoritatively (by the host, via touchTile()) and
    // broadcast over the network. No randomness or gameplay decisions here.
    for (const tile of this.tiles) {
      if (tile.touched && !tile.dropped) {
        tile.touchTimer -= dt;
        tile.pulse += dt * 28;
        tile.mesh.position.y = tile.baseY + Math.sin(tile.pulse) * 0.045;
        tile.mesh.scale.setScalar(0.96 + Math.sin(tile.pulse * 0.9) * 0.025);
        if (tile.touchTimer <= 0) this.dropTile(tile);
      } else if (!tile.dropped) {
        tile.mesh.position.y = tile.baseY;
        tile.mesh.scale.setScalar(1);
      }

      if (tile.dropped) {
        tile.mesh.position.copy(tile.body.position);
        tile.mesh.quaternion.copy(tile.body.quaternion);
        if (tile.fadeTimer !== null) {
          tile.fadeTimer -= dt;
          if (tile.fadeTimer <= 0) tile.mesh.visible = false;
        }
      }
    }
  }

  // Host-only: decides "stalemate pressure" tile drops using randomness. This
  // must NEVER run independently on clients too - each client would pick
  // different tiles via its own Math.random(), causing exactly the kind of
  // desync where a tile looks solid on your screen but the host (who actually
  // decides collision/elimination) already dropped it, or vice versa. The
  // host calls this and must broadcast every returned tile index over the
  // network so clients mirror the exact same tiles going out.
  hostTick(dt, t) {
    this.elapsed += dt;
    this.dropTimer += dt;
    const touchedIndices = [];

    if (this.elapsed > 28) {
      const intensity = Math.min(1, (this.elapsed - 28) / 90);
      const interval = this.dropInterval * (1 - intensity * 0.35);
      if (this.dropTimer > interval) {
        this.dropTimer = 0;
        const count = 1 + Math.floor(intensity * 1.5);
        const aliveByLayer = [0, 1, 2, 3].map(layer => this.tiles.filter(t => !t.dropped && !t.touched && t.layer === layer));
        let candidates = aliveByLayer.find(list => list.length > 18) || this.tiles.filter(t => !t.dropped && !t.touched);
        for (let i = 0; i < count && candidates.length > 0; i++) {
          const idx = Math.floor(Math.random() * candidates.length);
          const tile = candidates.splice(idx, 1)[0];
          const tileIndex = this.tiles.indexOf(tile);
          this.touchTile(tileIndex);
          touchedIndices.push(tileIndex);
        }
      }
    }

    return touchedIndices;
  }

  dropTile(tile) {
    if (tile.dropped) return;
    tile.dropped = true;
    tile.touched = false;
    tile.dropTime = 0;
    this.world.removeBody(tile.body);
    const newBody = new CANNON.Body({
      mass: 7,
      shape: tile.body.shapes[0],
      material: this.materials.groundMaterial,
      position: tile.body.position.clone(),
      linearDamping: 0.05,
      angularDamping: 0.15,
    });
    newBody.quaternion.copy(tile.body.quaternion);
    newBody.velocity.set(0, -2.2, 0);
    newBody.angularVelocity.set((Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 2.4);
    this.world.addBody(newBody);
    tile.body = newBody;
    tile.fadeTimer = 4.2;
  }

  getSafeTarget(pos, t = 0) {
    const currentLayer = Math.max(0, Math.min(3, Math.round(Math.max(0, -pos.y) / 6.8)));
    const candidates = this.tiles
      .filter(tile => !tile.dropped && !tile.touched && Math.abs(tile.layer - currentLayer) <= 1)
      .map(tile => ({ tile, d: Math.hypot(tile.x - pos.x, tile.z - pos.z) }))
      .filter(o => o.d > 1.1 && o.d < 7.5)
      .sort((a, b) => a.d - b.d);
    if (!candidates.length) return null;
    const pick = candidates[Math.floor((Math.sin(t * 1.7 + pos.x * 3.1 + pos.z) * 0.5 + 0.5) * Math.min(5, candidates.length - 1))] || candidates[0];
    return new THREE.Vector3(pick.tile.x, pick.tile.baseY + 1.1, pick.tile.z);
  }

  checkFinish() { return false; }
}
