import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  EventDispatcher,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Quaternion,
  Raycaster,
  SphereGeometry,
  Vector3
} from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import Loader from "./utils/loader.js";
import config from "./config.js";
import debug from "./utils/debug.js";
import {clamp} from "./utils/math.js";
import * as Ammo from "@/libs/ammo.wasm.js";

console.log(Ammo)


let constants = config

let scene, camera, mouseCoords = new Vector3(), clickRequest = false;
const pos = new Vector3();
const quat = new Quaternion();
const raycaster = new Raycaster();
const ballMaterial = new MeshBasicMaterial({color: 0x202020, transparent: true, opacity: 0.2});

let timer = 0

export default class Physics extends EventDispatcher {
  constructor(_scene, _camera) {
    scene = _scene
    camera = _camera
    super()
    this.rigidBodies = []
    this.softBodies = []

    this.ready = false

    Ammo().then(() => {
      this.init()
      this.ready = true
      if (debug.active) {
        debug.debugPhysics(constants, this.bag.userData.physicsBody)
      }
    })
  }

  init() {
    this.initPhysics()
    this.createObjects()
    this.initInput()
  }

  initPhysics() {
    // this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration()
    this.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration()
    this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration)
    this.broadphase = new Ammo.btDbvtBroadphase()
    this.solver = new Ammo.btSequentialImpulseConstraintSolver()
    this.softBodySolver = new Ammo.btDefaultSoftBodySolver()

    this.physicsWorld = new Ammo.btSoftRigidDynamicsWorld(this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration, this.softBodySolver);
    this.physicsWorld.setGravity(new Ammo.btVector3(0, constants.gravity, 0));
    this.physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, constants.gravity, 0));

    this.transformAux1 = new Ammo.btTransform();
    this.softBodyHelpers = new Ammo.btSoftBodyHelpers();
  }

  createObjects() {

    // Ground
    pos.set(0, -0.5, 0);
    quat.set(0, 0, 0, 1);

    // const ground = this.createParalellepiped(40, 1, 40, 0, pos, quat, new MeshPhongMaterial({color: 0xaaaaaa}));

    // Punching Bag
    let punchingBagGeometry = new BoxGeometry(0.5, constants.bagHeight, 0.5, 20, 20, 20)
    const file = Loader.items.punchingBag.scene
    punchingBagGeometry = file.children[0].geometry

    pos.set(constants.bag.x, constants.armHeight - constants.ropeLength, constants.bag.z)
    punchingBagGeometry.translate(pos.x, pos.y, pos.z)
    this.bag = this.createSoftVolume(punchingBagGeometry, constants.bag.volumeMass, constants.bag.pressure)

    const ball = new Mesh(new SphereGeometry(0.5, 20, 20), new MeshBasicMaterial({
      color: 0x202020,
      transparent: true,
      opacity: 0.5
    }));
    const ballShape = new Ammo.btSphereShape(0.5);
    ballShape.setMargin(constants.margin);
    pos.set(constants.bag.x, constants.armHeight - constants.ropeLength, constants.bag.z);
    quat.set(0, 0, 0, 1);
    this.createRigidBody(ball, ballShape, 1.2, pos, quat);
    ball.userData.physicsBody.setFriction(0.5);

    // The rope
    // Rope graphic object
    const ropePos = pos.clone();
    ropePos.y = constants.armHeight - constants.ropeLength * 0.5 - 0.5;

    const segmentLength = constants.ropeLength / constants.ropeNumSegments;
    const ropeGeometry = new BufferGeometry();
    const ropeMaterial = new LineBasicMaterial({color: 0x000000});
    const ropePositions = [];
    const ropeIndices = [];
    for (let i = 0; i < constants.ropeNumSegments + 1; i++) {
      ropePositions.push(ropePos.x, ropePos.y + i * segmentLength, ropePos.z);
    }
    for (let i = 0; i < constants.ropeNumSegments; i++) {
      ropeIndices.push(i, i + 1);
    }
    ropeGeometry.setIndex(new BufferAttribute(new Uint16Array(ropeIndices), 1));
    ropeGeometry.setAttribute('position', new BufferAttribute(new Float32Array(ropePositions), 3));
    ropeGeometry.computeBoundingSphere();
    this.rope = new LineSegments(ropeGeometry, ropeMaterial);
    scene.add(this.rope);

    // Rope physic object
    const softBodyHelpers = new Ammo.btSoftBodyHelpers();
    const ropeStart = new Ammo.btVector3(ropePos.x, ropePos.y, ropePos.z);
    const ropeEnd = new Ammo.btVector3(ropePos.x, ropePos.y + constants.ropeLength, ropePos.z);
    const ropeSoftBody = softBodyHelpers.CreateRope(this.physicsWorld.getWorldInfo(), ropeStart, ropeEnd, constants.ropeNumSegments - 1, 0);
    const sbConfig = ropeSoftBody.get_m_cfg();
    sbConfig.set_viterations(10);
    sbConfig.set_piterations(10);
    ropeSoftBody.setTotalMass(constants.ropeMass, false);
    Ammo.castObject(ropeSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(constants.margin * 3);
    this.physicsWorld.addSoftBody(ropeSoftBody, 1, -1);
    this.rope.userData.physicsBody = ropeSoftBody;
    // Disable deactivation
    ropeSoftBody.setActivationState(4);

    // The base
    const pylonHeight = ropePos.y + constants.ropeLength;
    const baseMaterial = new MeshBasicMaterial({color: 0x606060, transparent: true, opacity: 0});
    pos.set(ropePos.x, 0.1, ropePos.z - constants.armLength);
    quat.set(0, 0, 0, 1);
    const base = this.createParalellepiped(40, 0.2, 40, 0, pos, quat, baseMaterial);

    pos.set(ropePos.x, 0.5 * pylonHeight, ropePos.z - constants.armLength);
    const pylon = this.createParalellepiped(10, pylonHeight, 0.4, 0, pos, quat, baseMaterial);

    pos.set(ropePos.x, pylonHeight + 0.2, ropePos.z - 0.5 * constants.armLength);
    const arm = this.createParalellepiped(10, 0.4, constants.armLength + 0.4, 0, pos, quat, baseMaterial);

    // Glue the rope extremes to the ball and the arm
    const influence = 1;
    ropeSoftBody.appendAnchor(0, ball.userData.physicsBody, true, influence);
    ropeSoftBody.appendAnchor(constants.ropeNumSegments, arm.userData.physicsBody, true, influence);

    for (let i = 0; i < 63; i++) {
      this.bag.userData.physicsBody.appendAnchor(i, ball.userData.physicsBody, true, influence);
    }
    // this.bag.userData.physicsBody.appendAnchor(0, ball.userData.physicsBody, true, influence);

    // Hinge constraint to move the arm
    const pivotA = new Ammo.btVector3(0, pylonHeight * 0.5, 0);
    const pivotB = new Ammo.btVector3(0, -0.2, -constants.armLength * 0.5);
    const axis = new Ammo.btVector3(0, 1, 0);
    this.hinge = new Ammo.btHingeConstraint(pylon.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true);
    this.physicsWorld.addConstraint(this.hinge, true);
  }

  createParalellepiped(sx, sy, sz, mass, pos, quat, material) {
    const threeObject = new Mesh(new BoxGeometry(sx, sy, sz, 1, 1, 1), material);
    const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
    shape.setMargin(constants.margin);

    this.createRigidBody(threeObject, shape, mass, pos, quat);

    return threeObject;
  }

  createRigidBody(threeObject, physicsShape, mass, pos, quat) {
    threeObject.position.copy(pos);
    threeObject.quaternion.copy(quat);

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    const motionState = new Ammo.btDefaultMotionState(transform);

    const localInertia = new Ammo.btVector3(0, 0, 0);
    physicsShape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
    const body = new Ammo.btRigidBody(rbInfo);

    threeObject.userData.physicsBody = body;

    scene.add(threeObject);

    if (mass > 0) {
      this.rigidBodies.push(threeObject);
      // Disable deactivation
      body.setActivationState(4);
    }

    this.physicsWorld.addRigidBody(body);
    return body
  }

  createSoftVolume(bufferGeom, mass, pressure) {

    this.processGeometry(bufferGeom);

    const volume = new Mesh(bufferGeom, new MeshPhongMaterial({color: 0xFFFFFF}));
    volume.frustumCulled = false;
    scene.add(volume);

    // Volume physic object

    const volumeSoftBody = this.softBodyHelpers.CreateFromTriMesh(
      this.physicsWorld.getWorldInfo(),
      bufferGeom.ammoVertices,
      bufferGeom.ammoIndices,
      bufferGeom.ammoIndices.length / 3,
      true);

    const sbConfig = volumeSoftBody.get_m_cfg();
    sbConfig.set_viterations(constants.bag.viterations);
    sbConfig.set_piterations(constants.bag.piterations);

    // Soft-soft and soft-rigid collisions
    sbConfig.set_collisions(constants.bag.collisions);

    // Friction
    sbConfig.set_kDF(constants.bag.kDF)
    // Damping
    sbConfig.set_kDP(constants.bag.kDP);
    // Pressure
    sbConfig.set_kPR(pressure);
    // Stiffness
    volumeSoftBody.get_m_materials().at(0).set_m_kLST(constants.bag.stiffness);
    volumeSoftBody.get_m_materials().at(0).set_m_kAST(constants.bag.stiffness);

    volumeSoftBody.setTotalMass(mass, false);
    Ammo.castObject(volumeSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(constants.margin);
    this.physicsWorld.addSoftBody(volumeSoftBody, 1, -1);
    volume.userData.physicsBody = volumeSoftBody;
    // Disable deactivation
    volumeSoftBody.setActivationState(4);

    this.softBodies.push(volume);
    return volume
  }

  processGeometry(bufGeometry) {

    // Ony consider the position values when merging the vertices
    const posOnlyBufGeometry = new BufferGeometry();
    posOnlyBufGeometry.setAttribute('position', bufGeometry.getAttribute('position'));
    posOnlyBufGeometry.setIndex(bufGeometry.getIndex());

    // Merge the vertices so the triangle soup is converted to indexed triangles
    const indexedBufferGeom = BufferGeometryUtils.mergeVertices(posOnlyBufGeometry);

    // Create index arrays mapping the indexed vertices to bufGeometry vertices
    this.mapIndices(bufGeometry, indexedBufferGeom);
  }

  mapIndices(bufGeometry, indexedBufferGeom) {

    // Creates ammoVertices, ammoIndices and ammoIndexAssociation in bufGeometry

    const vertices = bufGeometry.attributes.position.array;
    const idxVertices = indexedBufferGeom.attributes.position.array;
    const indices = indexedBufferGeom.index.array;

    const numIdxVertices = idxVertices.length / 3;
    const numVertices = vertices.length / 3;

    bufGeometry.ammoVertices = idxVertices;
    bufGeometry.ammoIndices = indices;
    bufGeometry.ammoIndexAssociation = [];

    for (let i = 0; i < numIdxVertices; i++) {
      const association = [];
      bufGeometry.ammoIndexAssociation.push(association);
      const i3 = i * 3;
      for (let j = 0; j < numVertices; j++) {
        const j3 = j * 3;
        if (this.isEqual(idxVertices[i3], idxVertices[i3 + 1], idxVertices[i3 + 2],
          vertices[j3], vertices[j3 + 1], vertices[j3 + 2])) {
          association.push(j3);
        }
      }
    }
  }

  isEqual(x1, y1, z1, x2, y2, z2) {
    const delta = 0.000001;
    return Math.abs(x2 - x1) < delta &&
      Math.abs(y2 - y1) < delta &&
      Math.abs(z2 - z1) < delta;
  }

  initInput() {
    let time
    let isDown = false
    window.addEventListener('pointerdown', (event) => {
      if (isDown) return
      isDown = true
      time = performance.now()
    });
    window.addEventListener('pointerup', (event) => {
      isDown = false
      const force = clamp(performance.now() - time, 200, 600)
      console.log(force)
      mouseCoords.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      this.punch(force)

    })

  }

  punch(force) {
    raycaster.setFromCamera(mouseCoords, camera);

    // Creates a ball
    const ballMass = 2;
    const ballRadius = 0.4;

    const ball = new Mesh(new SphereGeometry(ballRadius, 18, 16), ballMaterial);
    ball.castShadow = true;
    ball.receiveShadow = true;
    const ballShape = new Ammo.btSphereShape(ballRadius);
    ballShape.setMargin(constants.margin);
    pos.copy(raycaster.ray.direction);
    pos.add(raycaster.ray.origin);
    quat.set(0, 0, 0, 1);
    const ballBody = this.createRigidBody(ball, ballShape, ballMass, pos, quat);
    ballBody.setFriction(0.5);

    pos.copy(raycaster.ray.direction);
    pos.multiplyScalar(force / 10);
    ballBody.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z));


  }

  update(time) {
    if (!this.ready) return
    // Hinge control
    // this.hinge.enableAngularMotor(true, 1.5 * this.armMovement, 50);

    // Step world
    this.physicsWorld.stepSimulation(time.delta, 10);

    // Update rope
    const softBody = this.rope.userData.physicsBody;
    const ropePositions = this.rope.geometry.attributes.position.array;
    const numVerts = ropePositions.length / 3;
    const nodes = softBody.get_m_nodes();
    let indexFloat = 0;

    for (let i = 0; i < numVerts; i++) {
      const node = nodes.at(i);
      const nodePos = node.get_m_x();
      ropePositions[indexFloat++] = nodePos.x();
      ropePositions[indexFloat++] = nodePos.y();
      ropePositions[indexFloat++] = nodePos.z();
    }

    this.rope.geometry.attributes.position.needsUpdate = true;

    for (let i = 0, il = this.softBodies.length; i < il; i++) {
      const volume = this.softBodies[i];
      const geometry = volume.geometry;
      const softBody = volume.userData.physicsBody;
      const volumePositions = geometry.attributes.position.array;
      const volumeNormals = geometry.attributes.normal.array;
      const association = geometry.ammoIndexAssociation;
      const numVerts = association.length;
      const nodes = softBody.get_m_nodes();
      for (let j = 0; j < numVerts; j++) {
        const node = nodes.at(j);
        const nodePos = node.get_m_x();
        const x = nodePos.x();
        const y = nodePos.y();
        const z = nodePos.z();
        const nodeNormal = node.get_m_n();
        const nx = nodeNormal.x();
        const ny = nodeNormal.y();
        const nz = nodeNormal.z();

        const assocVertex = association[j];

        for (let k = 0, kl = assocVertex.length; k < kl; k++) {
          let indexVertex = assocVertex[k];
          volumePositions[indexVertex] = x;
          volumeNormals[indexVertex] = nx;
          indexVertex++;
          volumePositions[indexVertex] = y;
          volumeNormals[indexVertex] = ny;
          indexVertex++;
          volumePositions[indexVertex] = z;
          volumeNormals[indexVertex] = nz;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.normal.needsUpdate = true;

    }

    // Update rigid bodies
    for (let i = 0, il = this.rigidBodies.length; i < il; i++) {
      const objThree = this.rigidBodies[i];
      const objPhys = objThree.userData.physicsBody;
      const ms = objPhys.getMotionState();
      if (ms) {
        ms.getWorldTransform(this.transformAux1);
        const p = this.transformAux1.getOrigin();
        const q = this.transformAux1.getRotation();
        objThree.position.set(p.x(), p.y(), p.z());
        objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
  }
}