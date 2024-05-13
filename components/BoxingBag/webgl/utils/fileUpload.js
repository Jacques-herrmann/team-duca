import {EventEmitter2} from 'eventemitter2'

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

export default class FileUpload extends EventEmitter2 {
    constructor() {
        super()
        this._id = uuidv4()
        this._input = document.createElement('input')
        this._input.type = 'file'
        this._input.hidden = true
        this._input.id = this.id
        this._input.addEventListener('change', this.handleFiles.bind(this))

        document.body.appendChild(this._input)
    }

    get id() {
        return this._id
    }

    openDialog() {
        this._input.click()
    }

    handleFiles() {
        let reader

        if (this._input.files && this._input.files[0]) {
            reader = new FileReader()

            reader.onload = (e) => {
                this.emit('loaded', e.target.result)
            }
            reader.readAsDataURL(this._input.files[0])
        }
    }

    dispose() {
        this._input.removeEventListener('change', this.handleFiles.bind(this))
        document.removeChild(this._input)
    }
}
