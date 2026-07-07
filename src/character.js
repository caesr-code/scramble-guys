import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Original bean-style character design: rounded bean body, a white oval face
// mask, and two vertical black bean-shaped eyes. This shape/pose/proportions
// are our own - simple geometric primitives, not a copied character model.
export function buildCharacterMesh(color) {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshToonMaterial({ color });
  const bodyGeo = new THREE.SphereGeometry(0.5, 24, 18);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.set(0.92, 1.2, 0.92);
  body.position.y = 0.62;
  body.castShadow = true;
  group.add(body);

  const maskMat = new THREE.MeshToonMaterial({ color: 0xfff0ff });
  const maskGeo = new THREE.SphereGeometry(0.34, 18, 14);
  const mask = new THREE.Mesh(maskGeo, maskMat);
  mask.scale.set(1.02, 0.82, 0.5);
  mask.position.set(0, 0.72, 0.38);
  group.add(mask);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x132038 });
  const eyeGeo = new THREE.SphereGeometry(0.065, 10, 10);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.scale.set(0.72, 1.65, 0.55);
  eyeL.position.set(-0.13, 0.72, 0.63);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.13;
  group.add(eyeL, eyeR);

  const armMat = new THREE.MeshToonMaterial({ color });
  const armGeo = new THREE.CapsuleGeometry(0.12, 0.34, 4, 10);
  const armL = new THREE.Mesh(armGeo, armMat);
  armL.position.set(-0.5, 0.52, 0);
  armL.rotation.z = 0.28;
  const armR = armL.clone();
  armR.position.x = 0.5;
  armR.rotation.z = -0.28;
  group.add(armL, armR);

  const footMat = new THREE.MeshToonMaterial({ color });
  const footGeo = new THREE.CapsuleGeometry(0.15, 0.12, 4, 10);
  const footL = new THREE.Mesh(footGeo, footMat);
  footL.rotation.x = Math.PI / 2;
  footL.scale.set(1.15, 0.75, 1);
  footL.position.set(-0.2, 0.1, 0.08);
  const footR = footL.clone();
  footR.position.x = 0.2;
  group.add(footL, footR);

  group.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  return { group, body, mask, armL, armR, footL, footR };
}

const JUMP_SPEED = 10.8;
const MOVE_ACCEL = 54;
const AIR_CONTROL = 0.45;
const MAX_SPEED = 8.4;
const DIVE_IMPULSE = 12.0;
const COYOTE_TIME = 0.16;
const JUMP_BUFFER_TIME = 0.16;
const GROUND_NORMAL_Y = 0.58;
const BODY_RADIUS = 0.43;
const BODY_HALF_HEIGHT = 0.46;
const GROUND_RAY_EXTRA = 0.16;
const TUMBLE_MIN_TIME = 0.42;
const TUMBLE_RECOVERY_TIME = 0.78;
const IMPACT_TUMBLE_SPEED = 8.6;

const STATE = {
  RUN: 'run',
  DIVE: 'dive',
  TUMBLE: 'tumble',
  RECOVER: 'recover',
};

export class Character {
  constructor(world, playerMaterial, color, spawnPos, isLocal = false) {
    this.world = world;
    this.isLocal = isLocal;
    this.color = color;
    this.state = STATE.RUN;
    this.grounded = false;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    this.diving = false;
    this.diveTimer = 0;
    this.diveCooldown = 0;
    this.tumbleTimer = 0;
    this.recoveryTimer = 0;
    this.eliminated = false;
    this.qualified = false;
    this.groundNormal = new CANNON.Vec3(0, 1, 0);
    this.contactNormals = [];
    this.impactSpeed = 0;
    this.lastSafePos = new CANNON.Vec3(spawnPos.x, spawnPos.y, spawnPos.z);

    // Stage 2 controller: a compact upright compound collider, shaped more like a
    // capsule/bean than the old single marble. Rotation stays locked while running
    // for reliable arcade control; tumbles are a controlled state instead of random
    // physics spin so it remains playable in browser multiplayer.
    this.body = new CANNON.Body({
      mass: 5,
      material: playerMaterial,
      linearDamping: 0.08,
      angularDamping: 0.9,
      fixedRotation: true,
      position: new CANNON.Vec3(spawnPos.x, spawnPos.y, spawnPos.z),
    });
    this.body.addShape(new CANNON.Sphere(BODY_RADIUS), new CANNON.Vec3(0, BODY_HALF_HEIGHT, 0));
    this.body.addShape(new CANNON.Sphere(BODY_RADIUS), new CANNON.Vec3(0, -BODY_HALF_HEIGHT, 0));
    this.body.updateMassProperties();
    this.body.allowSleep = false;
    world.addBody(this.body);

    this.body.addEventListener('collide', (e) => {
      const contact = e.contact;
      let n = contact.ni;
      if (contact.bi.id === this.body.id) n = n.scale(-1);
      this.contactNormals.push(n.clone());
      const relative = e.body && e.body.velocity
        ? this.body.velocity.vsub(e.body.velocity).length()
        : this.body.velocity.length();
      this.impactSpeed = Math.max(this.impactSpeed, relative);
      if (n.y > GROUND_NORMAL_Y) {
        this.grounded = true;
        this.groundNormal.copy(n);
        this.coyoteTimer = COYOTE_TIME;
      }
    });

    const mesh = buildCharacterMesh(color);
    this.mesh = mesh.group;
    this.parts = mesh;
    this.velocitySmooth = new THREE.Vector3();
    this.facingAngle = 0;
    this.bobTime = Math.random() * 10;
    this.visualRoll = 0;
  }

  _groundProbe() {
    const from = this.body.position.clone();
    from.y += 0.1;
    const to = this.body.position.clone();
    to.y -= BODY_RADIUS + BODY_HALF_HEIGHT + GROUND_RAY_EXTRA;
    const result = new CANNON.RaycastResult();
    this.world.raycastClosest(from, to, { skipBackfaces: true }, result);
    if (result.hasHit && result.hitNormalWorld.y > GROUND_NORMAL_Y) {
      this.grounded = true;
      this.groundNormal.copy(result.hitNormalWorld);
      this.coyoteTimer = COYOTE_TIME;
      if (this.body.velocity.y < 0) this.body.velocity.y = Math.max(this.body.velocity.y, -2.2);
      this.lastSafePos.copy(this.body.position);
      return true;
    }
    return false;
  }

  _enterDive(hasInput, wx, wz) {
    this.state = STATE.DIVE;
    this.diving = true;
    this.diveTimer = 0.42;
    this.diveCooldown = 0.68;
    const fwdX = hasInput ? wx : Math.sin(this.facingAngle);
    const fwdZ = hasInput ? wz : Math.cos(this.facingAngle);
    this.body.velocity.x = fwdX * Math.max(DIVE_IMPULSE, Math.abs(this.body.velocity.x));
    this.body.velocity.z = fwdZ * Math.max(DIVE_IMPULSE, Math.abs(this.body.velocity.z));
    this.body.velocity.y = Math.max(this.body.velocity.y, this.grounded || this.coyoteTimer > 0 ? 3.6 : 1.5);
    this.grounded = false;
    this.coyoteTimer = 0;
  }

  _enterTumble(reason = 'impact') {
    if (this.state === STATE.TUMBLE) return;
    this.state = STATE.TUMBLE;
    this.diving = false;
    this.tumbleTimer = reason === 'dive' ? TUMBLE_MIN_TIME : TUMBLE_RECOVERY_TIME;
    this.recoveryTimer = 0;
    this.body.linearDamping = 0.32;
  }

  _recoverToRun() {
    this.state = STATE.RUN;
    this.diving = false;
    this.tumbleTimer = 0;
    this.recoveryTimer = 0;
    this.body.linearDamping = 0.08;
    this.visualRoll = 0;
  }

  applyInput(input, camYaw, dt) {
    if (this.eliminated) return;

    this._groundProbe();
    this.coyoteTimer = Math.max(0, this.coyoteTimer - dt);
    this.jumpBufferTimer = input.jump ? JUMP_BUFFER_TIME : Math.max(0, this.jumpBufferTimer - dt);
    this.diveCooldown = Math.max(0, this.diveCooldown - dt);

    const moveX = input.x || 0;
    const moveZ = input.z || 0;
    const hasInput = Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01;

    // Mouse/camera controls facing. WASD/arrow keys move relative to that facing
    // direction and no longer turn the player by themselves. This matches the
    // requested Fall Guys-style control model: mouse = look/face, keys = move.
    this.facingAngle = camYaw - Math.PI;

    let wx = 0;
    let wz = 0;
    if (hasInput) {
      const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
      wx = moveX * cos - moveZ * sin;
      wz = moveX * sin + moveZ * cos;
      const len = Math.hypot(wx, wz) || 1;
      wx /= len;
      wz /= len;
    }

    const canGroundAct = this.grounded || this.coyoteTimer > 0;

    if (this.state === STATE.TUMBLE) {
      this.tumbleTimer -= dt;
      const slideBrake = this.grounded ? Math.max(0, 1 - dt * 3.2) : 1;
      this.body.velocity.x *= slideBrake;
      this.body.velocity.z *= slideBrake;
      if (this.tumbleTimer <= 0 && canGroundAct) {
        this.state = STATE.RECOVER;
        this.recoveryTimer = 0.22;
      }
      this._endFrameContactReset();
      return;
    }

    if (this.state === STATE.RECOVER) {
      this.recoveryTimer -= dt;
      const brake = Math.max(0, 1 - dt * 9);
      this.body.velocity.x *= brake;
      this.body.velocity.z *= brake;
      if (this.recoveryTimer <= 0) this._recoverToRun();
      this._endFrameContactReset();
      return;
    }

    const isDiving = this.state === STATE.DIVE;
    const accel = canGroundAct ? MOVE_ACCEL : MOVE_ACCEL * AIR_CONTROL;
    const targetSpeed = isDiving ? MAX_SPEED * 1.45 : MAX_SPEED;
    const targetVX = hasInput ? wx * targetSpeed : 0;
    const targetVZ = hasInput ? wz * targetSpeed : 0;
    const blend = Math.min(1, accel * dt / Math.max(1, targetSpeed));
    this.body.velocity.x += (targetVX - this.body.velocity.x) * blend;
    this.body.velocity.z += (targetVZ - this.body.velocity.z) * blend;

    if (!hasInput && canGroundAct && !isDiving) {
      const brake = Math.max(0, 1 - dt * 13);
      this.body.velocity.x *= brake;
      this.body.velocity.z *= brake;
    }

    if (this.jumpBufferTimer > 0 && canGroundAct && !isDiving) {
      this.body.velocity.y = JUMP_SPEED;
      this.jumpBufferTimer = 0;
      this.coyoteTimer = 0;
      this.grounded = false;
    }

    if (input.dive && !isDiving && this.diveCooldown <= 0) this._enterDive(hasInput, wx, wz);

    if (this.state === STATE.DIVE) {
      this.diveTimer -= dt;
      if (this.diveTimer <= 0 && canGroundAct) this._enterTumble('dive');
      if (this.diveTimer <= -0.65) this._enterTumble('dive');
    }

    const speed = Math.hypot(this.body.velocity.x, this.body.velocity.z);
    const maxSpeed = this.state === STATE.DIVE ? MAX_SPEED * 1.75 : MAX_SPEED;
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      this.body.velocity.x *= scale;
      this.body.velocity.z *= scale;
    }

    this._endFrameContactReset();
  }

  _endFrameContactReset() {
    this.contactNormals.length = 0;
    this.impactSpeed = 0;
    this.grounded = false;
  }

  postPhysicsUpdate(dt) {
    this._groundProbe();

    for (const n of this.contactNormals) {
      if (n.y < 0.25) {
        const intoWall = this.body.velocity.x * n.x + this.body.velocity.z * n.z;
        if (intoWall < 0) {
          this.body.velocity.x -= n.x * intoWall * 0.78;
          this.body.velocity.z -= n.z * intoWall * 0.78;
        }
      }
    }

    const horizontalSpeed = Math.hypot(this.body.velocity.x, this.body.velocity.z);
    if (this.state !== STATE.TUMBLE && this.impactSpeed > IMPACT_TUMBLE_SPEED && !this.grounded) {
      this._enterTumble('impact');
    }
    if (this.state !== STATE.TUMBLE && this.impactSpeed > IMPACT_TUMBLE_SPEED + 2 && horizontalSpeed > 5.5) {
      this._enterTumble('impact');
    }

    this.syncMesh(dt);
  }

  syncMesh(dt) {
    const p = this.body.position;
    this.mesh.position.set(p.x, p.y - BODY_RADIUS - BODY_HALF_HEIGHT + 0.05, p.z);

    let targetRot = this.facingAngle;
    const curRot = this.mesh.rotation.y;
    let diff = targetRot - curRot;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    this.mesh.rotation.y = curRot + diff * Math.min(1, dt * 10);

    const vy = this.body.velocity.y;
    const speed = Math.hypot(this.body.velocity.x, this.body.velocity.z);

    if (this.state === STATE.TUMBLE) {
      this.visualRoll += dt * (7 + speed * 1.2);
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, Math.PI * 0.62 + Math.sin(this.visualRoll) * 0.3, dt * 10);
      this.mesh.rotation.z = THREE.MathUtils.lerp(this.mesh.rotation.z, Math.sin(this.visualRoll * 0.75) * 0.55, dt * 10);
      this.mesh.scale.set(1.16, 0.72, 1.24);
      this.parts.armL.rotation.x = 1.15;
      this.parts.armR.rotation.x = -1.15;
      return;
    }

    if (this.state === STATE.RECOVER) {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, 0.25, dt * 8);
      this.mesh.rotation.z = THREE.MathUtils.lerp(this.mesh.rotation.z, 0, dt * 8);
      this.mesh.scale.set(1.06, 0.9, 1.12);
      return;
    }

    this.mesh.rotation.z = THREE.MathUtils.lerp(this.mesh.rotation.z, 0, dt * 12);

    if (this.state === STATE.DIVE) {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, Math.PI * 0.42, dt * 12);
      this.mesh.scale.set(1.08, 0.82, 1.18);
    } else if (!this.grounded && this.coyoteTimer <= 0) {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, THREE.MathUtils.clamp(-vy * 0.03, -0.3, 0.5), dt * 8);
      const stretch = THREE.MathUtils.clamp(1 - vy * 0.015, 0.85, 1.25);
      this.mesh.scale.set(2 - stretch, stretch, 2 - stretch);
    } else {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, 0, dt * 10);
      this.bobTime += dt * (1 + speed * 0.6);
      const bob = speed > 0.5 ? Math.abs(Math.sin(this.bobTime * 6)) * 0.08 : 0;
      const squash = speed > 0.5 ? 1 - bob * 0.5 : 1;
      this.mesh.scale.set(
        THREE.MathUtils.lerp(this.mesh.scale.x, 2 - squash, dt * 12),
        THREE.MathUtils.lerp(this.mesh.scale.y, squash, dt * 12),
        THREE.MathUtils.lerp(this.mesh.scale.z, 2 - squash, dt * 12)
      );
      this.mesh.position.y += bob;
      const swing = speed > 0.5 ? Math.sin(this.bobTime * 6) * 0.5 : 0;
      this.parts.armL.rotation.x = swing;
      this.parts.armR.rotation.x = -swing;
    }
  }

  respawn(pos) {
    this.body.position.set(pos.x, pos.y, pos.z);
    this.body.velocity.set(0, 0, 0);
    this.body.angularVelocity.set(0, 0, 0);
    this.state = STATE.RUN;
    this.diving = false;
    this.diveTimer = 0;
    this.diveCooldown = 0;
    this.tumbleTimer = 0;
    this.recoveryTimer = 0;
    this.eliminated = false;
    this.grounded = false;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    this.body.linearDamping = 0.08;
    this.lastSafePos.copy(this.body.position);
  }

  eliminate() {
    this.eliminated = true;
    this.mesh.visible = false;
    this.body.position.set(0, -100, 0);
    this.body.velocity.set(0, 0, 0);
  }
}
