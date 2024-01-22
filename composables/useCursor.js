import {reactive, ref} from "vue";
import {Vec2} from "ogl";

const MODE = {
    ABSOLUTE: 'absolute',
    UNIT: 'unit',
    CENTER_ABSOLUTE: 'centerAbsolute',
    CENTER_UNIT: 'centerUnit',
}

const useCursor = () => {
    let _container, _lastTime

    const lastPosition = new Vec2(0, 0)
    const position = new Vec2(0, 0)
    const velocity = new Vec2(0, 0)

    const bounds = ref({
        top: 0,
        left: 0,
        height: 0,
        width: 0
    })

    const init = (container) => {
        bounds.value = container.value.getBoundingClientRect()
        _container = container

        _container.value.addEventListener('mousemove', update)
        loop()
    }

    const getPosition = (mode) => {
        if(mode === MODE.ABSOLUTE) {
            return position
        } else if(mode === MODE.UNIT) {
            return new Vec2(
                position.x / bounds.value.width,
                position.y / bounds.value.height
            )
        } else if(mode === MODE.CENTER_ABSOLUTE) {
            return new Vec2(
                position.x - bounds.value.width / 2,
                position.y - bounds.value.height / 2
            )
        } else if(mode === MODE.CENTER_UNIT) {
            return new Vec2(
                (position.x - bounds.value.width / 2) / bounds.value.width,
                (position.y - bounds.value.height / 2) / bounds.value.height
            )
        }
    }

    const update = (ev) => {
        bounds.value = _container.value.getBoundingClientRect()

        position.set(
            ev.clientX - bounds.value.left,
            ev.clientY - bounds.value.top
        )

        if(!_lastTime) {
            _lastTime = performance.now()
            lastPosition.copy(position)
        }

        const delta = new Vec2().copy(position).sub(lastPosition)
        lastPosition.copy(position)

        let time = performance.now()
        const deltaT = Math.max(14, time - _lastTime)
        _lastTime = time

        velocity.set(delta.x / deltaT, delta.y / deltaT)
        velocity.needsUpdate = true

    }

    const loop = () => {
        requestAnimationFrame(loop)
        if(!velocity.needsUpdate) {
            // position.set(-1)
            velocity.set(0)
        }
        velocity.needsUpdate = false
    }

    const resize = () => {
        bounds.value = _container.value.getBoundingClientRect()
    }

    const dispose = () => {
        _container.value.removeEventListener('mousemove', update)
    }

    return {
        MODE,
        bounds,
        getPosition,
        velocity,
        init,
        dispose,
        resize
    }
}

export default useCursor