import {EventEmitter2} from 'eventemitter2'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {LoadingManager, TextureLoader} from "three";
import {RGBELoader} from "three/addons";


const items = []

let i = 0
const TYPES = {
  GLTF: i++,
  FBX: i++,
  TEXTURE: i++,
  HDR: i++
}

const preventDefaults = (ev) => {
  ev.preventDefault()
  ev.stopPropagation()
}

export default class Loader extends EventEmitter2 {
  constructor() {
    super()

    this.content = []
    this.toLoad = 0
    this.loaded = 0

    this.initManager()
    this.initLoaders()
  }

  static get items() {
    return items
  }

  static get TYPES() {
    return TYPES
  }

  initManager() {
    this.manager = new LoadingManager(
      // () => {
      //     console.log('Loading complete!')
      // },
      // (url, itemsLoaded, itemsTotal) => {
      //     console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
      // },
      // (url) => {
      //     console.log('There was an error loading ' + url)
      // },
    )
  }

  initLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader(this.manager)
    this.loaders.dracoLoader = new DRACOLoader(this.manager)
    this.loaders.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    this.loaders.dracoLoader.preload()
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    this.loaders.fbxLoader = new FBXLoader(this.manager)
    this.loaders.textureLoader = new TextureLoader(this.manager)
    this.loaders.hdrLoader = new RGBELoader(this.manager)
  }

  initDropHandler(dropArea) {
    this.dropArea = dropArea

    const events = ['dragenter', 'dragover', 'dragleave', 'drop']
    events.forEach(ev => {
      this.dropArea.addEventListener(ev, preventDefaults, false)
    })

    this.dropArea.addEventListener('drop', (ev) => {
      this.handleDrop(ev)
    }, false)
  }


  handleDrop(ev) {
    const dataTransfer = ev.dataTransfer
    const file = dataTransfer.files[0]
    const t = file.type.split('/').pop().toLowerCase()
    if (!['jpeg', 'jpg', 'png', 'bmp', 'gif'].includes(t)) {
      alert('Please select a valid image file')
      return false
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const src = fileReader.result
      this.items.painting.dispose()
      this.loaders.textureLoader.load(src, (texture) => {
        this.items.painting = texture
        this.emit('image-dropped')
      })
    }
    fileReader.readAsDataURL(file)
  }

  load(content) {
    this.content = content
    this.toLoad = this.content.length
    for (const item of content) {
      this.loadOne(item)
    }
  }

  loadOne(item) {
    // console.log('Loading', item)
    if (items[item.name]) {
      return this.itemLoaded(item, items[item.name])
    }
    switch (item.type) {
      case Loader.TYPES.GLTF:
        this.loaders.gltfLoader.load(
          item.path,
          (file) => {
            return this.itemLoaded(item, file)
          }
        )
        break
      case Loader.TYPES.FBX:
        this.loaders.fbxLoader.load(
          item.path,
          (file) => {
            return this.itemLoaded(item, file)
          }
        )
        break
      case Loader.TYPES.TEXTURE:
        this.loaders.textureLoader.load(
          item.path,
          (file) => {
            file.ratio = file.image.height / file.image.width
            return this.itemLoaded(item, file)
          }
        )
        break
      case Loader.TYPES.HDR:
        this.loaders.hdrLoader.load(
          item.path,
          (file) => {
            return this.itemLoaded(item, file)
          }
        )
        break
    }
  }

  itemLoaded(source, file) {
    items[source.name] = file

    this.loaded++

    this.emit('loaded', this.loaded / this.toLoad)

    if (this.loaded === this.toLoad) {
      this.emit('ready')
    }
    console.log(file)
    return file
  }

}
