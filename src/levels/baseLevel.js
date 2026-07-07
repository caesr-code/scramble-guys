import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Shared helpers for building level geometry with matching visual mesh + physics body.
export class LevelBuilder {
  constructor(scene, world, materials) {
    this.scene = scene;
    this.world = world;
    this.materials = materials;
    this.dynamicBodies = []; // { body, mesh, update(dt, t) } for moving hazards
    this.disposables = [];
  }

  box(w, h, d, pos, opts = {}) {
    const {
      color = 0xffffff,
      mass = 0,
      material = this.materials.groundMaterial,
      rotation = null,
      castShadow = true,
      receiveShadow = true,
      visible = true,
      emissive = null,
      grid = false,
    } = opts;

    const geo = new THREE.BoxGeometry(w, h, d);
    const matOpts = { color };
    if (emissive) { matOpts.emissive = emissive; matOpts.emissiveIntensity = 0.4; }
    const mat = new THREE.MeshToonMaterial(matOpts);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.visible = visible;
    if (rotation) mesh.rotation.copy(rotation);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    this.scene.add(mesh);

    if (grid) {
      // Thin darker stripes across the top face so translation across a flat
      // platform is immediately visible even without camera movement.
      const stripeMat = new THREE.MeshToonMaterial({ color: 0x000000, transparent: true, opacity: 0.08 });
      const stripeCount = Math.floor(d / 3);
      for (let i = 0; i < stripeCount; i++) {
        const stripeGeo = new THREE.BoxGeometry(w + 0.02, 0.05, 0.25);
        const stripe = new THREE.Mesh(stripeGeo, stripeMat);
        stripe.position.set(pos.x, pos.y + h / 2 + 0.03, pos.z - d / 2 + i * 3 + 1.5);
        this.scene.add(stripe);
      }
    }

    const shape = new CANNON.Box(new CANNON.Vec3(w / 2, h / 2, d / 2));
    const body = new CANNON.Body({ mass, shape, material });
    body.position.set(pos.x, pos.y, pos.z);
    if (rotation) body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
    this.world.addBody(body);

    return { mesh, body };
  }

  cylinder(radiusTop, radiusBottom, height, pos, opts = {}) {
    const { color = 0xffffff, mass = 0, material = this.materials.groundMaterial, radialSegments = 16, rotation = null } = opts;
    const geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color }));
    mesh.position.copy(pos);
    if (rotation) mesh.rotation.copy(rotation);
    mesh.castShadow = true; mesh.receiveShadow = true;
    this.scene.add(mesh);

    const shape = new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments);
    const body = new CANNON.Body({ mass, shape, material });
    body.position.set(pos.x, pos.y, pos.z);
    if (rotation) body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z);
    this.world.addBody(body);
    return { mesh, body };
  }

  hexPrism(radius, height, pos, opts = {}) {
    const { color = 0xffffff, mass = 0, material = this.materials.groundMaterial } = opts;
    const geo = new THREE.CylinderGeometry(radius, radius, height, 6);
    geo.rotateY(Math.PI / 6);
    const mesh = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color }));
    mesh.position.copy(pos);
    mesh.castShadow = true; mesh.receiveShadow = true;
    this.scene.add(mesh);

    // Cannon's cylinder collider was the source of intermittent Hex no-clips in
    // this browser build. Use one conservative solid box collider per visible
    // hex instead: not pixel-perfect, but stable, flat, and impossible to slip
    // through between layers. The collider is now deliberately generous so the
    // bean cannot land on a visible tile edge and slip through a physics gap.
    const shape = new CANNON.Box(new CANNON.Vec3(radius * 0.98, Math.max(height / 2, 0.42), radius * 0.86));
    const body = new CANNON.Body({ mass, shape, material });
    body.position.set(pos.x, pos.y, pos.z);
    this.world.addBody(body);
    return { mesh, body };
  }


  arch(width, height, z, colorA = 0xff5fa2, colorB = 0xffd23f) {
    const postW = 0.45;
    this.box(postW, height, 0.5, new THREE.Vector3(-width / 2, height / 2 - 0.02, z), { color: colorA });
    this.box(postW, height, 0.5, new THREE.Vector3(width / 2, height / 2 - 0.02, z), { color: colorA });
    this.box(width + postW, 0.52, 0.58, new THREE.Vector3(0, height - 0.03, z), { color: colorB });
    const dots = 9;
    for (let i = 0; i < dots; i++) {
      const x = -width / 2 + (width / (dots - 1)) * i;
      this.cylinder(0.12, 0.12, 0.09, new THREE.Vector3(x, height + 0.31, z), { color: i % 2 ? 0xffffff : colorA, radialSegments: 10, rotation: new THREE.Euler(Math.PI / 2, 0, 0) });
    }
  }

  bumper(radius, pos, color = 0xffffff) {
    const ring = this.cylinder(radius, radius, 0.32, pos, { color, radialSegments: 20 });
    ring.mesh.scale.y = 0.55;
    return ring;
  }


  killzoneAt(y) {
    return y;
  }
}

export class BaseLevel {
  constructor(scene, world, materials) {
    this.scene = scene;
    this.world = world;
    this.materials = materials;
    this.builder = new LevelBuilder(scene, world, materials);
    this.spawnPoints = [];
    this.killY = -20;
    this.name = 'LEVEL';
    this.timeLimit = 90;
    this.decor = [];
  }

  build() { /* override */ }
  update(dt, t) { /* override: animate moving hazards */ }
  getSpawnPoint(index) {
    return this.spawnPoints[index % this.spawnPoints.length];
  }
  // Returns true if a player position counts as "finished" this level (for race-style levels)
  checkFinish(pos) { return false; }
  dispose() {
    this.builder.dynamicBodies.forEach(({ body }) => this.world.removeBody(body));
  }
}
