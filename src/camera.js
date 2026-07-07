import * as THREE from 'three';

export class ChaseCamera {
  constructor(camera) {
    this.camera = camera;
    // yaw is the PLAYER facing direction, not an orbit angle. The camera is
    // always locked behind that direction so mouse/trackpad turns the bean,
    // while WASD/arrow keys only request movement.
    this.yaw = Math.PI;
    this.pitch = 0.28;
    this.distance = 7.5;
    this.height = 2.4;
    this.targetPos = new THREE.Vector3();
    this.currentPos = new THREE.Vector3();
    this.initialized = false;
  }

  handleDrag(dx, dy) {
    this.yaw -= dx * 0.0042;
    this.pitch = THREE.MathUtils.clamp(this.pitch - dy * 0.0025, -0.08, 0.72);
  }

  update(targetMesh, dt) {
    const t = targetMesh.position;
    const forwardX = Math.sin(this.yaw);
    const forwardZ = Math.cos(this.yaw);
    const backX = -forwardX;
    const backZ = -forwardZ;
    const flatDistance = this.distance * Math.cos(this.pitch);
    const offsetY = this.height + this.distance * Math.sin(this.pitch);

    this.targetPos.set(t.x + backX * flatDistance, t.y + offsetY, t.z + backZ * flatDistance);
    if (!this.initialized) {
      this.currentPos.copy(this.targetPos);
      this.initialized = true;
    } else {
      this.currentPos.lerp(this.targetPos, Math.min(1, dt * 14));
    }
    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(t.x + forwardX * 1.8, t.y + 1.15, t.z + forwardZ * 1.8);
  }
}
