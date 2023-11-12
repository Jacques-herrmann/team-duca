import {reactive, ref} from "vue";

const useCursor = () => {
    let _container

    const x = ref(0)
    const y = ref(0)
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
    }

    const update = (ev) => {
        bounds.value = _container.value.getBoundingClientRect()
        x.value = ev.clientX - bounds.value.left - _container.value.scrollLeft
        y.value = ev.clientY - bounds.value.top - _container.value.scrollTop
    }

    const resize = () => {
        bounds.value = _container.value.getBoundingClientRect()
    }

    const dispose = () => {
        _container.value.removeEventListener('mousemove', update)
    }

    return {
        x,
        y,
        bounds,
        init,
        dispose,
        resize
    }
}

export default useCursor