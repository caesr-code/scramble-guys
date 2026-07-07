import * as THREE from 'three';
import { createPhysicsWorld } from './physicsWorld.js';
import { Character } from './character.js';
import { ChaseCamera } from './camera.js';
import { InputManager } from './input.js';
import { createScene, addSkyDecor } from './scene.js';
import { mulberry32, makeSeed } from './rng.js';
import { DoorDashLevel } from './levels/doorDash.js';
import { SpinCycleLevel } from './levels/spinCycle.js';
import { FruitFrenzyLevel } from './levels/fruitFrenzy.js';
import { HexHavocLevel } from './levels/hexHavoc.js';
import { SkylineCircuitLevel } from './levels/skylineCircuit.js';
import { HoverboardRunLevel } from './levels/hoverboardRun.js';

const LEVEL_CLASSES = [DoorDashLevel, HexHavocLevel, SkylineCircuitLevel, SpinCycleLevel, FruitFrenzyLevel, HoverboardRunLevel];
const LEVEL_BY_NAME = {
  'DOOR DASH': DoorDashLevel,
  'SPIN CYCLE': SpinCycleLevel,
  'FRUIT FRENZY': FruitFrenzyLevel,
  'HEX HAVOC': HexHavocLevel,
  'SKYLINE CIRCUIT': SkylineCircuitLevel,
  'HOVERBOARD RUN': HoverboardRunLevel,
};
const PLAYER_COLORS = [0xFF5FA2, 0x3DDC97, 0xFFD23F, 0x8C6FFF, 0x6EC6FF, 0xFF8A5C, 0xC96FFF, 0x5CFFB0];

const NET_SEND_RATE = 1 / 20; // 20hz state broadcast from host
const INPUT_SEND_RATE = 1 / 30; // 30hz input send from clients

export class Game {
  constructor(network) {
    this.network = network;
    this.isHost = network.isHost;

    const { scene, renderer, camera } = createScene();
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    addSkyDecor(scene);

    const { world, groundMaterial, playerMaterial, slideMaterial, bounceMaterial } = createPhysicsWorld();
    this.world = world;
    this.materials = { groundMaterial, playerMaterial, slideMaterial, bounceMaterial };

    this.chaseCamera = new ChaseCamera(camera);
    this.input = new InputManager(this.chaseCamera);

    this.characters = new Map(); // peerId -> Character (everyone, including self, keyed by real peerId)
    this.localId = network.peerId; // my own peerId, used as the key for my own character
    this.remoteInputs = new Map(); // peerId -> latest input from that client (host only)
    this.botBrain = new Map();

    this.currentLevelIndex = 0;
    this.level = null;
    this.matchOrder = []; // level sequence for this match
    this.roundActive = false;
    this.roundTimer = 0;
    this.countdownTimer = 0;
    this.countdownLastValue = null;
    this.countdownHidePending = false;
    this.controlsLocked = false;
    this.qualifiedThisRound = new Set();
    this.eliminatedThisRound = new Set();

    this.clock = new THREE.Clock();
    this.netAccum = 0;
    this.lastFinished = false;
    this.pendingNetJump = false;
    this.pendingNetDive = false;

    this.onRoundEnd = null;
    this.onMatchEnd = null;
    this.onStatusUpdate = null;
    this.onCountdownUpdate = null;
    this.sound = null;
    this.spectatorTargetId = null;

    this._bindNetwork();
  }

  _bindNetwork() {
    const net = this.network;

    net.onInputReceived = (data, peerId) => {
      if (this.isHost) this.remoteInputs.set(peerId, data);
    };

    net.onStateReceived = (data) => {
      if (this.isHost) return; // host doesn't consume state, it produces it
      this._applyHostState(data);
    };

    net.onEventReceived = (data) => {
      if (data.type === 'roundStart') this._clientStartRound(data);
      if (data.type === 'roundEnd') this._clientRoundEnd(data);
      if (data.type === 'matchEnd') this.onMatchEnd && this.onMatchEnd(data);
      if (data.type === 'doorBreak' && this.level && this.level.breakDoor) {
        // find door by index path encoded in data
        const gate = this.level.gateWalls[data.gateIdx];
        if (gate) {
          const door = gate.doors[data.doorIdx];
          if (door && !door.broken) this.level.breakDoor(door);
        }
      }
      if (data.type === 'hexTileTouch' && this.level && this.level.touchTile) {
        this.level.touchTile(data.tileIndex);
      }
    };
  }

  addLocalPlayer(name, color, cosmetic = {}) {
    const spawn = new THREE.Vector3(0, 5, 0);
    const ch = new Character(this.world, this.materials.playerMaterial, color, spawn, true, cosmetic);
    ch.name = name;
    this.characters.set(this.localId, ch);
    this.scene.add(ch.mesh);
    this.localColor = color;
    this.localName = name;
    return ch;
  }

  getLocalCharacter() {
    return this.characters.get(this.localId);
  }

  addRemotePlayer(peerId, name, color, isBot = false, cosmetic = {}) {
    if (this.characters.has(peerId)) return this.characters.get(peerId);
    const spawn = new THREE.Vector3(0, 5, 0);
    const ch = new Character(this.world, this.materials.playerMaterial, color, spawn, false, cosmetic);
    ch.name = name;
    ch.isBot = !!isBot;
    this.characters.set(peerId, ch);
    if (isBot) this.botBrain.set(peerId, { lane: (Math.random() - 0.5) * 4, jumpAt: 0, wobble: Math.random() * 10, stuckT: 0, lastZ: 999 });
    this.scene.add(ch.mesh);
    return ch;
  }

  removePlayer(peerId) {
    const ch = this.characters.get(peerId);
    if (!ch) return;
    this.scene.add(); // no-op guard
    this.scene.remove(ch.mesh);
    this.world.removeBody(ch.body);
    this.characters.delete(peerId);
  }

  // ---------------- MATCH FLOW (host drives this) ----------------

  hostStartMatch(playerRoster) {
    // playerRoster: [{id, name, color}] - ids are real peerIds, host included using its own peerId
    this.roster = playerRoster;
    // Ensure bot characters exist on the host, because the host simulates bots.
    playerRoster.forEach(p => {
      if (p.isBot && !this.characters.has(p.id)) this.addRemotePlayer(p.id, p.name, p.color, true);
    });
    this.matchOrder = this._pickLevels();
    this.currentLevelIndex = -1;
    // Small delay before the first level loads: gives every client time to finish
    // constructing its Game object and binding its event handler in response to
    // 'matchStart' before 'roundStart' arrives. Without this, a client that's a
    // beat slow could miss the very first roundStart event entirely and never
    // load a level or see any players.
    setTimeout(() => this._hostAdvanceLevel(), 500);
  }

  _pickLevels() {
    // Stage 4 round-flow fix: make the test path deterministic.
    // Door Dash should feed directly into Hex Havoc instead of randomly
    // choosing another middle round or ending the match after race results.
    return [DoorDashLevel, HexHavocLevel, SkylineCircuitLevel, SpinCycleLevel, HoverboardRunLevel];
  }

  _hostAdvanceLevel() {
    this.currentLevelIndex++;
    if (this.currentLevelIndex >= this.matchOrder.length) {
      this.network.sendEvent({ type: 'matchEnd', winnerId: this._lastWinnerId });
      this.onMatchEnd && this.onMatchEnd({ winnerId: this._lastWinnerId });
      return;
    }
    const LevelClass = this.matchOrder[this.currentLevelIndex];
    const levelSeed = makeSeed();
    this._loadLevel(LevelClass, levelSeed);

    const activeIds = this.roster.filter(p => !this.eliminatedSet || !this.eliminatedSet.has(p.id)).map(p => p.id);
    this.network.sendEvent({
      type: 'roundStart',
      levelName: this.level.name,
      levelIdx: this.currentLevelIndex,
      timeLimit: this.level.timeLimit,
      activeIds,
      levelSeed,
    });
    this._startRoundLocal(this.level.name, this.level.timeLimit, activeIds);
  }

  _loadLevel(LevelClass, seed) {
    if (this.level) this._clearLevel();
    this.level = new LevelClass(this.scene, this.world, this.materials);
    // Shared seeded RNG: any gameplay-critical randomness inside build() (e.g.
    // which Door Dash doors are real vs permanently solid) must use this.rng()
    // instead of Math.random(), so the host and every client - each building
    // this level independently - compute the exact same result instead of
    // silently disagreeing about what's solid.
    this.level.rng = mulberry32(seed ?? makeSeed());
    this.level.build();
  }

  _clearLevel() {
    // remove all level meshes/bodies by nuking scene children tagged, simplest: rebuild scene decor is skipped for brevity —
    // we just clear world bodies that aren't players and scene meshes that aren't characters/lights/clouds
    const keepMeshes = new Set();
    this.characters.forEach(ch => keepMeshes.add(ch.mesh));
    const toRemove = [];
    this.scene.traverse(obj => {
      if (obj.isMesh && !keepMeshes.has(obj) && obj.parent === this.scene) toRemove.push(obj);
    });
    // also remove groups of meshes belonging to level (clouds are added directly to scene as groups; keep those - heuristic: skip removal if it's a cloud group child)
    toRemove.forEach(obj => this.scene.remove(obj));

    const playerBodies = new Set();
    this.characters.forEach(ch => playerBodies.add(ch.body));
    const bodiesToRemove = this.world.bodies.filter(b => !playerBodies.has(b));
    bodiesToRemove.forEach(b => this.world.removeBody(b));
    this.world.constraints.slice().forEach(c => this.world.removeConstraint(c));

    if (this.level) this.level.dispose();
  }

  _startRoundLocal(levelName, timeLimit, activeIds) {
    this.roundActive = true;
    this.roundTimer = timeLimit;
    this.countdownTimer = 3.15;
    this.countdownLastValue = null;
    this.countdownHidePending = false;
    this.controlsLocked = true;
    this.qualifiedThisRound = new Set();
    this.finishedOrder = [];
    this.activeIds = new Set(activeIds);
    this.spectatorTargetId = null;

    // respawn/position all active characters at spawn points, hide/eliminate inactive ones
    let i = 0;
    this.characters.forEach((ch, id) => {
      if (this.activeIds.has(id)) {
        const pos = this.level.getSpawnPoint(i++);
        ch.respawn(pos);
        ch.eliminated = false;
        ch.mesh.visible = true;
      } else {
        ch.eliminate();
      }
    });

    this.onStatusUpdate && this.onStatusUpdate({ levelName, activeCount: this.activeIds.size });
    this._emitCountdown();
  }

  _clientStartRound(data) {
    const cls = LEVEL_BY_NAME[data.levelName] || LEVEL_CLASSES[0];
    this._loadLevel(cls, data.levelSeed);
    this._startRoundLocal(data.levelName, data.timeLimit, data.activeIds);
  }

  _clientRoundEnd(data) {
    this.roundActive = false;
    this.onRoundEnd && this.onRoundEnd(data);
  }

  // Called every frame by host to check finish/elimination conditions
  _hostCheckRoundProgress(dt) {
    if (!this.roundActive || this.countdownTimer > 0) return;
    this.roundTimer -= dt;

    let stillIn = 0;
    this.characters.forEach((ch, id) => {
      if (!this.activeIds.has(id) || ch.eliminated || ch.qualified) return;

      const pos = ch.body.position;
      let outOfBounds = pos.y < this.level.killY;
      if (this.level.isOutOfBounds) outOfBounds = outOfBounds || this.level.isOutOfBounds(pos);

      if (outOfBounds) {
        ch.eliminate();
        this.eliminatedThisRound.add(id);
        return;
      }

      if (this.level.checkFinish && this.level.checkFinish(pos) && !this.qualifiedThisRound.has(id)) {
        this.qualifiedThisRound.add(id);
        this.finishedOrder.push(id);
        if (ch.finish) ch.finish();
      }

      // Host-authoritative door breaking: only the host decides this, for every
      // player's real simulated position, then broadcasts it so all clients'
      // local copies of the level stay in sync with what actually happened.
      if (this.level.tryBreakDoorsNear) {
        const brokenInfo = this.level.tryBreakDoorsNear(pos);
        if (brokenInfo) this.network.sendEvent({ type: 'doorBreak', ...brokenInfo });
      }

      // Stage 6 Hex polish: tiles are touched and then fall because players step
      // on them, instead of the finale being mostly random floor deletion.
      if (this.level.tryTouchTileUnder) {
        const tileIndex = this.level.tryTouchTileUnder(pos);
        if (tileIndex !== null && tileIndex !== undefined) this.network.sendEvent({ type: 'hexTileTouch', tileIndex });
      }

      if (!ch.eliminated && !ch.qualified) stillIn++;
    });

    const isRaceLevel = typeof this.level.checkFinish === 'function' && this.level.name !== 'HEX HAVOC' && this.level.name !== 'FRUIT FRENZY';
    const isSurvivalLevel = this.level.name === 'HEX HAVOC' || this.level.name === 'FRUIT FRENZY';

    let roundOver = false;
    let qualifiedIds = [];

    if (this.roundTimer <= 0) {
      roundOver = true;
      if (isRaceLevel) {
        qualifiedIds = this.finishedOrder.slice(0, Math.max(1, Math.ceil(this.activeIds.size * 0.6)));
      } else {
        qualifiedIds = Array.from(this.activeIds).filter(id => {
          const ch = this.characters.get(id);
          return ch && !ch.eliminated && !ch.qualified;
        });
      }
    } else if (isRaceLevel && this.finishedOrder.length >= Math.ceil(this.activeIds.size * 0.6)) {
      roundOver = true;
      qualifiedIds = this.finishedOrder.slice();
    } else if (isSurvivalLevel) {
      const remaining = Array.from(this.activeIds).filter(id => {
        const ch = this.characters.get(id);
        return ch && !ch.eliminated && !ch.qualified;
      });
      const targetSurvivors = this.currentLevelIndex === this.matchOrder.length - 1 ? 1 : Math.max(1, Math.ceil(this.activeIds.size * 0.5));
      if (remaining.length <= targetSurvivors) {
        roundOver = true;
        qualifiedIds = remaining;
      }
    }

    if (roundOver) {
      this.roundActive = false;
      const isFinalRound = this.currentLevelIndex >= this.matchOrder.length - 1;

      if (qualifiedIds.length === 0) qualifiedIds = Array.from(this.activeIds).slice(0, 1);

      // Do not end the whole show early just because only the local player
      // finished Door Dash. For non-final rounds, pad the next-round roster
      // with the best remaining active players/bots by forward progress so
      // Hex Havoc is always reachable and has opponents to play against.
      if (!isFinalRound) {
        const targetNextCount = Math.max(2, Math.min(this.activeIds.size, Math.ceil(this.activeIds.size * 0.6)));
        const already = new Set(qualifiedIds);
        const extras = Array.from(this.activeIds)
          .filter(id => !already.has(id))
          .map(id => ({ id, ch: this.characters.get(id) }))
          .filter(({ ch }) => ch && !ch.eliminated)
          .sort((a, b) => {
            const az = a.ch.body.position.z;
            const bz = b.ch.body.position.z;
            // Race courses move toward negative Z, so lower Z means further ahead.
            return az - bz;
          })
          .map(({ id }) => id);
        for (const id of extras) {
          if (qualifiedIds.length >= targetNextCount) break;
          qualifiedIds.push(id);
        }
      }

      this.eliminatedSet = this.eliminatedSet || new Set();
      Array.from(this.activeIds).forEach(id => { if (!qualifiedIds.includes(id)) this.eliminatedSet.add(id); });
      this._lastWinnerId = qualifiedIds[0];

      const payload = { type: 'roundEnd', qualifiedIds, levelName: this.level.name };
      this.network.sendEvent(payload);
      this.onRoundEnd && this.onRoundEnd(payload);

      setTimeout(() => {
        if (isFinalRound) {
          const winner = qualifiedIds[0];
          this.network.sendEvent({ type: 'matchEnd', winnerId: winner });
          this.onMatchEnd && this.onMatchEnd({ winnerId: winner });
        } else {
          this._hostAdvanceLevel();
        }
      }, 4000);
    }
  }


  _emitCountdown() {
    if (!this.onCountdownUpdate || !this.level || this.countdownTimer <= 0) return;
    const value = Math.max(1, Math.ceil(this.countdownTimer));
    const label = String(value);
    if (this.countdownLastValue !== value) {
      this.countdownLastValue = value;
      this.onCountdownUpdate({ value, label, levelName: this.level.name });
    }
  }

  _emitGoAndHideCountdown() {
    if (!this.onCountdownUpdate || !this.level || this.countdownHidePending) return;
    this.countdownHidePending = true;
    this.onCountdownUpdate({ value: 0, label: 'GO!', levelName: this.level.name });
    setTimeout(() => {
      this.onCountdownUpdate && this.onCountdownUpdate({ value: null, label: null, levelName: this.level ? this.level.name : 'ROUND' });
    }, 650);
  }


  _botInputFor(id, ch, dt, t) {
    const brain = this.botBrain.get(id) || { lane: 0, jumpAt: 0, wobble: Math.random() * 10, stuckT: 0, lastZ: ch.body.position.z };
    this.botBrain.set(id, brain);
    const p = ch.body.position;
    let targetX = brain.lane;
    let targetZ = p.z - 14;
    let yaw = Math.atan2(targetX - p.x, p.z - targetZ);
    let jump = false;
    let dive = false;

    if (this.level) {
      if (this.level.name === 'DOOR DASH') {
        targetZ = -110;
        // Pick a plausible door lane at each wall, with occasional mistakes.
        const gates = this.level.gateWalls || [];
        for (const gate of gates) {
          if (p.z > gate.z - 3 && p.z < gate.z + 16) {
            const candidates = gate.doors.filter(d => d.isReal || Math.random() < 0.18);
            const door = candidates[Math.floor((brain.wobble * 997 + t * 0.2) % candidates.length)] || gate.doors[2];
            targetX = door.x;
            if (Math.abs(p.z - gate.z) < 3.2) dive = Math.random() < 0.055;
            break;
          }
        }
      } else if (this.level.name === 'SPIN CYCLE') {
        targetZ = -112;
        targetX = Math.sin(t * 0.7 + brain.wobble) * 2.6;
        const nearSpinner = (this.level.spinners || []).some(s => Math.abs(p.z - s.body.position.z) < 3.8);
        jump = nearSpinner && Math.random() < 0.05;
        dive = nearSpinner && Math.random() < 0.018;
      } else if (this.level.name === 'HEX HAVOC') {
        const safe = this.level.getSafeTarget ? this.level.getSafeTarget(p, t + brain.wobble) : null;
        if (safe) {
          targetX = safe.x;
          targetZ = safe.z;
        } else {
          const ang = t * 0.55 + brain.wobble;
          targetX = Math.cos(ang) * 5.5;
          targetZ = Math.sin(ang) * 5.5;
        }
        jump = Math.random() < 0.012;
      } else {
        const ang = Math.atan2(p.z, p.x) + Math.PI + Math.sin(t + brain.wobble) * 0.4;
        targetX = Math.cos(ang) * 3;
        targetZ = Math.sin(ang) * 3;
      }
    }

    const dx = targetX - p.x;
    const dz = targetZ - p.z;
    const len = Math.hypot(dx, dz) || 1;
    const desiredX = dx / len;
    const desiredZ = dz / len;
    yaw = Math.atan2(desiredX, desiredZ);

    if (Math.abs(p.z - brain.lastZ) < 0.06 && Math.hypot(ch.body.velocity.x, ch.body.velocity.z) < 1.5) {
      brain.stuckT += dt;
      if (brain.stuckT > 0.65) { jump = true; if (brain.stuckT > 1.2) dive = true; }
    } else {
      brain.stuckT = 0;
      brain.lastZ = p.z;
    }

    // Convert world direction to local input expected by Character.applyInput.
    const sin = Math.sin(yaw), cos = Math.cos(yaw);
    const localX = desiredX * cos - desiredZ * sin;
    const localZ = -(desiredX * sin + desiredZ * cos);
    return { x: localX, z: localZ, jump, dive, yaw };
  }


  _activeSpectatorCandidates() {
    return Array.from(this.characters.entries())
      .filter(([id, ch]) => {
        if (id === this.localId) return false;
        if (this.activeIds && !this.activeIds.has(id)) return false;
        return ch && !ch.eliminated && !ch.qualified && ch.mesh.visible;
      })
      .map(([id]) => id);
  }

  cycleSpectatorTarget(dir = 1) {
    const ids = this._activeSpectatorCandidates();
    if (!ids.length) return;
    const current = ids.indexOf(this.spectatorTargetId);
    const next = current < 0 ? 0 : (current + dir + ids.length) % ids.length;
    this.spectatorTargetId = ids[next];
  }

  // ---------------- PER FRAME ----------------

  update() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;

    if (this.countdownTimer > 0) {
      const beforeCountdown = this.countdownTimer;
      this.countdownTimer = Math.max(0, this.countdownTimer - dt);
      this.controlsLocked = this.countdownTimer > 0;
      if (this.countdownTimer > 0) this._emitCountdown();
      if (beforeCountdown > 0 && this.countdownTimer === 0) this._emitGoAndHideCountdown();
    }

    const local = this.characters.get(this.localId);
    const localCanControl = local && !local.eliminated && !local.qualified && !local.spectatorOnly;
    if (local) {
      const rawInput = this.input.getMoveInput();
      if (!localCanControl) {
        if (rawInput.spectateNext) this.cycleSpectatorTarget(1);
        if (rawInput.spectatePrev) this.cycleSpectatorTarget(-1);
      }
      const moveInput = (this.controlsLocked || !localCanControl) ? { x: 0, z: 0, jump: false, dive: false } : rawInput;
      if (!this.controlsLocked && localCanControl) {
        if (rawInput.jump && this.sound) this.sound.jump();
        if (rawInput.dive && this.sound) this.sound.dive();
      }
      if (localCanControl) local.applyInput(moveInput, this.chaseCamera.yaw, dt);

      // Keep one-frame jump/dive presses until the next network packet.
      // Without this, multiplayer clients can miss jumps because getMoveInput()
      // clears the press before the 30hz send tick happens.
      this.pendingNetJump = this.pendingNetJump || moveInput.jump;
      this.pendingNetDive = this.pendingNetDive || moveInput.dive;
      this.netAccum += dt;
      if (!this.isHost && this.netAccum >= INPUT_SEND_RATE) {
        this.netAccum = 0;
        this.network.sendInput({
          x: moveInput.x,
          z: moveInput.z,
          jump: this.pendingNetJump,
          dive: this.pendingNetDive,
          yaw: this.chaseCamera.yaw,
        });
        this.pendingNetJump = false;
        this.pendingNetDive = false;
      }
    }

    if (this.isHost) {
      // apply remote inputs to their characters before physics step. During the
      // countdown, every player is locked in place so nobody can false-start.
      this.remoteInputs.forEach((inputData, peerId) => {
        const ch = this.characters.get(peerId);
        if (!ch || ch.eliminated || ch.qualified || ch.spectatorOnly) return;
        const applied = this.controlsLocked ? { x: 0, z: 0, jump: false, dive: false, yaw: inputData.yaw || 0 } : inputData;
        ch.applyInput(applied, applied.yaw || 0, dt);
      });
      this.characters.forEach((ch, id) => {
        if (!ch.isBot || !this.activeIds || !this.activeIds.has(id) || ch.eliminated || ch.qualified || ch.spectatorOnly) return;
        const botInput = this.controlsLocked ? { x: 0, z: 0, jump: false, dive: false, yaw: ch.facingAngle } : this._botInputFor(id, ch, dt, t);
        ch.applyInput(botInput, botInput.yaw || ch.facingAngle, dt);
      });
    }

    if (this.level && this.level.applySpecialForces) {
      this.characters.forEach((ch, id) => {
        if (!this.activeIds || !this.activeIds.has(id) || ch.eliminated || ch.qualified) return;
        this.level.applySpecialForces(ch, dt, t);
      });
    }

    this.world.step(1 / 60, dt, 6);

    this.characters.forEach(ch => ch.postPhysicsUpdate(dt));

    if (this.level && this.level.update) this.level.update(dt, t);

    if (this.isHost) {
      this._hostCheckRoundProgress(dt);

      // Host-authoritative hex-tile stalemate pressure: any tiles this decides
      // to drop must be broadcast so every client's local physics agrees on
      // exactly which tiles are gone, instead of each machine deciding
      // independently via its own random draw.
      if (this.level && this.level.hostTick) {
        const touchedIndices = this.level.hostTick(dt, t);
        if (touchedIndices && touchedIndices.length) {
          touchedIndices.forEach(tileIndex => this.network.sendEvent({ type: 'hexTileTouch', tileIndex }));
        }
      }

      this.netAccum2 = (this.netAccum2 || 0) + dt;
      if (this.netAccum2 >= NET_SEND_RATE) {
        this.netAccum2 = 0;
        const snapshot = {};
        this.characters.forEach((ch, id) => {
          snapshot[id] = {
            p: [ch.body.position.x, ch.body.position.y, ch.body.position.z],
            v: [ch.body.velocity.x, ch.body.velocity.y, ch.body.velocity.z],
            f: ch.facingAngle,
            e: ch.eliminated,
            q: ch.qualified,
            d: ch.diving,
            st: ch.state,
          };
        });
        this.network.sendState({ snap: snapshot, t: this.roundTimer });
      }
    }

    const cameraTarget = this._cameraTargetForLocal();
    if (cameraTarget) this.chaseCamera.update(cameraTarget.mesh, dt);

    this.renderer.render(this.scene, this.camera);
  }

  _cameraTargetForLocal() {
    const local = this.characters.get(this.localId);
    if (local && !local.eliminated && !local.qualified && !local.spectatorOnly) return local;
    const candidates = Array.from(this.characters.entries()).filter(([id, ch]) => {
      if (id === this.localId) return false;
      if (this.activeIds && !this.activeIds.has(id)) return false;
      return ch && !ch.eliminated && !ch.qualified && ch.mesh.visible;
    });
    if (!candidates.length) return local || null;
    if (!this.spectatorTargetId || !this.characters.has(this.spectatorTargetId)) this.spectatorTargetId = candidates[0][0];
    let target = this.characters.get(this.spectatorTargetId);
    if (!target || target.eliminated || target.qualified) {
      this.spectatorTargetId = candidates[0][0];
      target = candidates[0][1];
    }
    if (target) this.chaseCamera.yaw = target.facingAngle;
    return target;
  }

  _applyHostState(data) {
    // Received only by clients. Snapshot is keyed by real peerId, including our own -
    // we skip our own entry since we run local prediction on our own character instead
    // of hard-snapping it (avoids visible rubber-banding on the player's own screen).
    this.roundTimer = data.t;
    Object.entries(data.snap).forEach(([id, s]) => {
      const ch = this.characters.get(id);
      if (!ch) return;
      if (id === this.localId) {
        if (s.q && !ch.qualified && ch.finish) ch.finish();
        if (s.e && !ch.eliminated) ch.eliminate();
        return;
      }
      ch.body.position.set(...s.p);
      ch.body.velocity.set(...s.v);
      ch.facingAngle = s.f;
      ch.diving = s.d;
      if (s.st) ch.state = s.st;
      if (s.q && !ch.qualified && ch.finish) ch.finish();
      if (s.e && !ch.eliminated) ch.eliminate();
      if (!s.e && !s.q && (ch.eliminated || ch.qualified)) { ch.eliminated = false; ch.qualified = false; ch.spectatorOnly = false; ch.mesh.visible = true; ch.body.collisionFilterMask = ch.defaultCollisionMask; }
    });
  }

  dispose() {
    this.renderer.dispose();
  }
}
