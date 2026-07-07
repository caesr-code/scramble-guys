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

    // Start platform + rear barrier so bots/players cannot fall backwards before GO
    b.box(trackWidth, 1, 10, new THREE.Vector3(0, -0.5, 10), { color: 0xFFD23F });
    b.box(trackWidth + 2, 3.5, 0.8, new THREE.Vector3(0, 1.25, 19.8), { color: 0xE8965C });

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

        // Door mesh (a panel that either falls away (real) or stays solid (fake))
        const { mesh, body } = b.box(doorWidth - 0.3, 3.6, 0.4, new THREE.Vector3(x, 1.8, z), {
          color: doorColor, mass: 0, material: this.materials.groundMaterial,
        });
        // Give it a little sign / stripe for visual flair
        const stripeGeo = new THREE.BoxGeometry(doorWidth - 0.5, 0.4, 0.56);
        const stripe = new THREE.Mesh(stripeGeo, new THREE.MeshToonMaterial({ color: 0xffffff }));
        stripe.position.set(x, 3.0, z + 0.02);
        this.scene.add(stripe);

        gateGroup.doors.push({ mesh, body, isReal, broken: false, stripe, x, z });
      }
      this.gateWalls.push(gateGroup);
    });

    // Finish platform
    b.box(trackWidth, 1, 14, new THREE.Vector3(0, -0.5, this.finishZ - 7), { color: 0x3DDC97 });
    // Finish banner posts
    b.cylinder(0.3, 0.3, 6, new THREE.Vector3(-trackWidth / 2, 2.5, this.finishZ), { color: 0xffffff, mass: 0 });
    b.cylinder(0.3, 0.3, 6, new THREE.Vector3(trackWidth / 2, 2.5, this.finishZ), { color: 0xffffff, mass: 0 });

    this.spawnPoints = [];
    for (let i = 0; i < 20; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      this.spawnPoints.push(new THREE.Vector3(-6 + col * 3, 1.5, 14 + row * 2));
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
        if (Math.abs(dz) < 1.2 && Math.abs(dx) < 1.3) {
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
    door.mesh.visible = false;
    door.stripe.visible = false;
  }

  update(dt, t) {
    // subtle idle animation on unbroken door stripes
    for (const gate of this.gateWalls) {
      for (const door of gate.doors) {
        if (!door.broken) {
          door.stripe.position.y = 3.0 + Math.sin(t * 2 + door.x) * 0.05;
        }
      }
    }
  }

  checkFinish(pos) {
    return pos.z < this.finishZ + 4;
  }
}
