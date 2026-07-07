import * as THREE from 'three';
import { Network } from './net/network.js';
import { buildCharacterMesh } from './character.js';
import { Game } from './game.js';
import { SoundFX } from './audio.js';

const PLAYER_COLORS = [0xFF5FA2, 0x3DDC97, 0xFFD23F, 0x8C6FFF, 0x6EC6FF, 0xFF8A5C, 0xC96FFF, 0x5CFFB0, 0xFFFFFF, 0x11172B];
const SKINS = ['Rookie Bean', 'Star Belt', 'Lightning', 'Dino Spots', 'Galaxy', 'Outhouse', 'Crown Knight', 'Soda Can', 'Traffic Cone'];
const PASS_REWARDS = [
  { level: 1, label: 'Rookie Bean' }, { level: 2, label: 'Star Belt' }, { level: 3, label: 'Mint Colour' },
  { level: 4, label: 'Lightning' }, { level: 5, label: 'Gold Colour' }, { level: 6, label: 'Dino Spots' },
  { level: 7, label: 'Outhouse' }, { level: 8, label: 'Sky Blue' }, { level: 9, label: 'Galaxy' },
  { level: 10, label: 'Soda Can' }, { level: 11, label: 'Traffic Cone' }, { level: 12, label: 'Crown Knight' },
];
function colorHex(c) { return '#' + c.toString(16).padStart(6, '0'); }

function ensurePreview() {
  const holder = document.getElementById('skin-3d-preview');
  if (!holder || preview) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
  camera.position.set(0, 1.1, 4.1);
  camera.lookAt(0, 0.82, 0);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(210, 210);
  holder.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x604080, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 5, 4);
  scene.add(key);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.05, 0.12, 32), new THREE.MeshToonMaterial({ color: 0xffd23f }));
  base.position.y = -0.05;
  scene.add(base);
  preview = { scene, camera, renderer, holder, model: null, skin: null };
  function spin() {
    requestAnimationFrame(spin);
    if (!preview) return;
    if (preview.model) preview.model.rotation.y += 0.012;
    preview.renderer.render(preview.scene, preview.camera);
  }
  spin();
}
function updateSkinPreview(skin = selectedPreviewSkin) {
  ensurePreview();
  if (!preview) return;
  selectedPreviewSkin = skin;
  if (preview.model) preview.scene.remove(preview.model);
  const built = buildCharacterMesh(myColor, { skin });
  preview.model = built.group;
  preview.model.scale.setScalar(1.15);
  preview.model.position.y = 0;
  preview.scene.add(preview.model);
  const label = document.getElementById('skin-preview-label');
  if (label) label.textContent = skin;
}


const el = (id) => document.getElementById(id);

const nameInput = el('name-input');
const singleBtn = el('single-btn');
const hostBtn = el('host-btn');
const joinBtn = el('join-btn');
const joinField = el('join-field');
const roomInput = el('room-input');
const joinConfirmBtn = el('join-confirm-btn');
const roomDisplay = el('room-display');
const roomCodeText = el('room-code-text');
const lobbyList = el('lobby-list');
const startBtn = el('start-btn');
const playerCountEl = el('player-count');
const statusText = el('status-text');
const menuScreen = el('menu-screen');
const hud = el('hud');
const resultBanner = el('result-banner');
const resultTitle = el('result-title');
const resultSub = el('result-sub');
const finalScreen = el('final-screen');
const finalWinnerText = el('final-winner-text');
const playAgainBtn = el('play-again-btn');
const playersRemainingEl = el('players-remaining');
const levelNameEl = el('level-name');
const hudTimerEl = el('hud-timer');
const roundIntro = el('round-intro');
const roundIntroTitle = el('round-intro-title');
const countdownNumber = el('countdown-number');
const countdownHelp = el('countdown-help');
const spectateHint = el('spectate-hint');
const customizeBtn = el('customize-btn');
const passBtn = el('pass-btn');
const customizePanel = el('customize-panel');
const passPanel = el('pass-panel');
const colorSwatches = el('color-swatches');
const skinOptions = el('skin-options');
const beanPreview = el('bean-preview');
const beanPreviewBig = el('bean-preview-big');
const bpLevelEl = el('bp-level');
const bpLevelBigEl = el('bp-level-big');
const bpFill = el('bp-fill');
const bpFillBig = el('bp-fill-big');
const bpReward = el('bp-reward');
const bpRewardBig = el('bp-reward-big');
const passRewards = el('pass-rewards');

let network = null;
let game = null;
const profile = JSON.parse(localStorage.getItem('scrambleProfile') || '{"xp":0,"crowns":0,"color":16736162,"skin":"Rookie Bean"}');
let myColor = profile.color || PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
let mySkin = profile.skin || 'Rookie Bean';
const sound = new SoundFX();
let preview = null;
let selectedPreviewSkin = mySkin;

function saveProfile() { localStorage.setItem('scrambleProfile', JSON.stringify(profile)); }
function passLevel() { return Math.max(1, Math.floor((profile.xp || 0) / 100) + 1); }
function unlockedReward(label) {
  const lvl = passLevel();
  const reward = PASS_REWARDS.find(r => r.label === label);
  return !reward || lvl >= reward.level;
}
function awardXP(amount) { profile.xp = Math.max(0, (profile.xp || 0) + amount); saveProfile(); renderProfileUI(); }
function renderProfileUI() {
  if (!beanPreview) return;
  const crownCount = document.getElementById('crown-count');
  if (crownCount) crownCount.textContent = profile.crowns || 0;
  beanPreview.style.background = colorHex(myColor);
  if (beanPreviewBig) beanPreviewBig.style.background = colorHex(myColor);
  const lvl = passLevel();
  const fill = `${Math.min(100, (profile.xp % 100))}%`;
  bpLevelEl.textContent = lvl;
  if (bpLevelBigEl) bpLevelBigEl.textContent = lvl;
  bpFill.style.width = fill;
  if (bpFillBig) bpFillBig.style.width = fill;
  const next = PASS_REWARDS.find(r => r.level > lvl);
  const nextText = next ? `Next: ${next.label}` : 'All rewards unlocked';
  bpReward.textContent = nextText;
  if (bpRewardBig) bpRewardBig.textContent = nextText;
  if (colorSwatches && !colorSwatches.children.length) {
    PLAYER_COLORS.forEach(c => {
      const sw = document.createElement('button');
      sw.className = 'swatch'; sw.style.background = colorHex(c);
      sw.addEventListener('click', () => { profile.color = c; myColor = c; saveProfile(); renderProfileUI(); });
      colorSwatches.appendChild(sw);
    });
  }
  Array.from(colorSwatches.children).forEach((sw, i) => sw.classList.toggle('selected', PLAYER_COLORS[i] === myColor));
  if (skinOptions && !skinOptions.children.length) {
    SKINS.forEach(label => {
      const card = document.createElement('button'); card.className = 'skin-card'; card.textContent = label;
      card.addEventListener('click', () => { selectedPreviewSkin = label; updateSkinPreview(label); if (unlockedReward(label)) { profile.skin = label; mySkin = label; saveProfile(); renderProfileUI(); } });
      skinOptions.appendChild(card);
    });
  }
  Array.from(skinOptions.children).forEach(card => { card.classList.toggle('selected', card.textContent === mySkin); card.style.opacity = unlockedReward(card.textContent) ? '1' : '.42'; });
  updateSkinPreview(selectedPreviewSkin || mySkin);
  if (passRewards && !passRewards.children.length) {
    PASS_REWARDS.forEach(r => { const div = document.createElement('button'); div.className = 'pass-reward'; div.dataset.level = r.level; div.textContent = `Lv ${r.level} ${r.label}`; div.addEventListener('click', () => { if (SKINS.includes(r.label)) updateSkinPreview(r.label); }); passRewards.appendChild(div); });
  }
  Array.from(passRewards.children).forEach(div => div.classList.toggle('unlocked', Number(div.dataset.level) <= lvl));
}

function setStatus(msg) { statusText.textContent = msg; }

function refreshLobbyUI() {
  lobbyList.innerHTML = '';
  const me = document.createElement('div');
  me.className = 'lobby-chip';
  me.textContent = `${network.myName} (you)`;
  lobbyList.appendChild(me);

  network.peers.forEach((info) => {
    const chip = document.createElement('div');
    chip.className = 'lobby-chip';
    chip.textContent = info.name + (info.isHost ? ' (host)' : '');
    lobbyList.appendChild(chip);
  });

  const count = network.peers.size + 1;
  playerCountEl.textContent = count;
  if (network.isHost) startBtn.classList.remove('hidden');
}

customizeBtn && customizeBtn.addEventListener('click', () => { customizePanel.classList.toggle('hidden'); passPanel.classList.add('hidden'); });
passBtn && passBtn.addEventListener('click', () => { passPanel.classList.toggle('hidden'); customizePanel.classList.add('hidden'); });
document.querySelectorAll('.close-panel').forEach(btn => btn.addEventListener('click', () => { const target = el(btn.dataset.close); if (target) target.classList.add('hidden'); }));
renderProfileUI();

singleBtn.addEventListener('click', () => {
  sound.unlock();
  const name = nameInput.value.trim() || 'Blob';
  network = {
    isHost: true,
    peerId: 'solo-player',
    myName: name,
    peers: new Map(),
    sendEvent() {},
    sendInput() {},
    sendState() {},
    leave() {},
  };
  beginGameAsHost();
});

hostBtn.addEventListener('click', async () => {
  sound.unlock();
  const name = nameInput.value.trim() || 'Blob';
  network = new Network();
  setStatus('Setting up room...');
  const code = await network.host(name);
  roomCodeText.textContent = code;
  roomDisplay.classList.remove('hidden');
  joinField.classList.add('hidden');
  setStatus('Waiting for other blobs to join...');
  network.onLobbyUpdate = refreshLobbyUI;
  network.onPeerJoin = () => refreshLobbyUI();
  network.onPeerLeave = () => refreshLobbyUI();
  refreshLobbyUI();
});

joinBtn.addEventListener('click', () => {
  sound.unlock();
  joinField.classList.remove('hidden');
  roomDisplay.classList.add('hidden');
});

joinConfirmBtn.addEventListener('click', async () => {
  sound.unlock();
  const name = nameInput.value.trim() || 'Blob';
  const code = roomInput.value.trim();
  if (!code) { setStatus('Enter a room code first.'); return; }
  network = new Network();
  setStatus('Connecting...');
  await network.join(name, code);
  network.onLobbyUpdate = refreshLobbyUI;
  network.onPeerJoin = () => refreshLobbyUI();
  network.onPeerLeave = () => refreshLobbyUI();
  network.onEventReceived = (data) => {
    if (data.type === 'matchStart') beginGameAsClient(data);
  };
  setStatus('Connected! Waiting for host to start...');
  refreshLobbyUI();
});

startBtn.addEventListener('click', () => {
  sound.unlock();
  if (!network.isHost) return;
  startBtn.blur();
  beginGameAsHost();
});

function hideMenu() {
  if (document.activeElement) document.activeElement.blur();
  menuScreen.classList.add('hidden');
  hud.classList.remove('hidden');
}

function showMenu() {
  menuScreen.classList.remove('hidden');
  hud.classList.add('hidden');
  finalScreen.classList.add('hidden');
  resultBanner.classList.add('hidden');
}

function buildRoster(targetCount = 15) {
  // roster order: host first, then real peers, then host-owned bots.
  const roster = [{ id: network.peerId, name: network.myName, color: myColor, skin: mySkin, isBot: false }];
  let i = 1;
  network.peers.forEach((info, peerId) => {
    roster.push({ id: peerId, name: info.name, color: PLAYER_COLORS[i % PLAYER_COLORS.length], skin: 'Rookie Bean', isBot: false });
    i++;
  });
  const botCount = Math.max(0, targetCount - roster.length);
  for (let b = 0; b < botCount; b++) {
    roster.push({
      id: `bot-${b + 1}`,
      name: `Bot ${b + 1}`,
      color: PLAYER_COLORS[(i + b) % PLAYER_COLORS.length],
      skin: SKINS[(b % SKINS.length)],
      isBot: true,
    });
  }
  return roster;
}

function setupGameCommon() {
  game = new Game(network);

  game.onStatusUpdate = ({ levelName }) => {
    levelNameEl.textContent = levelName;
    roundIntroTitle.textContent = levelName;
  };

  game.onCountdownUpdate = ({ value, label, levelName }) => {
    if (!roundIntro) return;
    if (value === null) {
      roundIntro.classList.add('hidden');
      return;
    }
    roundIntro.classList.remove('hidden');
    roundIntroTitle.textContent = levelName || 'ROUND';
    countdownNumber.textContent = label;
    countdownNumber.style.animation = 'none';
    countdownNumber.offsetHeight;
    countdownNumber.style.animation = '';
    countdownHelp.textContent = label === 'GO!' ? 'Go go go!' : 'Get ready...';
    if (label === 'GO!') sound.go(); else sound.countdown(value);
  };

  game.onRoundEnd = (data) => {
    const localQualified = data.qualifiedIds.includes(network.peerId);
    resultTitle.textContent = localQualified ? 'QUALIFIED!' : 'ELIMINATED';
    resultSub.textContent = data.levelName;
    resultBanner.classList.remove('hidden');
    if (localQualified) { sound.qualify(); awardXP(40); } else { sound.eliminate(); awardXP(15); }
    setTimeout(() => resultBanner.classList.add('hidden'), 3200);
  };

  game.onMatchEnd = (data) => {
    hud.classList.add('hidden');
    finalScreen.classList.remove('hidden');
    const iWon = data.winnerId === network.peerId;
    finalWinnerText.textContent = iWon ? 'YOU WIN!' : 'BETTER LUCK NEXT TIME';
    if (iWon) { profile.crowns = (profile.crowns || 0) + 1; saveProfile(); sound.win(); awardXP(120); } else { awardXP(35); }
  };

  hideMenu();
  animate();
}

function beginGameAsHost() {
  const targetCount = network.peerId === 'solo-player' ? 11 : 15;
  const roster = buildRoster(targetCount);
  network.sendEvent({ type: 'matchStart', roster });
  setupGameCommon();
  game.addLocalPlayer(network.myName, myColor, { skin: mySkin });
  game.sound = sound;
  roster.slice(1).forEach(p => game.addRemotePlayer(p.id, p.name, p.color, p.isBot, { skin: p.skin || 'Rookie Bean' }));
  game.hostStartMatch(roster);
}

function beginGameAsClient(data) {
  const roster = data.roster;
  const mine = roster.find(p => p.id === network.peerId);
  setupGameCommon();
  game.addLocalPlayer(network.myName, mine ? mine.color : myColor, { skin: mine ? mine.skin : mySkin });
  game.sound = sound;
  roster.forEach(p => {
    if (p.id !== network.peerId) game.addRemotePlayer(p.id, p.name, p.color, p.isBot, { skin: p.skin || 'Rookie Bean' });
  });
  game.roster = roster;
}

let rafId = null;
function animate() {
  rafId = requestAnimationFrame(animate);
  game.update();
  if (game.roundActive) {
    const t = Math.max(0, Math.ceil(game.roundTimer));
    const mm = Math.floor(t / 60), ss = t % 60;
    hudTimerEl.textContent = `${mm}:${ss.toString().padStart(2, '0')}`;
    const remaining = game.activeIds ? Array.from(game.activeIds).filter(id => {
      const ch = game.characters.get(id);
      return ch && !ch.eliminated && !ch.qualified;
    }).length : 0;
    playersRemainingEl.textContent = remaining;
    const local = game.getLocalCharacter ? game.getLocalCharacter() : null;
    if (spectateHint) spectateHint.classList.toggle('hidden', !(local && (local.eliminated || local.qualified || local.spectatorOnly) && game.roundActive));
  }
}

playAgainBtn.addEventListener('click', () => {
  if (rafId) cancelAnimationFrame(rafId);
  if (network) network.leave();
  network = null;
  game = null;
  showMenu();
});
