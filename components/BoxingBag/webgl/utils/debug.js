import {Pane} from 'tweakpane'
import Stats from 'stats.js'
import {EventEmitter2} from 'eventemitter2'
import config from "../config";

const getQueryVariable = (variable) => {
  const urlParams = new URLSearchParams(window.location.search)
  variable = variable.replace(/[[\]]/g, '\\$&')
  return urlParams.get(variable)
}

let _instance
export default class Debug extends EventEmitter2 {

  constructor() {
    super()
    if (_instance) {
      return _instance
    }
    _instance = this

    this._active = config.debug || getQueryVariable('debug') === 'true'
    console.log('Debug mode:', this._active)
    this._state = {}
    Object.assign(this._state, config)

    if (this._active) {
      this._ui = new Pane()
      this.tabs = this._ui.addTab({
        pages: [
          {title: 'Debug Panel'}
        ]
      })
      this.stats = new Stats()

      // Add CSS to debug UI
      const panel = document.querySelector('.tp-dfwv')
      panel.style.width = '370px'
      panel.style.position = 'fixed'
      panel.style.zIndex = '9999'

      document.body.appendChild(this.stats.dom)
    }
  }

  get active() {
    return this._active
  }

  addFolder(tab, name, expanded = true) {
    return this.tabs.pages[tab].addFolder({
      title: name,
      expanded
    })
  }

  debugPerf(renderer) {
    const rendererFolder = this.addFolder(0, 'Renderer')

    rendererFolder.addBinding(renderer.info.render, 'calls', { readonly: true })
    rendererFolder.addBinding(renderer.info.memory, 'geometries', { readonly: true })
    rendererFolder.addBinding(renderer.info.memory, 'textures', { readonly: true })
    rendererFolder.addBinding(renderer.info.programs, 'length', {label: 'programs', readonly: true})
    rendererFolder.addBinding(renderer.info.render, 'triangles', { readonly: true })
  }

  debugPhysics(physics, volumeSoftBody) {
    console.log('Debug physics')
    const physicsFolder = this.addFolder(0, 'Punching Bag Physics')

    physicsFolder.addBinding(physics.bag, 'pressure', {min: 1, max: 1000, step: 1})
    physicsFolder.addBinding(physics.bag, 'viterations', {min: 1, max: 100, step: 1})
    physicsFolder.addBinding(physics.bag, 'piterations', {min: 1, max: 100, step: 1})
    // physicsFolder.addInput(physics.bag, 'collisions', {min: 0, max: 0x11, step: 1})
    physicsFolder.addBinding(physics.bag, 'kDF', {min: 0, max: 1, step: 0.01})
    physicsFolder.addBinding(physics.bag, 'kDP', {min: 0, max: 1, step: 0.01})
    physicsFolder.addBinding(physics.bag, 'kPR', {min: 0, max: 500, step: 1})
    physicsFolder.addBinding(physics.bag, 'stiffness', {min: 0, max: 1, step: 0.01})
    physicsFolder.addBinding(physics.bag, 'volumeMass', {min: 1, max: 100, step: 1})

    physicsFolder.on('change', (e) => {
      const sbConfig = volumeSoftBody.get_m_cfg();
      sbConfig.set_viterations(physics.bag.viterations);
      sbConfig.set_piterations(physics.bag.piterations);
      sbConfig.set_collisions(physics.bag.collisions);
      sbConfig.set_kDF(physics.bag.kDF)
      sbConfig.set_kDP(physics.bag.kDP);
      sbConfig.set_kPR(physics.bag.pressure);
      volumeSoftBody.get_m_materials().at(0).set_m_kLST(physics.bag.stiffness);
      volumeSoftBody.get_m_materials().at(0).set_m_kAST(physics.bag.stiffness);

      volumeSoftBody.setTotalMass(physics.bag.volumeMass, false);
    })
  }
}


