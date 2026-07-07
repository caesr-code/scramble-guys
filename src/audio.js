export class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  unlock() {
    if (!this.enabled) return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) { this.enabled = false; return; }
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  tone(freq = 440, duration = 0.12, type = 'sine', volume = 0.08, slideTo = null) {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  noise(duration = 0.12, volume = 0.08) {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    src.buffer = buffer;
    src.connect(gain).connect(this.ctx.destination);
    src.start(now);
  }

  countdown(n) { this.tone(n === 1 ? 660 : 520, 0.16, 'square', 0.07, n === 1 ? 760 : 560); }
  go() { this.tone(880, 0.22, 'triangle', 0.09, 1320); setTimeout(() => this.tone(1320, 0.16, 'triangle', 0.07), 70); }
  jump() { this.tone(360, 0.12, 'triangle', 0.055, 620); }
  dive() { this.noise(0.09, 0.06); this.tone(180, 0.12, 'sawtooth', 0.035, 110); }
  qualify() { this.tone(660, 0.13, 'triangle', 0.07); setTimeout(() => this.tone(880, 0.16, 'triangle', 0.07), 120); }
  eliminate() { this.tone(260, 0.18, 'sawtooth', 0.055, 120); }
  win() { [0, 110, 220, 360].forEach((d, i) => setTimeout(() => this.tone([660, 880, 990, 1320][i], 0.16, 'triangle', 0.075), d)); }
}
