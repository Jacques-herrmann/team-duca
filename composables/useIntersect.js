import {ref, onMounted, onBeforeMount} from "vue";

const defaultOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0],
    onReveal: (entry) => {
    },
    onEnter: (entry) => {
    },
    onLeave: (entry) => {
    },
    onChange: (entry) => {
    }
}
const useIntersect = (target, options = {}) => {
    options = {...defaultOptions, ...options}
    const intersect = ref(null)
    const revealed = ref(false)

    const observer = ref(null);

    const initObserver = () => {
        if (observer.value) return;
        observer.value = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                intersect.value = true
                options.onEnter(entries[0])
                if (!revealed.value) {
                    revealed.value = true
                    options.onReveal(entries[0])
                }
            } else {
                intersect.value = false
                options.onLeave(entries[0])
            }
            options.onChange(entries[0])
        }, options)

        if (target.value.$el) {
            observer.value.observe(target.value.$el) // case vue component
        } else {
            observer.value.observe(target.value)
        }
    }

    const destroyObserver = () => {
        if (observer.value) {
            observer.value.disconnect()
            observer.value = null
        }
    }

    onMounted(() => {
        initObserver()
    })

    onBeforeMount(() => {
        destroyObserver()
    })

    return {
        intersect,
        revealed,
        initObserver,
    }
}

export default useIntersect