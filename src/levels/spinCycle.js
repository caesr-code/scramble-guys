import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { BaseLevel } from './baseLevel.js';

// "SPIN CYCLE" — original hazard-race level: cross a long bridge past a series
// of rotating bars/pendulums that knock you off if you don't time your run,
// then a final seesaw before the finish. Our own hazard count, spin speeds,
// spacing, and finish design.
export class SpinCycleLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'SPIN CYCLE';
    this.timeLimit = 90;
    this.killY = -15;
    this.spinners = [];
    this.finishZ = -100;
  }

  build() {
    const b = this.builder;
    const bridgeWidth = 10;
    const bridgeLength = 120;

    b.box(bridgeWidth, 1, bridgeLength, new THREE.Vector3(0, -0.5, -bridgeLength / 2 + 5), { color: 0x6EC6FF, grid: true });
    b.arch(bridgeWidth + 0.8, 5.1, 13.5, 0x8C6FFF, 0xFFD23F);
    b.arch(bridgeWidth + 0.8, 5.3, this.finishZ, 0x3DDC97, 0xFFFFFF);
    b.box(bridgeWidth, 1, 10, new THREE.Vector3(0, -0.5, 10), { color: 0xFFD23F }); // start pad
    b.box(bridgeWidth + 2, 3.5, 0.8, new THREE.Vector3(0, 1.25, 19.8), { color: 0x8C6FFF }); // rear start barrier

    // Spinning bar hazards: each is a long box rotating around a vertical axis pivot
    const spinnerZs = [-15, -30, -45, -60, -75];
    spinnerZs.forEach((z, i) => {
      const speed = 1.6 + i * 0.35;
      const dir = i % 2 === 0 ? 1 : -1;
      const armLength = 7.5;

      const geo = new THREE.BoxGeometry(armLength * 2, 1.4, 1.1);
      const mat = new THREE.MeshToonMaterial({ color: i % 2 ? 0xFFD23F : 0xFF5FA2 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, 1.2, z);
      mesh.castShadow = true;
      this.scene.add(mesh);

      // pivot pole (visual only)
      const poleGeo = new THREE.CylinderGeometry(0.25, 0.25, 3, 10);
      const pole = new THREE.Mesh(poleGeo, new THREE.MeshToonMaterial({ color: 0xffffff }));
      pole.position.set(0, 0.5, z);
      this.scene.add(pole);

      const shape = new CANNON.Box(new CANNON.Vec3(armLength, 0.7, 0.55));
      const body = new CANNON.Body({ mass: 0, shape, material: this.materials.groundMaterial });
      body.position.set(0, 1.2, z);
      body.type = CANNON.Body.KINEMATIC;
      this.world.addBody(body);

      this.spinners.push({ mesh, body, angle: Math.random() * Math.PI * 2, speed, dir });
    });

    // Final seesaw before finish
    const seesawZ = -90;
    const seesawGeo = new THREE.BoxGeometry(bridgeWidth - 1, 0.6, 12);
    const seesawMesh = new THREE.Mesh(seesawGeo, new THREE.MeshToonMaterial({ color: 0x3DDC97 }));
    seesawMesh.position.set(0, 0.8, seesawZ);
    seesawMesh.castShadow = true;
    this.scene.add(seesawMesh);
    const seesawShape = new CANNON.Box(new CANNON.Vec3((bridgeWidth - 1) / 2, 0.3, 6));
    const seesawBody = new CANNON.Body({ mass: 40, shape: seesawShape, material: this.materials.groundMaterial, angularDamping: 0.6, linearDamping: 0.8 });
    seesawBody.position.set(0, 0.8, seesawZ);
    // constrain to pivot: lock x,z position and y/x/z rotation except tilt around x axis
    const pivotBody = new CANNON.Body({ mass: 0 });
    pivotBody.position.set(0, 0.8, seesawZ);
    this.world.addBody(seesawBody);
    this.world.addBody(pivotBody);
    const hinge = new CANNON.HingeConstraint(pivotBody, seesawBody, {
      pivotA: new CANNON.Vec3(0, 0, 0),
      pivotB: new CANNON.Vec3(0, 0, 0),
      axisA: new CANNON.Vec3(1, 0, 0),
      axisB: new CANNON.Vec3(1, 0, 0),
    });
    this.world.addConstraint(hinge);
    this.seesaw = { mesh: seesawMesh, body: seesawBody };

    b.box(bridgeWidth, 1, 12, new THREE.Vector3(0, -0.5, this.finishZ - 6), { color: 0x3DDC97 });

    this.spawnPoints = [];
    for (let i = 0; i < 20; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      this.spawnPoints.push(new THREE.Vector3(-4 + col * 2, 1.5, 14 + row * 2));
    }
  }

  update(dt, t) {
    for (const s of this.spinners) {
      s.angle += s.speed * s.dir * dt;
      s.mesh.rotation.y = s.angle;
      const q = new CANNON.Quaternion();
      q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), s.angle);
      s.body.quaternion.copy(q);
    }
    if (this.seesaw) {
      this.seesaw.mesh.position.copy(this.seesaw.body.position);
      this.seesaw.mesh.quaternion.copy(this.seesaw.body.quaternion);
    }
  }

  checkFinish(pos) {
    return pos.z < this.finishZ + 4;
  }
}
