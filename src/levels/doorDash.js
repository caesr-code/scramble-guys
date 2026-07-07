import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { BaseLevel } from './baseLevel.js';

// "DOOR DASH" — original race level: sprint down a lane, smash through one of
// several doors in a wall (some are fake/locked and bounce you back), repeat
// through a few gates, then funnel to a finish pad. Our own door count, wall
// pattern, colors, and course length — not a recreation of any specific game.
export class DoorDashLevel extends BaseLevel {
  constructor(scene, world, materials) {
    super(scene, world, materials);
    this.name = 'DOOR DASH';
    this.timeLimit = 75;
    this.killY = -15;
    this.gateWalls = [];
    this.finishZ = -95;
  }

  build() {
    const b = this.builder;
    const trackWidth = 16;
    const trackLength = 110;

    // Ground lane
    b.box(trackWidth, 1, trackLength, new THREE.Vector3(0, -0.5, -trackLength / 2 + 5), { color: 0xF2C879, grid: true });
    b.arch(trackWidth - 0.6, 5.2, 13.5, 0xFF5FA2, 0xFFD23F);
    b.arch(trackWidth - 0.6, 5.4, this.finishZ, 0x3DDC97, 0xFFFFFF);

    // Side walls (visual only, keep players roughly on track but don't block fully)
    for (const side of [-1, 1]) {
      b.box(1, 4, trackLength, new THREE.Vector3(side * (trackWidth / 2 + 0.5), 1.5, -trackLength / 2 + 5), { color: 0xE8965C });
    }

    // Solid start pad. The main track starts at z=5, while this pad covers z=5..15,
    // so this is NOT a duplicate overlapping floor. That fixes both issues at once:
    // no visual noclip through the pad, and no slow/no-jump duplicate-contact bug.
    b.box(trackWidth, 0.45, 10, new THREE.Vector3(0, -0.225, 10), { color: 0xFFD23F, grid: true });
    b.box(trackWidth + 2, 3.5, 0.8, new THREE.Vector3(0, 1.25, 19.8), { color: 0xE8965C });

    // Big foam chevrons and crown markers give the lane the chunky game-show look.
    for (let z = 2; z > -88; z -= 12) {
      for (const x of [-5.8, 5.8]) {
        const chevron = b.box(1.2, 0.12, 1.2, new THREE.Vector3(x, 0.08, z), { color: 0xFFFFFF });
        chevron.mesh.rotation.y = Math.PI / 4;
      }
    }

    // Build 3 gates of doors, spaced along the lane, each with 5 doors, ~2 real ones
    const gateZs = [-15, -45, -75];
    this.gateWalls = [];
    gateZs.forEach((z, gi) => {
      const doorsPerGate = 5;
      const doorWidth = trackWidth / doorsPerGate;
      const realDoors = new Set();
      // ensure at least 2 real doors, randomised but deterministic-ish per gate
      while (realDoors.size < 2) realDoors.add(Math.floor(Math.random() * doorsPerGate));

      const gateGroup = { z, doors: [] };
      for (let i = 0; i < doorsPerGate; i++) {
        const x = -trackWidth / 2 + doorWidth * i + doorWidth / 2;
        const isReal = realDoors.has(i);
        const doorColor = isReal ? 0xFF5FA2 : 0x8C6FFF;

        // Thick solid collider + playful candy-monster door visuals. The collider is
        // intentionally thicker than the old wafer-thin panel so players/bots cannot
        // clip through purple fake doors at speed. Pink real doors crumble on impact.
        const { mesh, body } = b.box(doorWidth - 0.24, 3.6, 0.82, new THREE.Vector3(x, 1.8, z), {
          color: doorColor, mass: 0, material: this.materials.groundMaterial,
        });
        const stripeParts = [];
        for (let si = -1; si <= 1; si++) {
          const stripeGeo = new THREE.BoxGeometry(0.34, 3.25, 0.88);
          const stripe = new THREE.Mesh(stripeGeo, new THREE.MeshToonMaterial({ color: 0xffffff }));
          stripe.position.set(x + si * 0.72, 1.82, z + 0.43);
          stripe.rotation.z = -0.42;
          stripe.castShadow = true;
          this.scene.add(stripe);
          stripeParts.push(stripe);
        }
        const mouthGeo = new THREE.BoxGeometry(doorWidth - 0.75, 0.55, 0.9);
        const mouth = new THREE.Mesh(mouthGeo, new THREE.MeshToonMaterial({ color: 0x251B45 }));
        mouth.position.set(x, 0.68, z + 0.46);
        mouth.castShadow = true;
        this.scene.add(mouth);
        const teeth = [];
        for (let ti = 0; ti < 4; ti++) {
          const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.25, 3), new THREE.MeshToonMaterial({ color: 0xffffff }));
          tooth.position.set(x - 0.45 + ti * 0.3, 0.88, z + 0.52);
          tooth.rotation.z = Math.PI;
          tooth.castShadow = true;
          this.scene.add(tooth);
          teeth.push(tooth);
        }
        const eyes = [];
        for (const ex of [-0.42, 0.42]) {
          const eye = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), new THREE.MeshToonMaterial({ color: 0xffffff }));
          eye.scale.set(1.1, 1.25, 0.28);
          eye.position.set(x + ex, 2.62, z + 0.48);
          const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), new THREE.MeshBasicMaterial({ color: 0x11172b }));
          pupil.scale.set(0.8, 1.35, 0.25);
          pupil.position.set(x + ex, 2.59, z + 0.62);
          this.scene.add(eye, pupil);
          eyes.push(eye, pupil);
        }

        const cap = b.box(doorWidth - 0.1, 0.32, 0.92, new THREE.Vector3(x, 3.75, z), { color: 0x251B45 });
        const leftPost = b.box(0.12, 3.8, 0.92, new THREE.Vector3(x - doorWidth / 2 + 0.08, 1.9, z), { color: 0xFFFFFF });
        const rightPost = b.box(0.12, 3.8, 0.92, new THREE.Vector3(x + doorWidth / 2 - 0.08, 1.9, z), { color: 0xFFFFFF });
        gateGroup.doors.push({ mesh, body, isReal, broken: false, stripeParts, mouth, teeth, eyes, cap: cap.mesh, leftPost: leftPost.mesh, rightPost: rightPost.mesh, x, z, doorWidth, doorColor });
      }
      this.gateWalls.push(gateGroup);
    });

    // Finish platform
    b.box(trackWidth, 1, 14, new THREE.Vector3(0, -0.5, this.finishZ - 7), { color: 0x3DDC97 });
    // Finish banner posts
    b.cylinder(0.3, 0.3, 6, new THREE.Vector3(-trackWidth / 2, 2.5, this.finishZ), { color: 0xffffff, mass: 0 });
    b.cylinder(0.3, 0.3, 6, new THREE.Vector3(trackWidth / 2, 2.5, this.finishZ), { color: 0xffffff, mass: 0 });

    // Spawn in the centre of the starting pad, well clear of the rear barrier.
    // Previous rows reached z=20, overlapping the anti-fall barrier at z=19.8.
    // That was why Door Dash felt like the bean had no ground movement/jump on spawn.
    this.spawnPoints = [];
    for (let i = 0; i < 20; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      this.spawnPoints.push(new THREE.Vector3(-5.2 + col * 2.6, 1.85, 7.0 + row * 1.05));
    }
  }

  // Call when a player's body overlaps a door's position closely - simple proximity break.
  // Returns {gateIdx, doorIdx} for the door it just broke, or null if none broke this call.
  // NOTE: this must only be invoked authoritatively (by the host, for every player's real
  // position) - if clients also called this locally, a client could see a door open on
  // their own screen while the host's simulation still treats it as solid, causing desync.
  tryBreakDoorsNear(position) {
    for (let gi = 0; gi < this.gateWalls.length; gi++) {
      const gate = this.gateWalls[gi];
      for (let di = 0; di < gate.doors.length; di++) {
        const door = gate.doors[di];
        if (door.broken) continue;
        const dx = position.x - door.x;
        const dz = position.z - door.z;
        if (Math.abs(dz) < 1.45 && Math.abs(dx) < 1.45) {
          if (door.isReal) {
            this.breakDoor(door);
            return { gateIdx: gi, doorIdx: di };
          }
          // fake doors just block (no-op, body stays solid)
        }
      }
    }
    return null;
  }

  breakDoor(door) {
    door.broken = true;
    this.world.removeBody(door.body);
    const pieces = [];
    const cols = 3, rows = 3;
    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const w = door.doorWidth / cols * 0.78;
        const h = 3.2 / rows * 0.78;
        const px = door.x - door.doorWidth * 0.32 + ix * door.doorWidth * 0.32;
        const py = 0.65 + iy * 0.95;
        const pz = door.z + (Math.random() - 0.5) * 0.18;
        const geo = new THREE.BoxGeometry(w, h, 0.42);
        const mat = new THREE.MeshToonMaterial({ color: (ix + iy) % 2 ? 0xffffff : door.doorColor });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(px, py, pz);
        mesh.castShadow = true;
        this.scene.add(mesh);
        const shape = new CANNON.Box(new CANNON.Vec3(w / 2, h / 2, 0.21));
        const body = new CANNON.Body({ mass: 1.2, shape, material: this.materials.groundMaterial, linearDamping: 0.08, angularDamping: 0.1 });
        body.position.set(px, py, pz);
        body.velocity.set((px - door.x) * 2.2 + (Math.random() - 0.5) * 2, 2.5 + Math.random() * 2, -4 - Math.random() * 3);
        body.angularVelocity.set(Math.random() * 5, Math.random() * 5, Math.random() * 5);
        this.world.addBody(body);
        pieces.push({ mesh, body, life: 3.2 });
      }
    }
    door.pieces = pieces;
    door.mesh.visible = false;
    if (door.stripeParts) door.stripeParts.forEach(p => p.visible = false);
    if (door.mouth) door.mouth.visible = false;
    if (door.teeth) door.teeth.forEach(p => p.visible = false);
    if (door.eyes) door.eyes.forEach(p => p.visible = false);
  }

  update(dt, t) {
    // subtle idle animation on unbroken door stripes
    for (const gate of this.gateWalls) {
      for (const door of gate.doors) {
        if (!door.broken) {
          if (door.stripeParts) door.stripeParts.forEach((p, idx) => { p.position.y = 1.82 + Math.sin(t * 2 + door.x + idx) * 0.035; });
          if (door.eyes) door.eyes.forEach((p, idx) => { p.position.y += Math.sin(t * 3 + idx + door.x) * 0.0008; });
        } else if (door.pieces) {
          door.pieces = door.pieces.filter(piece => {
            piece.life -= dt;
            piece.mesh.position.copy(piece.body.position);
            piece.mesh.quaternion.copy(piece.body.quaternion);
            if (piece.life <= 0) { this.world.removeBody(piece.body); piece.mesh.visible = false; return false; }
            return true;
          });
        }
      }
    }
  }

  checkFinish(pos) {
    return pos.z < this.finishZ + 4;
  }
}
