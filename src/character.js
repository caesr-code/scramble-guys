import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Original bean-style character design: rounded bean body, a white oval face
// mask, and two vertical black bean-shaped eyes. This shape/pose/proportions
// are our own - simple geometric primitives, not a copied character model.
function toonMat(color, opts = {}) {
  return new THREE.MeshToonMaterial({
    color,
    emissive: opts.emissive || 0x000000,
    emissiveIntensity: opts.emissiveIntensity || 0,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
  });
}

function addCapsulePart(group, radius, length, color, pos, rot = [0, 0, 0], scale = [1, 1, 1]) {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 8, 18), toonMat(color));
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  group.add(mesh);
  return mesh;
}

function addSpot(group, x, y, z, sx, sy, color, rot = 0) {
  const geo = new THREE.SphereGeometry(0.12, 14, 10);
  const m = new THREE.Mesh(geo, toonMat(color));
  m.scale.set(sx, sy, 0.08);
  m.position.set(x, y, z);
  m.rotation.z = rot;
  m.castShadow = true;
  group.add(m);
  return m;
}

// Stage 5 visual pass: a chunkier, cleaner bean with a glossy body, big oval
// faceplate, tiny vertical eyes, gloves/boots, backpack straps and skin patterns.
// It is still procedural geometry, but the silhouette/proportions are now much
// closer to the supplied reference image instead of the previous plain blob.
export function buildCharacterMesh(color, cosmetic = {}) {
  const group = new THREE.Group();
  const mainColor = color;
  const darker = new THREE.Color(color).multiplyScalar(0.66).getHex();
  const lighter = new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.32).getHex();
  const trim = new THREE.Color(color).offsetHSL(0.08, 0.08, -0.08).getHex();

  const bodyMat = toonMat(mainColor);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.46, 0.72, 12, 28), bodyMat);
  body.scale.set(1.14, 1.15, 1.03);
  body.position.y = 0.72;
  body.castShadow = true;
  group.add(body);

  // soft belly/highlight patch so the bean has depth from the front view
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 14), toonMat(lighter, { transparent: true, opacity: 0.62 }));
  belly.scale.set(0.92, 1.18, 0.12);
  belly.position.set(0, 0.58, 0.485);
  belly.castShadow = false;
  group.add(belly);

  // Reference-style white face mask with a dark rim and simple black eyes.
  const rim = new THREE.Mesh(new THREE.SphereGeometry(0.335, 28, 18), toonMat(0x251b45));
  rim.scale.set(1.20, 0.93, 0.28);
  rim.position.set(0, 0.92, 0.52);
  rim.castShadow = true;
  group.add(rim);

  const maskMat = toonMat(0xfff4ff);
  const mask = new THREE.Mesh(new THREE.SphereGeometry(0.31, 28, 18), maskMat);
  mask.scale.set(1.14, 0.86, 0.25);
  mask.position.set(0, 0.92, 0.555);
  mask.castShadow = true;
  group.add(mask);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x11172b });
  const eyeGeo = new THREE.SphereGeometry(0.054, 14, 12);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.scale.set(0.66, 1.95, 0.42);
  eyeL.position.set(-0.12, 0.92, 0.735);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.12;
  group.add(eyeL, eyeR);

  // costume straps and belt give the front the detail missing from earlier builds
  const strapMat = toonMat(0x2b2350);
  for (const x of [-0.22, 0.22]) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.58, 0.05), strapMat);
    strap.position.set(x, 0.48, 0.50);
    strap.rotation.z = x < 0 ? -0.15 : 0.15;
    strap.castShadow = true;
    group.add(strap);
  }
  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.08, 0.05), toonMat(0xffffff));
  belt.position.set(0, 0.29, 0.51);
  belt.castShadow = true;
  group.add(belt);
  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.07), toonMat(0xffd23f));
  buckle.position.set(0, 0.29, 0.56);
  buckle.castShadow = true;
  group.add(buckle);

  const skin = cosmetic.skin || 'Rookie Bean';
  if (skin === 'Lightning') {
    const bolt = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.46, 3), toonMat(0xfff100));
    bolt.position.set(0.02, 0.72, 0.61);
    bolt.rotation.z = -0.42;
    bolt.rotation.y = Math.PI / 2;
    bolt.castShadow = true;
    group.add(bolt);
  } else if (skin === 'Galaxy') {
    for (let i = 0; i < 10; i++) {
      const star = new THREE.Mesh(new THREE.SphereGeometry(0.025 + (i % 3) * 0.012, 8, 6), toonMat(i % 2 ? 0xffffff : 0xffd23f));
      const a = i * 2.17;
      star.position.set(Math.cos(a) * 0.32, 0.42 + (i % 5) * 0.17, 0.54 + Math.sin(a) * 0.04);
      group.add(star);
    }
  } else if (skin === 'Dino Spots') {
    for (let i = 0; i < 5; i++) addSpot(group, -0.22 + i * 0.11, 1.28 + Math.sin(i) * 0.05, 0.42, 0.26, 0.35, 0x3DDC97, i * 0.2);
  } else if (skin === 'Star Belt') {
    const star = new THREE.Mesh(new THREE.ConeGeometry(0.105, 0.08, 5), toonMat(0xffd23f));
    star.position.set(0, 0.31, 0.61);
    star.rotation.z = Math.PI / 5;
    group.add(star);
  }

  // side colour patches / freckles, varied by body colour so bots don't look cloned
  const hueSeed = Math.floor(color * 997) % 6;
  const spotColors = [0xffffff, 0xffd23f, 0x6ec6ff, 0x3ddc97, 0xff8a5c, 0xc96fff];
  addSpot(group, -0.36, 0.72, 0.36, 0.65, 0.85, spotColors[hueSeed], -0.35);
  addSpot(group, 0.36, 0.52, 0.34, 0.52, 0.72, spotColors[(hueSeed+2)%spotColors.length], 0.45);
  addSpot(group, 0.28, 1.20, 0.29, 0.38, 0.50, lighter, 0.2);

  // arms are thicker, glove-like and attached low like Fall Guys beans.
  const armL = addCapsulePart(group, 0.105, 0.42, mainColor, [-0.55, 0.62, 0.04], [0.18, 0.02, 0.55], [0.95, 1.05, 0.95]);
  const armR = addCapsulePart(group, 0.105, 0.42, mainColor, [0.55, 0.62, 0.04], [0.18, -0.02, -0.55], [0.95, 1.05, 0.95]);
  const handL = addCapsulePart(group, 0.095, 0.10, 0xfff4ff, [-0.68, 0.38, 0.12], [0.0, 0.0, 0.72], [1.05, 0.9, 1.05]);
  const handR = addCapsulePart(group, 0.095, 0.10, 0xfff4ff, [0.68, 0.38, 0.12], [0.0, 0.0, -0.72], [1.05, 0.9, 1.05]);

  const footL = addCapsulePart(group, 0.14, 0.20, darker, [-0.23, 0.08, 0.10], [Math.PI / 2, 0, -0.07], [1.25, 0.88, 1.0]);
  const footR = addCapsulePart(group, 0.14, 0.20, darker, [0.23, 0.08, 0.10], [Math.PI / 2, 0, 0.07], [1.25, 0.88, 1.0]);
  const soleL = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 0.22), toonMat(0x201936));
  soleL.position.set(-0.23, 0.005, 0.15); soleL.castShadow = true; group.add(soleL);
  const soleR = soleL.clone(); soleR.position.x = 0.23; group.add(soleR);

  // tiny top seam and rear pack/shell to make the model read from behind too.
  const seam = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.36, 0.035), toonMat(trim));
  seam.position.set(0, 1.34, 0.15);
  seam.rotation.x = -0.45;
  seam.castShadow = true;
  group.add(seam);
  const backPack = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 10), toonMat(darker));
  backPack.scale.set(1.15, 1.35, 0.38);
  backPack.position.set(0, 0.62, -0.43);
  backPack.castShadow = true;
  group.add(backPack);

  group.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  return { group, body, mask, armL, armR, footL, footR, handL, handR };
}

const JUMP_SPEED = 10.2;
const MOVE_ACCEL = 118;
const AIR_CONTROL = 0.38;
const MAX_SPEED = 8.7;
const DIVE_IMPULSE = 12.0;
const COYOTE_TIME = 0.16;
const JUMP_BUFFER_TIME = 0.16;
const GROUND_NORMAL_Y = 0.58;
const BODY_RADIUS = 0.43;
const BODY_HALF_HEIGHT = 0.46;
const GROUND_RAY_EXTRA = 0.44;
const GROUND_SNAP_TOLERANCE = 0.46;
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
  constructor(world, playerMaterial, color, spawnPos, isLocal = false, cosmetic = {}) {
    this.world = world;
    this.isLocal = isLocal;
    this.color = color;
    this.cosmetic = cosmetic || {};
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
    this.spectatorOnly = false;
    this.defaultCollisionMask = -1;
    this.groundNormal = new CANNON.Vec3(0, 1, 0);
    this.contactNormals = [];
    this.impactSpeed = 0;
    this.lastSafePos = new CANNON.Vec3(spawnPos.x, spawnPos.y, spawnPos.z);
    this.jumpConsumed = false;
    this.wasGrounded = false;
    this.lastGroundTime = 0;
    this.airTime = 0;

    // Stage 2 controller: a compact upright compound collider, shaped more like a
    // capsule/bean than the old single marble. Rotation stays locked while running
    // for reliable arcade control; tumbles are a controlled state instead of random
    // physics spin so it remains playable in browser multiplayer.
    this.body = new CANNON.Body({
      mass: 5,
      material: playerMaterial,
      linearDamping: 0.025,
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

    const mesh = buildCharacterMesh(color, this.cosmetic);
    this.mesh = mesh.group;
    this.parts = mesh;
    this.velocitySmooth = new THREE.Vector3();
    this.facingAngle = 0;
    this.bobTime = Math.random() * 10;
    this.visualRoll = 0;
  }

  _groundProbe() {
    const footDistance = BODY_RADIUS + BODY_HALF_HEIGHT;
    let best = null;
    const offsets = [
      [0, 0], [0.28, 0], [-0.28, 0], [0, 0.28], [0, -0.28],
    ];
    for (const [ox, oz] of offsets) {
      const from = this.body.position.clone();
      from.x += ox; from.z += oz; from.y += 0.16;
      const to = this.body.position.clone();
      to.x += ox; to.z += oz; to.y -= BODY_RADIUS + BODY_HALF_HEIGHT + GROUND_RAY_EXTRA;
      this.world.raycastAll(from, to, { skipBackfaces: true }, (result) => {
        if (!result.body || result.body.id === this.body.id) return;
        if (result.hitNormalWorld.y <= GROUND_NORMAL_Y) return;
        if (!best || result.distance < best.distance) best = result;
      });
    }

    const closeEnough = best && best.distance <= footDistance + GROUND_SNAP_TOLERANCE;
    if (closeEnough) {
      this.grounded = true;
      this.groundNormal.copy(best.hitNormalWorld);
      this.coyoteTimer = COYOTE_TIME;
      // Only kill tiny downward jitter when the feet are already touching the floor.
      // The previous version clamped downward velocity whenever the ray could SEE
      // the floor, which made falling feel like anti-gravity and allowed endless
      // buffered jumps/fly-hacks near the ground.
      if (this.body.velocity.y < 0 && best.distance <= footDistance + 0.08) {
        this.body.velocity.y = Math.max(this.body.velocity.y, -1.2);
      }
      if (best.distance <= footDistance + 0.18 && this.body.velocity.y <= 0.75) this.jumpConsumed = false;
      this.lastSafePos.copy(this.body.position);
      this.airTime = 0;
      this.lastGroundTime = performance.now() * 0.001;
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
    this.body.velocity.y = Math.max(this.body.velocity.y, this.grounded || this.coyoteTimer > 0 ? 3.2 : 1.2);
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
    this.body.linearDamping = 0.025;
    this.jumpConsumed = false;
    this.visualRoll = 0;
  }

  applyInput(input, camYaw, dt) {
    if (this.eliminated || this.qualified || this.spectatorOnly) return;

    const probedGround = this._groundProbe();
    if (!probedGround) this.airTime += dt;
    this.coyoteTimer = Math.max(0, this.coyoteTimer - dt);
    this.jumpBufferTimer = input.jump ? JUMP_BUFFER_TIME : Math.max(0, this.jumpBufferTimer - dt);
    this.diveCooldown = Math.max(0, this.diveCooldown - dt);

    const moveX = input.x || 0;
    const moveZ = input.z || 0;
    const hasInput = Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01;

    // Mouse/camera controls facing. WASD/arrow keys move relative to that facing
    // direction and no longer turn the player by themselves. This matches the
    // requested Fall Guys-style control model: mouse = look/face, keys = move.
    this.facingAngle = camYaw;

    let wx = 0;
    let wz = 0;
    if (hasInput) {
      const sin = Math.sin(camYaw), cos = Math.cos(camYaw);
      // Local input: W/Up is forward in the direction the mouse is facing,
      // S/Down is backward, A/D strafe. Keys never rotate the bean.
      wx = moveX * cos + (-moveZ) * sin;
      wz = -moveX * sin + (-moveZ) * cos;
      const len = Math.hypot(wx, wz) || 1;
      wx /= len;
      wz /= len;
    }

    const canGroundAct = this.grounded || this.coyoteTimer > 0;

    if (this.state === STATE.TUMBLE) {
      this.tumbleTimer -= dt;
      // Fall Guys-like knockdown: you can still slightly steer while sliding,
      // and the floor contact never freezes the bean in place.
      if (hasInput) {
        this.body.velocity.x += wx * MOVE_ACCEL * 0.20 * dt;
        this.body.velocity.z += wz * MOVE_ACCEL * 0.20 * dt;
      }
      const slideBrake = this.grounded ? Math.max(0, 1 - dt * 1.15) : 1;
      this.body.velocity.x *= slideBrake;
      this.body.velocity.z *= slideBrake;
      if (canGroundAct && this.body.position.y < this.lastSafePos.y - 0.25) this.body.position.y = Math.max(this.body.position.y, this.lastSafePos.y);
      if (this.tumbleTimer <= 0 && canGroundAct) {
        this.state = STATE.RECOVER;
        this.recoveryTimer = 0.22;
      }
      this._endFrameContactReset();
      return;
    }

    if (this.state === STATE.RECOVER) {
      this.recoveryTimer -= dt;
      if (hasInput) {
        this.body.velocity.x += wx * MOVE_ACCEL * 0.42 * dt;
        this.body.velocity.z += wz * MOVE_ACCEL * 0.42 * dt;
      }
      const brake = Math.max(0, 1 - dt * 3.2);
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
    // On the floor, arcade characters need authoritative horizontal velocity.
    // Cannon contact friction was eating most of the old acceleration, so the
    // bean only felt fast while airborne. This keeps ground movement responsive
    // while still leaving air control weaker.
    if (hasInput && canGroundAct && !isDiving) {
      this.body.velocity.x = THREE.MathUtils.lerp(this.body.velocity.x, targetVX, Math.min(1, dt * 14));
      this.body.velocity.z = THREE.MathUtils.lerp(this.body.velocity.z, targetVZ, Math.min(1, dt * 14));
    }

    if (!hasInput && canGroundAct && !isDiving) {
      const brake = Math.max(0, 1 - dt * 10);
      this.body.velocity.x *= brake;
      this.body.velocity.z *= brake;
    }

    if (this.jumpBufferTimer > 0 && canGroundAct && !isDiving && !this.jumpConsumed) {
      this.body.velocity.y = JUMP_SPEED;
      this.jumpBufferTimer = 0;
      this.coyoteTimer = 0;
      this.grounded = false;
      this.jumpConsumed = true;
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
    this.qualified = false;
    this.spectatorOnly = false;
    this.mesh.visible = true;
    this.body.collisionFilterMask = this.defaultCollisionMask;
    this.grounded = false;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    this.jumpConsumed = false;
    this.airTime = 0;
    this.lastSafePos.set(pos.x, pos.y, pos.z);
    this.body.linearDamping = 0.025;
    this.jumpConsumed = false;
    this.lastSafePos.copy(this.body.position);
  }

  finish() {
    this.qualified = true;
    this.spectatorOnly = true;
    this.mesh.visible = false;
    this.body.collisionFilterMask = 0;
    this.body.position.set(0, -90, 0);
    this.body.velocity.set(0, 0, 0);
  }

  eliminate() {
    this.eliminated = true;
    this.mesh.visible = false;
    this.body.position.set(0, -100, 0);
    this.body.velocity.set(0, 0, 0);
  }
}
