import { EventEmitter2 } from 'eventemitter2'
import { Howl, Howler } from 'howler'
// import { isMobile } from '@/webgl/utils/utils'

export default class SoundManager extends EventEmitter2 {
  constructor () {
    super()
    if (SoundManager._instance) {
      return SoundManager._instance
    }
    SoundManager._instance = this
    this.sounds = {}
    this.volume = 1
    this.mute = false
  }

  init () {
    // return;
    /* this.createSound('jardin1', 'jardin1.mp3', 0.2, true)

    this.createSound('jardin2', 'jardin2.mp3', 0.2, true)
    this.createSound('jardin3', 'jardin3.mp3', 0.1, true)

    this.createSound('transition', 'transition.mp3', 0.2)
    this.createSound('engagement', 'clic_feuille.mp3', 0.7)
    this.createSound('clic', 'clic.mp3', 0.2) */
  }

  createSound (id, path, volume = 1, loop = false) {
    // if (isMobile()) { return }
    if (this.sounds[id]) {
      return this.sounds[id]
    }

    this.sounds[id] = {
      audio: new Howl({
        src: [path],
        loop,
        volume
      }),
      volume
    }
    return this.sounds[id]
  }

  playSound (id, fade = false, cb = () => {
  }) {
    // if (isMobile()) { return }
    if (!this.sounds[id]) {
      return
    }

    if (this.sounds[id].timer) {
      clearTimeout(this.sounds[id].timer)
    }

    this.sounds[id].audio.once('end', () => {
      cb()
    })

    this.sounds[id].audio.play()
    let delay = 2000
    if (!fade) {
      delay = 0
    }
    this.sounds[id].audio.fade(0, this.sounds[id].volume, delay)
  }

  stopSound (id) {
    // if (isMobile()) { return }
    if (!this.sounds[id]) {
      return
    }

    const d = 2
    this.sounds[id].audio.fade(this.sounds[id].volume, 0, d * 1000)
    this.sounds[id].timer = setTimeout(() => {
      this.sounds[id].audio.stop()
    }, d * 1000)
  }

  getSound (id) {
    return this.sounds[id]
  }

  setVolume (v) {
    Howler.volume(v)
  }

  toggleMute () {
    this.mute = !this.mute
    Howler.mute(this.mute)
  }

  isMute () {
    return this.mute === true
  }
}
