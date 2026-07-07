import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { BaseLevel } from './baseLevel.js';

// "FRUIT FRENZY" — original collection round: round arena scattered with big
// bouncy fruit balls; a rising tide of goo slowly floods the floor. Collect
// points by knocking fruit into goal rings before you're swept off. Simpler
// scoring version: last N standing on the shrinking safe platform qualify.
// Own shape, hazard type (rising goo not lava/water specifically), and arena size.
export class FruitFrenzyLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'FRUIT FRENZY';
    this.timeLimit = 90;
    this.killY = -10;
    this.platformRadius = 22;
    this.shrinkStart = 20;
    this.minRadius = 6;
    this.elapsed = 0;
    this.goo = null;
  }

  build() {
    const b = this.builder;

    const geo = new THREE.CylinderGeometry(this.platformRadius, this.platformRadius, 1, 48);
    this.platformMesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: 0xFFD23F }));
    this.platformMesh.position.set(0, -0.5, 0);
    this.platformMesh.receiveShadow = true;
    this.scene.add(this.platformMesh);
    const shape = new CANNON.Cylinder(this.platformRadius, this.platformRadius, 1, 48);
    this.platformBody = new CANNON.Body({ mass: 0, shape, material: this.materials.groundMaterial });
    this.platformBody.position.set(0, -0.5, 0);
    this.world.addBody(this.platformBody);

    // Goo hazard visual (rises but doesn't need real physics — kill by Y check like void)
    const gooGeo = new THREE.CylinderGeometry(this.platformRadius + 15, this.platformRadius + 15, 2, 48);
    const gooMat = new THREE.MeshToonMaterial({ color: 0x8C6FFF, transparent: true, opacity: 0.85 });
    this.goo = new THREE.Mesh(gooGeo, gooMat);
    this.goo.position.set(0, -8, 0);
    this.scene.add(this.goo);

    // Rim bumpers and fruit cannons create the colourful fruit-chute vibe.
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      b.cylinder(0.28, 0.28, 1.6, new THREE.Vector3(Math.cos(a) * (this.platformRadius + 0.4), 0.2, Math.sin(a) * (this.platformRadius + 0.4)), { color: i % 2 ? 0xFFFFFF : 0xFF5FA2, radialSegments: 10 });
    }

    // Scatter some bouncy fruit-ball obstacles for chaos (dynamic bodies).
    // Uses the shared seeded RNG (this.rng, from rng.js) rather than plain
    // Math.random(): these are real physics obstacles players can collide
    // with, so host and every client must place them identically or a
    // client's screen could show a ball nowhere near where the host's
    // authoritative simulation actually has it.
    this.balls = [];
    const rng = this.rng || Math.random;
    const ballColors = [0xFF5FA2, 0x3DDC97, 0x6EC6FF];
    for (let i = 0; i < 10; i++) {
      const r = 1.1 + rng() * 0.5;
      const angle = rng() * Math.PI * 2;
      const dist = rng() * (this.platformRadius - 3);
      const pos = new THREE.Vector3(Math.cos(angle) * dist, 3 + rng() * 3, Math.sin(angle) * dist);
      const geo = new THREE.SphereGeometry(r, 16, 16);
      const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: ballColors[i % ballColors.length] }));
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 8), new THREE.MeshToonMaterial({ color: 0x3A2A16 }));
      stem.position.set(0, r * 0.85, 0);
      mesh.add(stem);
      mesh.castShadow = true;
      this.scene.add(mesh);
      const shape = new CANNON.Sphere(r);
      const body = new CANNON.Body({ mass: 3, shape, material: this.materials.bounceMaterial, linearDamping: 0.3 });
      body.position.set(pos.x, pos.y, pos.z);
      this.world.addBody(body);
      this.balls.push({ mesh, body });
    }

    this.spawnPoints = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const dist = this.platformRadius - 4;
      this.spawnPoints.push(new THREE.Vector3(Math.cos(angle) * dist, 2, Math.sin(angle) * dist));
    }
  }

  update(dt, t) {
    this.elapsed += dt;
    for (const ball of this.balls) {
      ball.mesh.position.copy(ball.body.position);
      ball.mesh.quaternion.copy(ball.body.quaternion);
    }

    // Shrink platform after shrinkStart seconds
    if (this.elapsed > this.shrinkStart) {
      const shrinkT = Math.min(1, (this.elapsed - this.shrinkStart) / 60);
      const r = THREE.MathUtils.lerp(this.platformRadius, this.minRadius, shrinkT);
      this.platformMesh.scale.set(r / this.platformRadius, 1, r / this.platformRadius);
      this._currentRadius = r;
    } else {
      this._currentRadius = this.platformRadius;
    }

    // goo rises slowly
    const gooY = THREE.MathUtils.lerp(-8, -1.5, Math.min(1, this.elapsed / 80));
    this.goo.position.y = gooY;
    this._gooY = gooY;
  }

  // custom elimination check for this level: off-platform radius or below goo
  isOutOfBounds(pos) {
    const dist = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
    if (dist > (this._currentRadius || this.platformRadius) + 1.5 && pos.y < 1) return true;
    if (pos.y < (this._gooY || -8) - 2) return true;
    return false;
  }
}
