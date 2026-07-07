import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7FD4FF);
  scene.fog = new THREE.Fog(0x9FE0FF, 60, 160);

  const canvas = document.getElementById('scene');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 300);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x4a6b8a, 0.9);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xfff4e0, 1.6);
  sun.position.set(30, 45, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -60;
  sun.shadow.camera.right = 60;
  sun.shadow.camera.top = 60;
  sun.shadow.camera.bottom = -60;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 200;
  sun.shadow.bias = -0.001;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xbfe0ff, 0.4);
  fill.position.set(-20, 20, -20);
  scene.add(fill);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, renderer, camera };
}

// Big floating clouds / decoration ring, purely cosmetic, gives arena a "floating island" feel
export function addSkyDecor(scene) {
  const cloudMat = new THREE.MeshToonMaterial({ color: 0xffffff });
  for (let i = 0; i < 14; i++) {
    const group = new THREE.Group();
    const puffs = 3 + Math.floor(Math.random() * 3);
    for (let j = 0; j < puffs; j++) {
      const geo = new THREE.SphereGeometry(2 + Math.random() * 1.5, 8, 8);
      const mesh = new THREE.Mesh(geo, cloudMat);
      mesh.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 1, (Math.random() - 0.5) * 4);
      group.add(mesh);
    }
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 60;
    group.position.set(Math.cos(angle) * dist, 20 + Math.random() * 25, Math.sin(angle) * dist);
    scene.add(group);
  }
}
