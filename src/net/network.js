// True P2P networking using Trystero (WebRTC data channels, BitTorrent tracker
// signaling — no game server needed at all, just peers finding each other).
// Loaded straight from a CDN as a browser ES module since the native/node build
// of trystero doesn't apply here — everything runs client-side in the browser.
import { joinRoom } from 'https://esm.sh/trystero@0.20.1/torrent';

const APP_ID = 'scramble-royale-v1';

export class Network {
  constructor() {
    this.room = null;
    this.roomCode = null;
    this.isHost = false;
    this.peerId = Math.random().toString(36).slice(2, 10);
    this.myName = 'Blob';

    this.peers = new Map(); // peerId -> { name, color }

    this.sendInput = null;
    this.getInput = null;
    this.sendState = null;
    this.getState = null;
    this.sendEvent = null;
    this.getEvent = null;
    this.sendLobby = null;
    this.getLobby = null;

    this.onPeerJoin = null;
    this.onPeerLeave = null;
    this.onLobbyUpdate = null;
    this.onStateReceived = null;
    this.onInputReceived = null;
    this.onEventReceived = null;
  }

  _makeRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  async host(name) {
    this.myName = name || 'Blob';
    this.isHost = true;
    this.roomCode = this._makeRoomCode();
    this._joinRoom(this.roomCode);
    return this.roomCode;
  }

  async join(name, code) {
    this.myName = name || 'Blob';
    this.isHost = false;
    this.roomCode = code.toUpperCase();
    this._joinRoom(this.roomCode);
    return this.roomCode;
  }

  _joinRoom(code) {
    this.room = joinRoom({ appId: APP_ID }, code);

    const [sendInput, getInput] = this.room.makeAction('input');
    const [sendState, getState] = this.room.makeAction('state');
    const [sendEvent, getEvent] = this.room.makeAction('event');
    const [sendLobby, getLobby] = this.room.makeAction('lobby');

    this.sendInput = sendInput;
    this.sendState = sendState;
    this.sendEvent = sendEvent;
    this.sendLobby = sendLobby;

    getInput((data, peerId) => this.onInputReceived && this.onInputReceived(data, peerId));
    getState((data) => this.onStateReceived && this.onStateReceived(data));
    getEvent((data, peerId) => this.onEventReceived && this.onEventReceived(data, peerId));
    getLobby((data, peerId) => {
      this.peers.set(peerId, data);
      this.onLobbyUpdate && this.onLobbyUpdate();
    });

    this.room.onPeerJoin((peerId) => {
      // announce ourselves to the new peer (and everyone re-announces so lobby stays in sync)
      this.sendLobby({ name: this.myName, isHost: this.isHost });
      this.onPeerJoin && this.onPeerJoin(peerId);
    });

    this.room.onPeerLeave((peerId) => {
      this.peers.delete(peerId);
      this.onPeerLeave && this.onPeerLeave(peerId);
      this.onLobbyUpdate && this.onLobbyUpdate();
    });
  }

  broadcastLobby() {
    if (this.sendLobby) this.sendLobby({ name: this.myName, isHost: this.isHost });
  }

  allPeerIds() {
    return Array.from(this.peers.keys());
  }

  leave() {
    if (this.room) this.room.leave();
    this.room = null;
    this.peers.clear();
  }
}
