import { Network } from './net/network.js';
import { Game } from './game.js';
import { SoundFX } from './audio.js';

const PLAYER_COLORS = [0xFF5FA2, 0x3DDC97, 0xFFD23F, 0x8C6FFF, 0x6EC6FF, 0xFF8A5C, 0xC96FFF, 0x5CFFB0, 0xFFFFFF, 0x11172B];
const SKINS = ['Rookie Bean', 'Star Belt', 'Lightning', 'Dino Spots', 'Galaxy'];
const PASS_REWARDS = [
  { level: 1, label: 'Rookie Bean' }, { level: 2, label: 'Star Belt' }, { level: 3, label: 'Mint Colour' },
  { level: 4, label: 'Lightning' }, { level: 5, label: 'Gold Colour' }, { level: 6, label: 'Dino Spots' },
  { level: 7, label: 'Sky Blue' }, { level: 8, label: 'Galaxy' }, { level: 9, label: 'Crown Badge' },
];
function colorHex(c) { return '#' + c.toString(16).padStart(6, '0'); }

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
const bpLevelEl = el('bp-level');
const bpFill = el('bp-fill');
const bpReward = el('bp-reward');
const passRewards = el('pass-rewards');

let network = null;
let game = null;
const profile = JSON.parse(localStorage.getItem('scrambleProfile') || '{"xp":0,"color":16736162,"skin":"Rookie Bean"}');
let myColor = profile.color || PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
let mySkin = profile.skin || 'Rookie Bean';
const sound = new SoundFX();

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
  beanPreview.style.background = colorHex(myColor);
  const lvl = passLevel();
  bpLevelEl.textContent = lvl;
  bpFill.style.width = `${Math.min(100, (profile.xp % 100))}%`;
  const next = PASS_REWARDS.find(r => r.level > lvl);
  bpReward.textContent = next ? `Next: ${next.label}` : 'All rewards unlocked';
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
      card.addEventListener('click', () => { if (unlockedReward(label)) { profile.skin = label; mySkin = label; saveProfile(); renderProfileUI(); } });
      skinOptions.appendChild(card);
    });
  }
  Array.from(skinOptions.children).forEach(card => { card.classList.toggle('selected', card.textContent === mySkin); card.style.opacity = unlockedReward(card.textContent) ? '1' : '.42'; });
  if (passRewards && !passRewards.children.length) {
    PASS_REWARDS.forEach(r => { const div = document.createElement('div'); div.className = 'pass-reward'; div.dataset.level = r.level; div.textContent = `Lv ${r.level} ${r.label}`; passRewards.appendChild(div); });
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
    if (iWon) { sound.win(); awardXP(120); } else { awardXP(35); }
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
