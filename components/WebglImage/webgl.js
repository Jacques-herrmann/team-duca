import {Mesh, Program, Renderer, Texture, Triangle, Vec2, Vec4} from "ogl";
import vertex from "~/components/WebglImage/vertex.glsl?raw";
import fragment from "~/components/WebglImage/fragment.glsl?raw";

let canvas, renderer, gl, program, mesh, cursor

let ratio = 1
let resolution = new Vec4()
let loaded = 0
let target = new Vec2()
let vTarget = new Vec2()

const webgl = () => {
  const init = (_canvas, url, _cursor) => {
    cursor = _cursor
    canvas = _canvas
    renderer = new Renderer({
      canvas: canvas.value,
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: 2
    });
    gl = renderer.gl;

    const geometry = new Triangle(gl)
    const texture = new Texture(gl)
    const dmap = new Texture(gl)

    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.onload = () => {
      ratio = image.height / image.width
      texture.image = image
      loaded++
      if (loaded < 2) return
      onUpdate()
      onResize()
    }
    image.src = url

    const dMapImage = new Image()
    dMapImage.crossOrigin = 'Anonymous'
    dMapImage.onload = () => {
      dmap.image = dMapImage
      loaded++
      if (loaded < 2) return
      onUpdate()
      onResize()
    }
    dMapImage.src = './dmap.png'

    program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: {value: 0},
        uTexture: {value: texture},
        uDMap: {value: dmap},
        uMouse: {value: new Vec2()},
        uVelo: {value: 0},
        uResolution: {value: resolution},
        uStrength: {value: 0.01},
        uEdgesExagerationFactor: {value: 50}
      }
    })
    mesh = new Mesh(gl, {geometry, program})

    window.addEventListener('resize', onResize)
  }
  const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)

    resolution.x = gl.renderer.width
    resolution.y = gl.renderer.height

    const aspect = window.innerHeight / window.innerWidth

    if (aspect > ratio) {
      resolution.z = ratio / aspect
      resolution.w = 1
    } else {
      resolution.z = 1
      resolution.w = aspect / ratio
    }

    program.uniforms.uResolution.value = resolution
  }
  const onUpdate = (t) => {
    requestAnimationFrame(onUpdate)
    const p = cursor.getPosition('unit')
    target.lerp(p, 0.05)
    vTarget.lerp(cursor.velocity, 0.01)
    program.uniforms.uMouse.value.x = target.x
    program.uniforms.uMouse.value.y = target.y
    program.uniforms.uVelo.value = Math.min(vTarget.len() * 0.2, 0.1)

    program.uniforms.uTime.value += 0.001

    renderer.render({scene: mesh})
  }
  return {
    init,
    onUpdate
  }
}

export default webgl()