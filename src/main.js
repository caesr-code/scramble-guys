import { Network } from './net/network.js';
import { Game } from './game.js';

const PLAYER_COLORS = [0xFF5FA2, 0x3DDC97, 0xFFD23F, 0x8C6FFF, 0x6EC6FF, 0xFF8A5C, 0xC96FFF, 0x5CFFB0];
function colorHex(c) { return '#' + c.toString(16).padStart(6, '0'); }

const el = (id) => document.getElementById(id);

const nameInput = el('name-input');
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

let network = null;
let game = null;
let myColor = PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];

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

hostBtn.addEventListener('click', async () => {
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
  joinField.classList.remove('hidden');
  roomDisplay.classList.add('hidden');
});

joinConfirmBtn.addEventListener('click', async () => {
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

function buildRoster() {
  // roster order: host first (deterministic across all peers since everyone knows peer list + names)
  const roster = [{ id: network.peerId, name: network.myName, color: myColor }];
  let i = 1;
  network.peers.forEach((info, peerId) => {
    roster.push({ id: peerId, name: info.name, color: PLAYER_COLORS[i % PLAYER_COLORS.length] });
    i++;
  });
  return roster;
}

function setupGameCommon() {
  game = new Game(network);

  game.onStatusUpdate = ({ levelName }) => {
    levelNameEl.textContent = levelName;
  };

  game.onRoundEnd = (data) => {
    const localQualified = data.qualifiedIds.includes(network.peerId);
    resultTitle.textContent = localQualified ? 'QUALIFIED!' : 'ELIMINATED';
    resultSub.textContent = data.levelName;
    resultBanner.classList.remove('hidden');
    setTimeout(() => resultBanner.classList.add('hidden'), 3200);
  };

  game.onMatchEnd = (data) => {
    hud.classList.add('hidden');
    finalScreen.classList.remove('hidden');
    const iWon = data.winnerId === network.peerId;
    finalWinnerText.textContent = iWon ? 'YOU WIN!' : 'BETTER LUCK NEXT TIME';
  };

  hideMenu();
  animate();
}

function beginGameAsHost() {
  const roster = buildRoster();
  network.sendEvent({ type: 'matchStart', roster });
  setupGameCommon();
  game.addLocalPlayer(network.myName, myColor);
  roster.slice(1).forEach(p => game.addRemotePlayer(p.id, p.name, p.color));
  game.hostStartMatch(roster);
}

function beginGameAsClient(data) {
  const roster = data.roster;
  const mine = roster.find(p => p.id === network.peerId);
  setupGameCommon();
  game.addLocalPlayer(network.myName, mine ? mine.color : myColor);
  roster.forEach(p => {
    if (p.id !== network.peerId) game.addRemotePlayer(p.id, p.name, p.color);
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
      return ch && !ch.eliminated;
    }).length : 0;
    playersRemainingEl.textContent = remaining;
  }
}

playAgainBtn.addEventListener('click', () => {
  if (rafId) cancelAnimationFrame(rafId);
  if (network) network.leave();
  network = null;
  game = null;
  showMenu();
});
