import {AnimationMixer, LoopOnce, Object3D, Vector3} from "three";
import Loader from "./utils/loader.js";

let camera

const center = new Vector3(-3, 0, 0)
const distance = 3
const maxAngle = Math.PI / 4

export default class Glove extends Object3D {
  constructor(_camera) {
    super()
    camera = _camera

    this.file = Loader.items.glove
    this.mixer = new AnimationMixer(this.file.scene)
    this.hit = this.mixer.clipAction(this.file.animations[0])
    this.hit.setLoop(LoopOnce, 1)

    this.add(this.file.scene)
    this.targetPosition = this.position.clone()
    this.scale.setScalar(0.6)

    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('mousedown', this.onHit.bind(this))
  }

  onMouseMove(event) {
    let angle = Math.PI / 2
    angle -= (event.clientX / window.innerWidth) * maxAngle - maxAngle / 2
    const elevation = 8 - (event.clientY / window.innerHeight) * 4 - 2

    const position = new Vector3(
      center.x + Math.cos(angle) * distance,
      center.y + elevation,
      center.z + Math.sin(angle) * distance
    )

    this.targetPosition.x = position.x
    this.targetPosition.y = elevation
    this.targetPosition.z = position.z
  }

  onHit() {
    this.hit.stop()
    this.hit.reset()
    this.hit.play()
  }

  update(time) {
    this.mixer.update(time.delta)

    this.position.lerp(this.targetPosition, 0.1)
    this.lookAt(new Vector3(-3, this.targetPosition.y, 0))
  }
}