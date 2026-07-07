import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { BaseLevel } from './baseLevel.js';

// Large season-two-inspired race: neon sky platforms, low-gravity launch pads,
// laser gates, flippers, conveyor lanes and a final fan gauntlet. All geometry is
// original procedural artwork but aims for the bright official obstacle-course feel.
export class SkylineCircuitLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'SKYLINE CIRCUIT';
    this.timeLimit = 165;
    this.killY = -18;
    this.finishZ = -158;
    this.movers = [];
    this.launchPads = [];
  }

  build() {
    const b = this.builder;
    const W = 15;
    b.box(W, 1, 22, new THREE.Vector3(0, -0.5, 12), { color: 0xF7D55A, grid: true });
    b.box(W + 2, 3.5, 0.8, new THREE.Vector3(0, 1.25, 23), { color: 0x743CFF });
    b.arch(W + 1, 5.4, this.finishZ, 0x00D4FF, 0xFFFFFF);

    // Suspended segmented race path with neon guard rails.
    const segments = [
      [0, -10, 22, 0x45C7FF], [3, -34, 20, 0xE967FF], [-3, -58, 22, 0x45C7FF],
      [0, -84, 24, 0x67F279], [0, -113, 24, 0xF7D55A], [0, -143, 24, 0x45C7FF],
    ];
    for (const [x, z, len, color] of segments) {
      b.box(W, 1, len, new THREE.Vector3(x, -0.5, z), { color, grid: true });
      for (const side of [-1, 1]) b.box(0.35, 1.0, len, new THREE.Vector3(x + side * (W/2 + 0.18), 0.25, z), { color: 0xFFFFFF });
      for (let i = 0; i < 6; i++) {
        const dot = b.cylinder(0.16, 0.16, 0.18, new THREE.Vector3(x - W/2 + 1.5 + i * 2.4, 0.22, z - len/2 + 1.2), { color: 0xFFF2A6, radialSegments: 10 });
        dot.mesh.rotation.x = Math.PI / 2;
      }
    }

    // Launch pads that bounce beans across tiny gaps.
    for (const z of [-22, -70, -125]) {
      const pad = b.box(4.2, 0.35, 2.4, new THREE.Vector3(0, 0.05, z), { color: 0xFF7BD5, material: this.materials.bounceMaterial });
      pad.mesh.userData.launchPad = true;
      this.launchPads.push(pad);
      const arrow = b.box(1.2, 0.08, 1.2, new THREE.Vector3(0, 0.28, z - 0.2), { color: 0xFFFFFF, mass: 0 });
      arrow.mesh.rotation.y = Math.PI / 4;
    }

    // Rotating sweepers and flippers.
    for (let i = 0; i < 5; i++) {
      const z = -42 - i * 14;
      const body = new CANNON.Body({ mass: 0, material: this.materials.groundMaterial });
      body.addShape(new CANNON.Box(new CANNON.Vec3(5.8, 0.16, 0.16)));
      body.position.set((i % 2 ? 2.5 : -2.5), 0.75, z);
      this.world.addBody(body);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.32, 0.32), new THREE.MeshToonMaterial({ color: i % 2 ? 0xFFFFFF : 0x251B45 }));
      mesh.castShadow = true; mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.movers.push({ body, mesh, baseZ: z, spin: (i % 2 ? -1 : 1) * (1.15 + i * 0.12), kind: 'bar' });
      b.cylinder(0.48, 0.48, 0.35, new THREE.Vector3(body.position.x, 0.74, z), { color: 0xFFD23F, radialSegments: 18 });
    }

    // Laser gates: thin raised blocks to hop/dive over.
    for (let i = 0; i < 7; i++) {
      const z = -96 - i * 5;
      const x = (i % 2 ? -2.6 : 2.6);
      b.box(7.5, 0.55, 0.34, new THREE.Vector3(x, 0.55, z), { color: i % 2 ? 0xFF4DD8 : 0x37E8FF, emissive: i % 2 ? 0xFF4DD8 : 0x37E8FF });
    }

    b.box(W, 1, 14, new THREE.Vector3(0, -0.5, this.finishZ - 6), { color: 0x3DDC97, grid: true });
    this.spawnPoints = [];
    for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) this.spawnPoints.push(new THREE.Vector3(-6 + col * 3, 1.5, 17 + row * 1.8));
  }

  update(dt, t) {
    for (const m of this.movers) {
      m.body.quaternion.setFromEuler(0, t * m.spin, 0);
      m.mesh.position.copy(m.body.position);
      m.mesh.quaternion.copy(m.body.quaternion);
    }
  }

  applySpecialForces(ch) {
    const p = ch.body.position;
    for (const pad of this.launchPads) {
      const dx = Math.abs(p.x - pad.body.position.x), dz = Math.abs(p.z - pad.body.position.z);
      if (dx < 2.7 && dz < 1.8 && p.y < 1.6 && ch.body.velocity.y <= 2) {
        ch.body.velocity.y = 13.5;
        ch.body.velocity.z -= 4.5;
      }
    }
  }

  checkFinish(pos) { return pos.z < this.finishZ + 4; }
}
