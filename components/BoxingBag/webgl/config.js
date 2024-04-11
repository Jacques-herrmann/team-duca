const DEBUG = true;
export default {
  debug: DEBUG,
  controls: false,
  gravity: -9.8,
  margin: 0.05,
  ballMass: 1.2,
  bagHeight: 2.5,
  ropeNumSegments: 10,
  ropeLength: 2,
  ropeMass: 3,
  armMass: 2,
  armLength: 12,
  armHeight: 12,
  bag: {
    x: -3,
    z: 0,
    volumeMass: 10,
    pressure: 1000,
    viterations: 40,
    piterations: 40,
    collisions: 0x11,
    kDF: 0.1,
    kDP: 0.01,
    kPR: 100,
    stiffness: 0.6,
    punchSpeed: 20
  }
}