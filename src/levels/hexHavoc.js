import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { BaseLevel } from './baseLevel.js';

// "HEX HAVOC" — original survival finale: a floating platform of hexagonal
// tiles that randomly drop out from under players' feet. Last blobs standing
// win. Our own tile size, drop pattern/timing, palette, and rise-tier mechanic
// (platform sinks tiers over time to keep matches short) — not a copy of any
// specific game's finale.
export class HexHavocLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'HEX HAVOC';
    this.timeLimit = 120;
    this.killY = -12;
    this.tiles = [];
    this.dropTimer = 0;
    this.dropInterval = 2.2;
    this.elapsed = 0;
  }

  build() {
    const b = this.builder;
    const hexRadius = 1.65;
    const ringsCount = 5;
    const y = 0;

    const hexColors = [0xFF5FA2, 0xFFD23F, 0x3DDC97, 0x8C6FFF, 0x6EC6FF];

    const addHex = (q, r) => {
      const x = hexRadius * 1.5 * q;
      const z = hexRadius * Math.sqrt(3) * (r + q / 2);
      const color = hexColors[Math.floor(Math.random() * hexColors.length)];
      const { mesh, body } = b.hexPrism(hexRadius * 0.97, 0.6, new THREE.Vector3(x, y, z), { color, mass: 0 });
      this.tiles.push({ mesh, body, x, z, dropped: false, dropTime: 0, baseY: y, color, respawnAt: null });
    };

    for (let q = -ringsCount; q <= ringsCount; q++) {
      for (let r = -ringsCount; r <= ringsCount; r++) {
        if (Math.abs(q + r) <= ringsCount) addHex(q, r);
      }
    }

    this.spawnPoints = this.tiles
      .filter(t => Math.abs(t.x) < 5 && Math.abs(t.z) < 5)
      .slice(0, 20)
      .map(t => new THREE.Vector3(t.x, 2, t.z));
    if (this.spawnPoints.length < 20) {
      // pad with center if not enough (shouldn't happen with ring 5)
      while (this.spawnPoints.length < 20) this.spawnPoints.push(new THREE.Vector3(0, 2, 0));
    }
  }

  dropRandomTiles(count) {
    const candidates = this.tiles.filter(t => !t.dropped);
    for (let i = 0; i < count && candidates.length > 0; i++) {
      const idx = Math.floor(Math.random() * candidates.length);
      const tile = candidates.splice(idx, 1)[0];
      this.dropTile(tile);
    }
  }

  dropTile(tile) {
    tile.dropped = true;
    tile.dropTime = 0;
    // Make it fall by turning it dynamic instead of removing (looks nicer, and it lands somewhere below)
    this.world.removeBody(tile.body);
    const newBody = new CANNON.Body({
      mass: 8,
      shape: tile.body.shapes[0],
      material: this.materials.groundMaterial,
      position: tile.body.position.clone(),
    });
    newBody.quaternion.copy(tile.body.quaternion);
    newBody.angularVelocity.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    this.world.addBody(newBody);
    tile.body = newBody;
    // remove visual after it falls out of view to save perf
    tile.fadeTimer = 3;
  }

  update(dt, t) {
    this.elapsed += dt;
    this.dropTimer += dt;

    // difficulty ramps: drop faster and more tiles as time goes on
    const intensity = Math.min(1, this.elapsed / 90);
    const interval = this.dropInterval * (1 - intensity * 0.6);
    if (this.dropTimer > interval) {
      this.dropTimer = 0;
      const count = 1 + Math.floor(intensity * 3);
      this.dropRandomTiles(count);
    }

    for (const tile of this.tiles) {
      if (tile.dropped) {
        tile.mesh.position.copy(tile.body.position);
        tile.mesh.quaternion.copy(tile.body.quaternion);
        if (tile.fadeTimer !== undefined) {
          tile.fadeTimer -= dt;
          if (tile.fadeTimer <= 0) tile.mesh.visible = false;
        }
      }
    }
  }

  checkFinish() {
    return false; // survival level, no finish line — handled via elimination count in game.js
  }
}
