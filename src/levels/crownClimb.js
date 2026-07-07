import * as THREE from 'three';
import { BaseLevel } from './baseLevel.js';

export class CrownClimbLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'CROWN CLIMB';
    this.timeLimit = 90;
    this.killY = -18;
    this.finishZ = -92;
    this.sweepers = [];
  }

  build() {
    const b = this.builder;
    const width = 14;
    for (let i = 0; i < 8; i++) {
      const z = 4 - i * 12;
      const y = -0.45 + i * 0.22;
      b.box(width - (i % 2) * 1.5, 1, 9.2, new THREE.Vector3(0, y, z), { color: i % 2 ? 0xf2c879 : 0x6ec6ff, grid: true });
      if (i > 0) b.box(width - 1.5, 0.55, 3.2, new THREE.Vector3(0, y + 0.55, z + 6.2), { color: 0xffffff });
      if (i >= 2 && i <= 6) {
        const sweeper = b.box(10, 0.35, 0.35, new THREE.Vector3(0, y + 1.05, z), { color: 0xff5fa2 });
        sweeper.body.collisionResponse = false;
        this.sweepers.push({ body: sweeper.body, mesh: sweeper.mesh, z, y: y + 1.05, phase: i * 0.8 });
      }
    }
    for (const side of [-1, 1]) b.box(0.8, 4, 105, new THREE.Vector3(side * 8, 1.2, -42), { color: 0x251b45 });
    b.arch(width - 0.5, 6, this.finishZ, 0xffd23f, 0xffffff);
    b.box(width, 1, 10, new THREE.Vector3(0, 1.05, this.finishZ - 4), { color: 0x3ddc97 });
    this.spawnPoints = [];
    for (let i = 0; i < 20; i++) this.spawnPoints.push(new THREE.Vector3(-5.2 + (i % 5) * 2.6, 1.85, 6 + Math.floor(i / 5) * 1.05));
  }

  applySpecialForces(ch, dt, t) {
    const p = ch.body.position;
    for (const s of this.sweepers) {
      const x = Math.sin(t * 1.8 + s.phase) * 3.8;
      s.body.position.x = x;
      s.body.position.y = s.y;
      s.body.position.z = s.z;
      s.mesh.position.copy(s.body.position);
      if (Math.abs(p.z - s.z) < 0.8 && Math.abs(p.x - x) < 5.2 && Math.abs(p.y - s.y) < 1.1) {
        const dir = Math.sign(Math.cos(t * 1.8 + s.phase)) || 1;
        ch.body.velocity.x += dir * 18 * dt;
        ch.body.velocity.y = Math.max(ch.body.velocity.y, 3.6);
      }
    }
  }

  checkFinish(pos) { return pos.z < this.finishZ + 4; }
}
