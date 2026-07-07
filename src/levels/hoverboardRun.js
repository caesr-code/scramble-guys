import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { BaseLevel } from './baseLevel.js';

// Large final-style survival/race hybrid: a moving hoverboard carries players
// through obstacle waves, punch blocks and swinging gates before a finish arch.
export class HoverboardRunLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'HOVERBOARD RUN';
    this.timeLimit = 180;
    this.killY = -16;
    this.finishZ = -220;
    this.platform = null;
    this.obstacles = [];
    this.elapsed = 0;
    this.boardStartDelay = 5;
    this.boardSpeed = 3.2;
    this.boardStartZ = 7.5;
  }

  build() {
    const b = this.builder;
    const start = b.box(14, 1, 18, new THREE.Vector3(0, -0.5, 12), { color: 0xFFD23F, grid: true });
    b.box(16, 3.5, 0.8, new THREE.Vector3(0, 1.25, 22.5), { color: 0x8C6FFF });
    this.platform = b.box(14, 0.75, 16, new THREE.Vector3(0, -0.05, this.boardStartZ), { color: 0x3DDCFF, grid: true });
    this.platform.body.type = CANNON.Body.KINEMATIC;
    this.platform.body.mass = 0;
    this.platform.body.updateMassProperties();

    // Invisible guide track/visual islands.
    for (let z = -18; z > this.finishZ - 10; z -= 18) {
      b.box(16, 0.35, 2.2, new THREE.Vector3(0, -1.05, z), { color: z % 36 === 0 ? 0xE967FF : 0x67F279, visible: true });
      for (const side of [-1, 1]) b.cylinder(0.22, 0.22, 2.4, new THREE.Vector3(side * 8.2, 0.25, z), { color: 0xFFFFFF, radialSegments: 12 });
    }

    // Moving punch blocks and sweeping gates anchored around the board path.
    for (let i = 0; i < 12; i++) {
      const z = -30 - i * 14.5;
      const body = new CANNON.Body({ mass: 0, material: this.materials.groundMaterial });
      body.addShape(new CANNON.Box(new CANNON.Vec3(1.3, 1.0, 0.8)));
      body.position.set(i % 2 ? -5.5 : 5.5, 1.0, z);
      this.world.addBody(body);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.0, 1.6), new THREE.MeshToonMaterial({ color: i % 2 ? 0xFF5FA2 : 0xFFD23F }));
      mesh.castShadow = true; mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.obstacles.push({ body, mesh, z, side: i % 2 ? -1 : 1, phase: i * 0.9, kind: 'punch' });
    }
    for (let i = 0; i < 8; i++) {
      const z = -45 - i * 22;
      const body = new CANNON.Body({ mass: 0, material: this.materials.groundMaterial });
      body.addShape(new CANNON.Box(new CANNON.Vec3(5.5, 0.18, 0.18)));
      body.position.set(0, 1.3, z);
      this.world.addBody(body);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(11, 0.36, 0.36), new THREE.MeshToonMaterial({ color: 0x251B45 }));
      mesh.castShadow = true; this.scene.add(mesh);
      this.obstacles.push({ body, mesh, z, phase: i * 1.5, kind: 'gate' });
    }

    b.arch(15, 5.4, this.finishZ, 0x3DDC97, 0xFFFFFF);
    b.box(16, 1, 13, new THREE.Vector3(0, -0.5, this.finishZ - 5), { color: 0x3DDC97, grid: true });
    this.spawnPoints = [];
    for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) this.spawnPoints.push(new THREE.Vector3(-5.2 + col * 2.6, 1.55, 6.5 + row * 1.35));
  }

  update(dt, t) {
    this.elapsed += dt;
    const movingTime = Math.max(0, this.elapsed - this.boardStartDelay);
    const boardZ = Math.max(this.finishZ + 5, this.boardStartZ - movingTime * this.boardSpeed);
    this.platform.body.position.set(0, -0.05, boardZ);
    const moving = this.elapsed >= this.boardStartDelay && boardZ > this.finishZ + 5;
    this.platform.body.velocity.set(0, 0, moving ? -this.boardSpeed : 0);
    this.platform.mesh.position.copy(this.platform.body.position);

    for (const o of this.obstacles) {
      if (o.kind === 'punch') {
        const x = o.side * (3.6 + Math.sin(t * 2.4 + o.phase) * 2.3);
        o.body.position.set(x, 1.0, o.z);
      } else {
        o.body.quaternion.setFromEuler(0, Math.sin(t * 1.5 + o.phase) * 0.9, 0);
      }
      o.mesh.position.copy(o.body.position);
      o.mesh.quaternion.copy(o.body.quaternion);
    }
  }

  isOutOfBounds(pos) {
    // Once the board has passed, stragglers fall out just like hoverboard rounds.
    if (!this.platform) return false;
    return pos.z > this.platform.body.position.z + 20 && pos.z < -12;
  }

  checkFinish(pos) { return pos.z < this.finishZ + 4; }
}
