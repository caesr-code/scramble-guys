import * as THREE from 'three';
import { BaseLevel } from './baseLevel.js';

export class TumbleTempleLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'TUMBLE TEMPLE';
    this.timeLimit = 85;
    this.killY = -18;
    this.finishZ = -88;
    this.bumpers = [];
  }

  build() {
    const b = this.builder;
    const width = 15;
    b.box(width, 1, 105, new THREE.Vector3(0, -0.5, -42), { color: 0x7bdcff, grid: true });
    b.arch(width - 0.5, 5.2, 8, 0xff5fa2, 0xffd23f);
    b.arch(width - 0.5, 5.2, this.finishZ, 0x3ddc97, 0xffffff);
    for (const side of [-1, 1]) b.box(1, 3.5, 105, new THREE.Vector3(side * 8, 1.3, -42), { color: 0x8c6fff });
    for (const z of [-12, -31, -50, -69]) {
      const gate = b.box(12, 0.45, 0.7, new THREE.Vector3(0, 0.9, z), { color: 0xff8a5c });
      gate.mesh.rotation.z = 0.15;
      for (const x of [-4, 0, 4]) {
        const bumper = b.cylinder(1.0, 1.0, 1.0, new THREE.Vector3(x, 0.5, z - 5), { color: 0xffd23f, radialSegments: 18 });
        bumper.body.userData = { push: true };
        this.bumpers.push(bumper);
      }
    }
    b.box(width, 1, 10, new THREE.Vector3(0, -0.5, this.finishZ - 4), { color: 0x3ddc97 });
    this.spawnPoints = [];
    for (let i = 0; i < 20; i++) this.spawnPoints.push(new THREE.Vector3(-5.2 + (i % 5) * 2.6, 1.85, 6 + Math.floor(i / 5) * 1.05));
  }

  applySpecialForces(ch, dt, t) {
    const p = ch.body.position;
    for (const bumper of this.bumpers) {
      const dx = p.x - bumper.body.position.x;
      const dz = p.z - bumper.body.position.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.01 && d < 1.45 && Math.abs(p.y - bumper.body.position.y) < 2.2) {
        ch.body.velocity.x += (dx / d) * 26 * dt;
        ch.body.velocity.z += (dz / d) * 26 * dt;
        ch.body.velocity.y = Math.max(ch.body.velocity.y, 4.2);
      }
    }
  }

  checkFinish(pos) { return pos.z < this.finishZ + 4; }
}
