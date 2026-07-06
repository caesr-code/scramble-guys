import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Original blob-bean character design: NOT a copy of any specific game's mesh -
// simple squash-and-stretch capsule body, stubby limbs, big round eyes.
export function buildCharacterMesh(color) {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshToonMaterial({ color });
  const bodyGeo = new THREE.CapsuleGeometry(0.42, 0.5, 6, 12);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.55;
  body.castShadow = true;
  group.add(body);

  // Eyes (two white discs + black pupils) - simple, iconic, original proportions
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x1b2340 });
  const eyeGeo = new THREE.SphereGeometry(0.13, 12, 12);
  const pupilGeo = new THREE.SphereGeometry(0.065, 8, 8);

  const eyeL = new THREE.Mesh(eyeGeo, eyeWhiteMat);
  eyeL.position.set(-0.16, 0.98, 0.36);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.16;

  const pupilL = new THREE.Mesh(pupilGeo, pupilMat);
  pupilL.position.set(-0.16, 0.98, 0.47);
  const pupilR = pupilL.clone();
  pupilR.position.x = 0.16;

  group.add(eyeL, eyeR, pupilL, pupilR);

  // Stubby arms
  const armMat = new THREE.MeshToonMaterial({ color });
  const armGeo = new THREE.CapsuleGeometry(0.13, 0.28, 4, 8);
  const armL = new THREE.Mesh(armGeo, armMat);
  armL.position.set(-0.48, 0.55, 0);
  armL.rotation.z = 0.4;
  const armR = armL.clone();
  armR.position.x = 0.48;
  armR.rotation.z = -0.4;
  group.add(armL, armR);

  // Stubby feet
  const footMat = new THREE.MeshToonMaterial({ color: 0xffffff });
  const footGeo = new THREE.CapsuleGeometry(0.16, 0.1, 4, 8);
  const footL = new THREE.Mesh(footGeo, footMat);
  footL.rotation.x = Math.PI / 2;
  footL.position.set(-0.2, 0.12, 0.08);
  const footR = footL.clone();
  footR.position.x = 0.2;
  group.add(footL, footR);

  group.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });

  return { group, body, armL, armR, footL, footR };
}

const JUMP_SPEED = 9.5;
const MOVE_ACCEL = 45;
const MAX_SPEED = 7;
const AIR_CONTROL = 0.35;
const DIVE_IMPULSE = 11;

export class Character {
  constructor(world, playerMaterial, color, spawnPos, isLocal = false) {
    this.isLocal = isLocal;
    this.color = color;
    this.grounded = false;
    this.diving = false;
    this.diveTimer = 0;
    this.eliminated = false;
    this.qualified = false;
    this.groundNormal = new CANNON.Vec3(0, 1, 0);

    const shape = new CANNON.Sphere(0.45);
    this.body = new CANNON.Body({
      mass: 5,
      shape,
      material: playerMaterial,
      linearDamping: 0.25,
      angularDamping: 1.0,
      fixedRotation: true,
      position: new CANNON.Vec3(spawnPos.x, spawnPos.y, spawnPos.z),
    });
    this.body.allowSleep = false;
    world.addBody(this.body);

    this.body.addEventListener('collide', (e) => {
      const contact = e.contact;
      let n = contact.ni;
      // Make sure normal points away from the other body toward us
      if (contact.bi.id === this.body.id) n = n.scale(-1);
      if (n.y > 0.45) {
        this.grounded = true;
        this.groundNormal.copy(n);
      }
    });

    const mesh = buildCharacterMesh(color);
    this.mesh = mesh.group;
    this.parts = mesh;

    this.velocitySmooth = new THREE.Vector3();
    this.facingAngle = 0;
    this.bobTime = Math.random() * 10;
  }

  applyInput(input, camYaw, dt) {
    if (this.eliminated) return;
    // IMPORTANT: this.grounded reflects contact state from the PREVIOUS physics
    // step's collision events. We must read it for jump/dive decisions first,
    // then clear it at the very end of this method (after all reads) so the
    // upcoming world.step() can set it fresh via new collide events.

    const moveX = input.x || 0;
    const moveZ = input.z || 0;
    const hasInput = Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01;

    if (hasInput) {
      // rotate input by camera yaw so "up" on stick = away from camera
      const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
      const wx = moveX * cos - moveZ * sin;
      const wz = moveX * sin + moveZ * cos;
      const accel = this.grounded ? MOVE_ACCEL : MOVE_ACCEL * AIR_CONTROL;

      this.body.velocity.x += wx * accel * dt;
      this.body.velocity.z += wz * accel * dt;

      this.facingAngle = Math.atan2(wx, wz);
    }

    // clamp horizontal speed
    const vx = this.body.velocity.x, vz = this.body.velocity.z;
    const speed = Math.sqrt(vx * vx + vz * vz);
    const maxSpeed = this.diving ? MAX_SPEED * 1.6 : MAX_SPEED;
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      this.body.velocity.x *= scale;
      this.body.velocity.z *= scale;
    }

    if (input.jump && this.grounded && !this.diving) {
      this.body.velocity.y = JUMP_SPEED;
      this.grounded = false;
    }

    if (input.dive && !this.diving && this.grounded) {
      this.diving = true;
      this.diveTimer = 0.5;
      const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
      const wx = moveX * cos - moveZ * sin || sin * 0;
      const wz = moveX * sin + moveZ * cos || cos * 0;
      const len = Math.sqrt(wx * wx + wz * wz) || 1;
      this.body.velocity.x += (hasInput ? wx / len : Math.sin(this.facingAngle)) * DIVE_IMPULSE;
      this.body.velocity.z += (hasInput ? wz / len : Math.cos(this.facingAngle)) * DIVE_IMPULSE;
      this.body.velocity.y += 2.5;
    }

    if (this.diving) {
      this.diveTimer -= dt;
      if (this.diveTimer <= -1.2) this.diving = false;
    }

    // Clear grounded now that all reads for this frame are done. The upcoming
    // world.step() will set it true again via fresh 'collide' events if we're
    // still in contact with something.
    this.grounded = false;
  }

  postPhysicsUpdate(dt) {
    if (this.diving && this.grounded) {
      this.diving = false;
    }
    this.syncMesh(dt);
  }

  syncMesh(dt) {
    const p = this.body.position;
    this.mesh.position.set(p.x, p.y - 0.45, p.z);

    // smooth facing rotation
    let targetRot = this.facingAngle;
    const curRot = this.mesh.rotation.y;
    let diff = targetRot - curRot;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    this.mesh.rotation.y = curRot + diff * Math.min(1, dt * 10);

    // squash/stretch + dive tilt
    const vy = this.body.velocity.y;
    const speed = Math.sqrt(this.body.velocity.x ** 2 + this.body.velocity.z ** 2);

    if (this.diving) {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, Math.PI * 0.42, dt * 12);
      this.mesh.scale.set(1.05, 0.85, 1.15);
    } else if (!this.grounded) {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, THREE.MathUtils.clamp(-vy * 0.03, -0.3, 0.5), dt * 8);
      const stretch = THREE.MathUtils.clamp(1 - vy * 0.015, 0.85, 1.25);
      this.mesh.scale.set(2 - stretch, stretch, 2 - stretch);
    } else {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, 0, dt * 10);
      this.bobTime += dt * (1 + speed * 0.6);
      const bob = speed > 0.5 ? Math.abs(Math.sin(this.bobTime * 6)) * 0.08 : 0;
      const squash = speed > 0.5 ? 1 - bob * 0.5 : 1;
      this.mesh.scale.set(THREE.MathUtils.lerp(this.mesh.scale.x, 2 - squash, dt * 12), THREE.MathUtils.lerp(this.mesh.scale.y, squash, dt * 12), THREE.MathUtils.lerp(this.mesh.scale.z, 2 - squash, dt * 12));
      this.mesh.position.y += bob;

      // arm swing while moving
      const swing = speed > 0.5 ? Math.sin(this.bobTime * 6) * 0.5 : 0;
      this.parts.armL.rotation.x = swing;
      this.parts.armR.rotation.x = -swing;
    }
  }

  respawn(pos) {
    this.body.position.set(pos.x, pos.y, pos.z);
    this.body.velocity.set(0, 0, 0);
    this.body.angularVelocity.set(0, 0, 0);
    this.diving = false;
    this.eliminated = false;
  }

  eliminate() {
    this.eliminated = true;
    this.mesh.visible = false;
    this.body.position.set(0, -100, 0);
    this.body.velocity.set(0, 0, 0);
  }
}
