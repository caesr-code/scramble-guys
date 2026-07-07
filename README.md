# Scramble Royale

An original browser battle-royale obstacle-course game — same genre and energy
as Fall Guys, built from scratch with Three.js + cannon-es physics + true P2P
multiplayer over WebRTC. Nothing here is copied from Fall Guys: character
model, level names/layouts, palette, and mechanics are all original designs.

## Running it

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in **two or more
browser tabs/devices** to test multiplayer — one hosts, others join with the
room code.

To build a static production bundle:
```bash
npm run build
npm run preview
```

## How multiplayer works

True peer-to-peer via [Trystero](https://github.com/dmotz/trystero) (WebRTC
data channels, using BitTorrent trackers only for the initial handshake — no
game server involved at all). One peer (whoever clicks "Host Game") becomes
the **physics authority**: it simulates every player's physics, decides
qualification/elimination, and broadcasts state snapshots ~20x/second. Clients
send their input ~30x/second and locally predict their own character between
snapshots for responsiveness. This avoids the desync/cheating problems a
naive "everyone simulates everyone" P2P model would hit with physics-based
knockback and destructible doors.

## Controls

- **WASD / Arrows** — move
- **Space** — jump
- **Shift** — dive (short lunge, useful for grabbing ledges or knocking past
  spinning bars)
- **Drag mouse** — orbit camera
- On mobile, an on-screen joystick + jump/dive buttons appear automatically.

## Levels (all original)

1. **Door Dash** — sprint down a lane, smash through real doors (fake ones
   just bounce you back) across 3 gates, funnel to the finish.
2. **Spin Cycle** — cross a long bridge past rotating bars timed to different
   speeds, then a wobbly seesaw before the finish.
3. **Fruit Frenzy** — a shrinking circular platform scattered with bouncy
   obstacle balls, with a rising hazard tide; survive to qualify.
4. **Hex Havoc** — the finale: a hex-tile floating platform that randomly
   drops tiles from under your feet, faster over time. Last blob(s) standing
   win the match.

## Known limitations / what's simplified vs. a shipped game

Being upfront about the corners cut to make this buildable in one session:

- **No reconnection handling.** If a peer drops mid-match, they're just gone
  — no rejoin flow.
- **No anti-cheat.** Client input is trusted by the host at face value
  (this is standard for a casual P2P project like this, but a client could
  send bogus input to move faster than intended).
- **Physics can still diverge slightly between host and clients** for
  fast-moving dynamic hazards (the spinning bars' kinematic motion and the
  seesaw), since clients don't run a full physics reconciliation/rollback
  system — they mostly trust host snapshots for other players and only
  predict their own character. For a small-scale casual game this reads as
  fine; it isn't AAA-grade netcode.
- **No matchmaking/lobby browser** — you share a room code directly (like a
  Jackbox game).
- **Character customization, cosmetics, and cross-platform account systems**
  don't exist — this is the core gameplay loop, not a live-service product.

## Project structure

```
src/
  main.js           - menu/lobby UI wiring, game loop kickoff
  game.js           - core orchestrator: match flow, host-authoritative sync
  character.js       - blob character mesh + physics controller
  physicsWorld.js    - cannon-es world/materials setup
  camera.js          - third-person chase camera
  input.js           - keyboard/mouse/touch input
  scene.js           - lighting, sky, decoration
  net/network.js     - Trystero P2P wrapper
  levels/            - each level is a self-contained class (baseLevel.js
                        defines the shared interface)
```

Adding a new level: create a class extending `BaseLevel` in `src/levels/`,
implement `build()` (geometry) and optionally `update(dt, t)` (animated
hazards) + `checkFinish(pos)` or `isOutOfBounds(pos)`, then add it to
`LEVEL_CLASSES` in `game.js`.

## Stage 2 repair notes

Stage 2 replaces the Stage 1 single-sphere controller with a more stable upright bean/capsule-style controller:

- Player physics body is now a compact compound collider made from top and bottom spheres, closer to a bean/capsule than a marble.
- Grounding now uses both contact normals and a downward ground probe, so jump/coyote-time reliability is less dependent on one-frame collision events.
- Added movement states: run, dive, tumble, and recovery.
- Diving now transitions into a short belly-flop/tumble recovery instead of instantly snapping back to full control.
- Hard side impacts and obstacle hits can trigger a tumble state.
- Tumble has temporary reduced control, sliding, squash/stretch, arm reactions, and recovery timing.
- Wall/contact correction remains to reduce sticking on doors and obstacles.

This stage is intentionally focused on the controller and physics feel. Bots, countdown, audio, full multiplayer authority cleanup, and the bigger image-matching character art pass are still later stages.

## Stage 3 repair notes

Stage 3 adds the first match-flow layer without rewriting levels or bot logic yet:

- Added a single-player entry point for local testing/training.
- Added a 3-second round countdown with a big HUD overlay and GO state.
- Locked player input during countdown so nobody can move before GO.
- Added generated Web Audio sound effects for countdown, GO, jump, dive, round result and win.
- Preserved the Stage 2 movement/control fixes as the base for the next bot and multiplayer pass.

Bots are intentionally left for Stage 4 so the flow can be tested before AI players are added.


## Stage 3 control fix
- Mouse/trackpad now changes the bean facing direction.
- Camera is locked behind the bean on every level, not used as a free orbit camera.
- WASD and arrow keys move/strafe relative to facing and never rotate the player.
- Ground movement acceleration and max speed were increased to reduce slow/choppy feel on Spin Cycle/Dizzy-style levels.
