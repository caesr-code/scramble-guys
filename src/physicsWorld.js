import * as CANNON from 'cannon-es';

export function createPhysicsWorld() {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -28, 0), // punchy, arcade-ish gravity like the real game
  });
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.allowSleep = false;
  world.solver.iterations = 20; // more robust contact resolution for fast-moving compound shapes
  world.defaultContactMaterial.friction = 0.08;
  world.defaultContactMaterial.restitution = 0.0;

  const groundMaterial = new CANNON.Material('ground');
  const playerMaterial = new CANNON.Material('player');
  const slideMaterial = new CANNON.Material('slide');
  const bounceMaterial = new CANNON.Material('bounce');

  world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, playerMaterial, {
    friction: 0.0, restitution: 0.02,
  }));
  world.addContactMaterial(new CANNON.ContactMaterial(slideMaterial, playerMaterial, {
    friction: 0.02, restitution: 0.0,
  }));
  world.addContactMaterial(new CANNON.ContactMaterial(bounceMaterial, playerMaterial, {
    friction: 0.3, restitution: 1.6,
  }));
  world.addContactMaterial(new CANNON.ContactMaterial(playerMaterial, playerMaterial, {
    friction: 0.0, restitution: 0.15,
  }));

  return { world, groundMaterial, playerMaterial, slideMaterial, bounceMaterial };
}
