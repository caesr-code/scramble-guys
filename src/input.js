export class InputManager {
  constructor(camera) {
    this.camera = camera;
    this.keys = {};
    this.jumpPressed = false;
    this.divePressed = false;
    this.spectateNextPressed = false;
    this.spectatePrevPressed = false;
    this.dragging = false;
    this.lastX = 0;
    this.lastY = 0;

    window.addEventListener('keydown', (e) => {
      // Stop browser defaults from stealing gameplay keys. Arrow keys can scroll
      // the page and Space can re-click a focused menu button, which made it feel
      // like movement was not being delivered to the character controller.
      const gameplayKey = ['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','ShiftLeft','ShiftRight'].includes(e.code);
      if (gameplayKey) e.preventDefault();
      this.keys[e.code] = true;
      if (e.code === 'Space') this.jumpPressed = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.divePressed = true;
      if (e.code === 'KeyE' || e.code === 'Tab') { e.preventDefault(); this.spectateNextPressed = true; }
      if (e.code === 'KeyQ') this.spectatePrevPressed = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    const canvas = document.getElementById('scene');
    canvas.addEventListener('pointerdown', (e) => {
      // Desktop control model: mouse controls where the bean is facing. Click the
      // game once to lock the pointer, then move the mouse freely to turn/look.
      if (canvas.requestPointerLock && document.pointerLockElement !== canvas) {
        canvas.requestPointerLock();
      }
      this.dragging = true;
      this.lastX = e.clientX; this.lastY = e.clientY;
    });
    window.addEventListener('pointerup', () => { this.dragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement === canvas) {
        this.camera.handleDrag(e.movementX || 0, e.movementY || 0);
      }
    });
    window.addEventListener('pointermove', (e) => {
      // Fallback for browsers/devices where pointer lock is unavailable: drag to
      // rotate the camera/facing direction.
      if (this.dragging && document.pointerLockElement !== canvas) {
        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        this.lastX = e.clientX; this.lastY = e.clientY;
        this.camera.handleDrag(dx, dy);
      }
    });

    // Mobile joystick
    this.touchMoveX = 0;
    this.touchMoveZ = 0;
    this._setupJoystick();

    document.getElementById('jump-btn').addEventListener('touchstart', (e) => {
      e.preventDefault(); this.jumpPressed = true;
    });
    document.getElementById('dive-btn').addEventListener('touchstart', (e) => {
      e.preventDefault(); this.divePressed = true;
    });

    if (this._isMobile()) {
      document.getElementById('mobile-controls').classList.remove('hidden');
    }
  }

  _isMobile() {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  }

  _setupJoystick() {
    const zone = document.getElementById('joystick-zone');
    let active = false, startX = 0, startY = 0;
    const stick = document.createElement('div');
    stick.style.position = 'absolute';
    stick.style.width = '54px'; stick.style.height = '54px';
    stick.style.borderRadius = '50%';
    stick.style.background = 'rgba(255,255,255,0.7)';
    stick.style.left = '38px'; stick.style.top = '38px';
    stick.style.pointerEvents = 'none';
    zone.style.position = 'absolute';
    zone.appendChild(stick);

    const reset = () => {
      active = false;
      this.touchMoveX = 0; this.touchMoveZ = 0;
      stick.style.left = '38px'; stick.style.top = '38px';
    };

    zone.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = zone.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
      active = true;
    });
    zone.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!active) return;
      const t = e.touches[0];
      let dx = t.clientX - startX;
      let dy = t.clientY - startY;
      const max = 45;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len > max) { dx = dx / len * max; dy = dy / len * max; }
      stick.style.left = `${38 + dx}px`;
      stick.style.top = `${38 + dy}px`;
      this.touchMoveX = dx / max;
      this.touchMoveZ = dy / max;
    });
    zone.addEventListener('touchend', (e) => { e.preventDefault(); reset(); });
  }

  getMoveInput() {
    let x = 0, z = 0;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) z -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) z += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) x -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) x += 1;

    if (this.touchMoveX || this.touchMoveZ) {
      x = this.touchMoveX;
      z = this.touchMoveZ;
    } else {
      const len = Math.sqrt(x * x + z * z);
      if (len > 1) { x /= len; z /= len; }
    }

    const jump = this.jumpPressed;
    const dive = this.divePressed;
    const spectateNext = this.spectateNextPressed;
    const spectatePrev = this.spectatePrevPressed;
    this.jumpPressed = false;
    this.divePressed = false;
    this.spectateNextPressed = false;
    this.spectatePrevPressed = false;

    return { x, z, jump, dive, spectateNext, spectatePrev };
  }
}
