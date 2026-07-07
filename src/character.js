import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Original bean-style character design: rounded bean body, a white oval face
// mask, and two vertical black bean-shaped eyes. This shape/pose/proportions
// are our own - simple geometric primitives, not a copied character model.
export function buildCharacterMesh(color) {
  const group = new THREE.Group();

  // Rounded bean body - a sphere squashed taller than wide, like an upright egg/bean
  const bodyMat = new THREE.MeshToonMaterial({ color });
  const bodyGeo = new THREE.SphereGeometry(0.5, 20, 16);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.set(0.92, 1.18, 0.92);
  body.position.y = 0.62;
  body.castShadow = true;
  group.add(body);

  // White oval face mask sitting on the front of the bean
  const maskMat = new THREE.MeshToonMaterial({ color: 0xffffff });
  const maskGeo = new THREE.SphereGeometry(0.34, 16, 14);
  const mask = new THREE.Mesh(maskGeo, maskMat);
  mask.scale.set(1, 0.85, 0.55);
  mask.position.set(0, 0.68, 0.36);
  group.add(mask);

  // Two vertical black bean-shaped eyes on the mask
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1b2340 });
  const eyeGeo = new THREE.SphereGeometry(0.09, 10, 10);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.scale.set(0.7, 1.5, 0.6);
  eyeL.position.set(-0.13, 0.68, 0.62);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.13;

  group.add(eyeL, eyeR);

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

const JUMP_SPEED = 10.5;
const MOVE_ACCEL = 42;
const AIR_CONTROL = 0.55;
const MAX_SPEED = 8.2;
const DIVE_IMPULSE = 10.5;
const COYOTE_TIME = 0.14;
const JUMP_BUFFER_TIME = 0.14;
const GROUND_NORMAL_Y = 0.52;

export class Character {
  constructor(world, playerMaterial, color, spawnPos, isLocal = false) {
    this.world = world;
    this.isLocal = isLocal;
    this.color = color;
    this.grounded = false;
    this.groundContacts = 0;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    this.diving = false;
    this.diveTimer = 0;
    this.diveCooldown = 0;
    this.eliminated = false;
    this.qualified = false;
    this.groundNormal = new CANNON.Vec3(0, 1, 0);
    this.contactNormals = [];

    // Stage 1 keeps the simple collider, but tunes it as a stable arcade controller.
    // The visual bean is taller than this sphere; keeping the physics compact prevents
    // snagging on door edges and spinning obstacles while movement is being repaired.
    const shape = new CANNON.Sphere(0.44);
    this.body = new CANNON.Body({
      mass: 5,
      shape,
      material: playerMaterial,
      linearDamping: 0.18,
      angularDamping: 0.95,
      fixedRotation: true,
      position: new CANNON.Vec3(spawnPos.x, spawnPos.y, spawnPos.z),
    });
    this.body.allowSleep = false;
    world.addBody(this.body);

    this.body.addEventListener('collide', (e) => {
      const contact = e.contact;
      let n = contact.ni;
      // Cannon's contact normal points from body i to body j. Convert it so it
      // always points away from the thing we hit and toward this player body.
      if (contact.bi.id === this.body.id) n = n.scale(-1);
      this.contactNormals.push(n.clone());
      if (n.y > GROUND_NORMAL_Y) {
        this.groundContacts++;
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
  }

  applyInput(input, camYaw, dt) {
    if (this.eliminated) return;

    this.coyoteTimer = Math.max(0, this.coyoteTimer - dt);
    this.jumpBufferTimer = input.jump ? JUMP_BUFFER_TIME : Math.max(0, this.jumpBufferTimer - dt);
    this.diveCooldown = Math.max(0, this.diveCooldown - dt);

    const canGroundAct = this.grounded || this.coyoteTimer > 0;
    const moveX = input.x || 0;
    const moveZ = input.z || 0;
    const hasInput = Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01;

    let wx = 0;
    let wz = 0;
    if (hasInput) {
      // Camera-relative movement. Forward input (-z from InputManager) moves
      // away from the camera and keeps WASD/arrow controls consistent.
      const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
      wx = moveX * cos - moveZ * sin;
      wz = moveX * sin + moveZ * cos;
      const len = Math.hypot(wx, wz) || 1;
      wx /= len;
      wz /= len;
      this.facingAngle = Math.atan2(wx, wz);
    }

    // Arcade velocity controller: steer toward a target speed rather than adding
    // endless force. This fixes floaty sliding, sticky starts, and over-accel bugs.
    const accel = canGroundAct ? MOVE_ACCEL : MOVE_ACCEL * AIR_CONTROL;
    const targetSpeed = this.diving ? MAX_SPEED * 1.45 : MAX_SPEED;
    const targetVX = hasInput ? wx * targetSpeed : 0;
    const targetVZ = hasInput ? wz * targetSpeed : 0;
    const blend = Math.min(1, accel * dt / Math.max(1, targetSpeed));
    this.body.velocity.x += (targetVX - this.body.velocity.x) * blend;
    this.body.velocity.z += (targetVZ - this.body.velocity.z) * blend;

    // Extra ground braking so the bean stops when you let go instead of ice-skating.
    if (!hasInput && canGroundAct && !this.diving) {
      const brake = Math.max(0, 1 - dt * 12);
      this.body.velocity.x *= brake;
      this.body.velocity.z *= brake;
    }

    // Jump buffering + coyote time make jumping reliable even at uneven frame rates.
    if (this.jumpBufferTimer > 0 && canGroundAct && !this.diving) {
      this.body.velocity.y = JUMP_SPEED;
      this.jumpBufferTimer = 0;
      this.coyoteTimer = 0;
      this.grounded = false;
    }

    // Fall Guys-style dive is mainly an air action. Allow it in the air, and also
    // from the ground as a quick belly flop so the key never feels dead.
    if (input.dive && !this.diving && this.diveCooldown <= 0) {
      this.diving = true;
      this.diveTimer = 0.42;
      this.diveCooldown = 0.65;
      const fwdX = hasInput ? wx : Math.sin(this.facingAngle);
      const fwdZ = hasInput ? wz : Math.cos(this.facingAngle);
      this.body.velocity.x = fwdX * Math.max(DIVE_IMPULSE, Math.abs(this.body.velocity.x));
      this.body.velocity.z = fwdZ * Math.max(DIVE_IMPULSE, Math.abs(this.body.velocity.z));
      this.body.velocity.y = Math.max(this.body.velocity.y, canGroundAct ? 3.3 : 1.4);
      this.grounded = false;
      this.coyoteTimer = 0;
    }

    if (this.diving) {
      this.diveTimer -= dt;
      // Recover once the dive timer has elapsed and the player is on the ground again.
      if (this.diveTimer <= 0 && canGroundAct) this.diving = false;
      if (this.diveTimer <= -0.8) this.diving = false;
    }

    // Horizontal speed safety clamp.
    const speed = Math.hypot(this.body.velocity.x, this.body.velocity.z);
    const maxSpeed = this.diving ? MAX_SPEED * 1.7 : MAX_SPEED;
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      this.body.velocity.x *= scale;
      this.body.velocity.z *= scale;
    }

    // Reset contact info for the upcoming physics step. postPhysicsUpdate() will
    // rebuild grounded/coyote state from the new collisions.
    this.groundContacts = 0;
    this.contactNormals.length = 0;
    this.grounded = false;
  }

  postPhysicsUpdate(dt) {
    this.grounded = this.groundContacts > 0;
    if (this.grounded) this.coyoteTimer = COYOTE_TIME;

    // If a wall/obstacle contact is mostly sideways, push slightly along the
    // normal so the player does not glue to corners or door frames.
    for (const n of this.contactNormals) {
      if (n.y < 0.25) {
        const intoWall = this.body.velocity.x * n.x + this.body.velocity.z * n.z;
        if (intoWall < 0) {
          this.body.velocity.x -= n.x * intoWall * 0.75;
          this.body.velocity.z -= n.z * intoWall * 0.75;
        }
      }
    }

    if (this.diving && this.grounded && this.diveTimer <= 0) this.diving = false;
    this.syncMesh(dt);
  }

  syncMesh(dt) {
    const p = this.body.position;
    this.mesh.position.set(p.x, p.y - 0.45, p.z);

    let targetRot = this.facingAngle;
    const curRot = this.mesh.rotation.y;
    let diff = targetRot - curRot;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    this.mesh.rotation.y = curRot + diff * Math.min(1, dt * 10);

    const vy = this.body.velocity.y;
    const speed = Math.hypot(this.body.velocity.x, this.body.velocity.z);

    if (this.diving) {
      this.mesh.rotation.x = THREE.MathUtils.lerp(this.mesh.rotation.x, Math.PI * 0.42, dt * 12);
      this.mesh.scale.set(1.05, 0.85, 1.15);
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
    this.diving = false;
    this.diveTimer = 0;
    this.diveCooldown = 0;
    this.eliminated = false;
    this.grounded = false;
    this.groundContacts = 0;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
  }

  eliminate() {
    this.eliminated = true;
    this.mesh.visible = false;
    this.body.position.set(0, -100, 0);
    this.body.velocity.set(0, 0, 0);
  }
}
