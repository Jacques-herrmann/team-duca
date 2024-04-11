import {DirectionalLight, EventDispatcher, PerspectiveCamera, Raycaster, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/addons";
import Physics from "./physics.js";
import Loader from "./utils/loader.js";
import Glove from "./glove.js";

let time = {
  start: Date.now(),
  current: 0,
  elapsed: 0,
  delta: 16,
}

let pointer = undefined
const raycaster = new Raycaster()

export default class Engine extends EventDispatcher {
  constructor() {
    super()
    this.init()

    this.onResize()
    window.addEventListener('resize', this.onResize.bind(this))
  }

  init() {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(-8, 9, 10)

    this.renderer = new WebGLRenderer({antialias: true, alpha: true, powerPreference: "high-performance"});
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.target.set(-2, 6.5, 0)

    const light = new DirectionalLight(0xffffff, 3);
    light.position.set(-10, 10, 5);
    this.scene.add(light);

    const environment = Loader.items.environment.scene
    this.scene.add(environment)
    this.glove = new Glove()
    this.scene.add(this.glove)

    this.physics = new Physics(this.scene, this.camera)
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  onStart() {
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(t, frame) {
    const currentTime = t
    time.delta = (currentTime - time.current) * 0.001
    time.current = currentTime
    time.elapsed = time.current - time.start

    this.controls?.update()
    this.physics.update(time)
    this.glove.update(time)

    this.renderer.render(this.scene, this.camera)
  }
}