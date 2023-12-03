import {EventEmitter2} from "eventemitter2";
import {Mesh, Program, Renderer, Texture, Triangle, Vec4} from "ogl";
import vertex from "@/assets/shaders/vertex.glsl?raw";
import fragment from "@/assets/shaders/fragment.glsl?raw";
import gsap from "gsap";


export default class Slider extends EventEmitter2{
  constructor(root, data) {
    super();
    this.isRunning = false

    this.data = data.map(d => d.media.url)
    this.textures = []
    this.root = root

    this.renderer = new Renderer({
      width: this.root.offsetWidth,
      height: this.root.offsetHeight,
      dpr: 2
    });
    this.gl = this.renderer.gl;
    this.root.appendChild(this.gl.canvas);

    this.loadImages(this.init.bind(this))

  }

  init() {
    this.isRunning = true
    this.current = 0;

    this.aspect = 1;
    this.resolution = new Vec4();
    this.geometry = new Triangle(this.gl);
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        time: {value: 0},
        progress: {value: 0},
        intensity: {value: 8},
        texture1: {value: this.textures[0]},
        texture2: {value: this.textures[1]},
        resolution: {value: this.resolution},
      },
    });

    this.mesh = new Mesh(this.gl, {geometry: this.geometry, program: this.program});

    window.addEventListener('resize', this.onResize.bind(this), false);
    // window.addEventListener('click', this.onClick.bind(this), false);
    requestAnimationFrame(this.onUpdate.bind(this));
    this.onResize();
  }

  loadImages(cb) {
    Promise.all(this.data.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const texture = new Texture(this.gl);
          texture.image = img;
          this.textures.push(texture);
          resolve();
        }
        img.src = image;
      })
    })).then(() => {
      cb()
    })
  }

  onClick() {
    this.onNext()
  }

  onNext() {
    const next = (this.current + 1) % this.textures.length;
    this.onChange(next)
  }
  onPrevious() {
    const previous = (this.current - 1) % this.textures.length;
    this.onChange(previous)
  }

  onChange(index) {
    this.program.uniforms.texture2.value = this.textures[index];

    gsap.to(this.program.uniforms.progress, {
      value: 1,
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => {
        this.program.uniforms.progress.value = 0;
        this.program.uniforms.texture1.value = this.textures[index];
        this.current = index;
      }
    })

    this.emit('change', index)
  }

  onResize() {
    this.renderer.setSize(this.root.offsetWidth, this.root.offsetHeight);
    this.aspect = this.root.offsetHeight / this.root.offsetWidth

    const imageRatio = this.textures[0].image.height / this.textures[0].image.width;
    this.resolution.x = this.gl.renderer.width;
    this.resolution.y = this.gl.renderer.height;

    if (this.aspect > imageRatio) {
      this.resolution.z = (1 / this.aspect) * imageRatio;
      this.resolution.w = 1;
    } else {
      this.resolution.z = 1;
      this.resolution.w = this.aspect / imageRatio;
    }

    this.program.uniforms.resolution.value = this.resolution;
  }

  onUpdate() {
    requestAnimationFrame(this.onUpdate.bind(this));
    if(!this.isRunning) return
    this.program.uniforms.time.value += 0.001;
    this.renderer.render({scene: this.mesh});
  }
}