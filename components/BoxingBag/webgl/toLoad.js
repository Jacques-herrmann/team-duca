import Loader from "./utils/loader.js";

const P = '/'
export default [
  {
    name: 'noise',
    type: Loader.TYPES.TEXTURE,
    path: P + 'textures/noise.png'
  },
  {
    name: 'environment',
    type: Loader.TYPES.GLTF,
    path: P + 'models/environment.glb'
  },
  {
    name: 'punchingBag',
    type: Loader.TYPES.GLTF,
    path: P + 'models/punching-bag.glb'
  },
  {
    name: 'glove',
    type: Loader.TYPES.GLTF,
    path: P + 'models/glove.glb'
  },
]