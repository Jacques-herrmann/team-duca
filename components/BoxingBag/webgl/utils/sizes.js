import {EventEmitter2} from 'eventemitter2'

export default class Sizes extends EventEmitter2 {
    constructor() {
        super()
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ratio = this.width / this.height

    }

    resize() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ratio = this.width / this.height
    }
}
