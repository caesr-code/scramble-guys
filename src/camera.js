import * as THREE from 'three';

export class ChaseCamera {
  constructor(camera) {
    this.camera = camera;
    this.yaw = Math.PI; // facing -z initially matches facingAngle convention
    this.pitch = 0.35;
    this.distance = 7.5;
    this.height = 2.5;
    this.targetPos = new THREE.Vector3();
    this.currentPos = new THREE.Vector3();
  }

  handleDrag(dx, dy) {
    this.yaw -= dx * 0.0035;
    this.pitch = THREE.MathUtils.clamp(this.pitch - dy * 0.0025, -0.15, 0.9);
  }

  update(targetMesh, dt) {
    const t = targetMesh.position;
    const offsetX = Math.sin(this.yaw) * this.distance * Math.cos(this.pitch);
    const offsetZ = Math.cos(this.yaw) * this.distance * Math.cos(this.pitch);
    const offsetY = this.height + this.distance * Math.sin(this.pitch);

    this.targetPos.set(t.x + offsetX, t.y + offsetY, t.z + offsetZ);
    this.currentPos.lerp(this.targetPos, Math.min(1, dt * 6));
    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(t.x, t.y + 1.2, t.z);
  }
}
