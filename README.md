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

## Stage 5 visual/model pass

- Rebuilt the bean character mesh to better match the supplied reference image: taller rounded bean body, big white oval faceplate, dark face rim, vertical black eyes, gloves, boots, straps, belt, buckle, side patches, rear pack detail, and stronger toon shading.
- Kept the Stage 4 controller, bots, round flow and uniform physics changes intact.
- Added more visual polish to Door Dash and Spin Cycle with start/finish arches and more colourful course pieces.
- Added subtle visual lower tiers under Hex Havoc so the finale has more depth without changing collision rules.
- Build passes with Vite.


## Stage 5 gameplay tune
- Hex Havoc now uses four playable layers: two yellow layers and two blue layers.
- Movement speed and acceleration were reduced from the over-fast Stage 5 tune to a slower Fall Guys-style pace.

## Stage 6 finale/gameplay polish

- Hex Havoc tiles now behave like a proper stepped-tile finale: when a player or bot lands on a tile, it flashes/wobbles briefly, then drops away.
- Hex still has four playable layers in the requested order: yellow, yellow, blue, blue.
- Late-match random tile pressure remains only as a stalemate breaker; player contact is now the main tile-removal mechanic.
- Bots now look for nearby safe Hex tiles instead of wandering randomly in the finale.
- Door Dash still flows directly into Hex Havoc for faster testing.

## Stage 7 final polish
- Added final QA polish on top of Stage 6.
- Kept main show flow as Door Dash -> Hex Havoc.
- Tuned player max speed/acceleration down from the Stage 5 fast pass so movement is closer to Fall Guys pacing.
- Fixed a respawn cleanup bug that could break after round transitions.
- Added spectator switching after qualification/elimination with Q / E / Tab.
- Added spectator HUD hint.
- Simplified client level loading by using a name-to-level map instead of constructing temporary level objects.
- Build verified with `npm run build`.

## Stage 8 - Battle Pass, Customisation, Hex Fixes, Level Expansion

Added:
- Battle Pass profile with XP, menu progress track, unlock cards and rewards.
- Bean customisation menu with selectable colours and unlockable costume styles.
- Selected bean colour/skin saves to localStorage and is used in-game.
- Hex Havoc layer spacing increased to roughly four bean-heights between layers.
- Hex Havoc kill zone and tile height checks updated for the larger vertical gaps.
- Existing levels received a stronger colourful game-show visual pass.
- Added Skyline Circuit: large futuristic race with launch pads, neon gates, sweepers and platform sections.
- Added Hoverboard Run: large moving-board obstacle level with punch blocks and gates.
- Match order now includes Door Dash -> Hex Havoc -> Skyline Circuit -> Spin Cycle -> Hoverboard Run.

Build: passes with Vite.

## Stage 11 - collision and Door Dash patch
- Restored solid start-pad colliders without reintroducing the duplicate-floor slow/no-jump bug.
- Fixed Spin Cycle and Door Dash spawn platforms so beans no longer pass through the yellow pad.
- Replaced Hex tile physics with stable flat box colliders under the visible hex meshes to reduce plate no-clips.
- Thickened Door Dash fake-door colliders to stop purple-door clipping.
- Updated Door Dash doors with matching candy-monster styling for real and fake doors.
- Pink real doors now crumble into temporary physics chunks when broken.

## Stage 12 collision patch

- Start pads are solid again without the duplicate-floor slowdown bug.
- Ground detection has a wider support band so thin pads/Hex tiles no longer trigger the slow no-jump state.
- Hex tile colliders are larger and thicker to reduce edge no-clips.
- Door Dash fake and breakable doors now share the same pink candy-monster visual colour.
- Door Dash door colliders are thicker/deeper so fake doors are much harder to phase through at speed.
