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

    // Scatter some bouncy fruit-ball obstacles for chaos (dynamic bodies)
    this.balls = [];
    const ballColors = [0xFF5FA2, 0x3DDC97, 0x6EC6FF];
    for (let i = 0; i < 10; i++) {
      const r = 1.1 + Math.random() * 0.5;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (this.platformRadius - 3);
      const pos = new THREE.Vector3(Math.cos(angle) * dist, 3 + Math.random() * 3, Math.sin(angle) * dist);
      const geo = new THREE.SphereGeometry(r, 16, 16);
      const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: ballColors[i % ballColors.length] }));
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
