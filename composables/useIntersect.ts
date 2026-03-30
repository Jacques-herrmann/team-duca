import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface UseIntersectOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  onReveal?: (entry: IntersectionObserverEntry) => void
  onEnter?: (entry: IntersectionObserverEntry) => void
  onLeave?: (entry: IntersectionObserverEntry) => void
  onChange?: (entry: IntersectionObserverEntry) => void
}

const defaultOptions: Required<UseIntersectOptions> = {
  root: null,
  rootMargin: '100px 0px -100px 0px',
  threshold: [0],
  onReveal: () => {},
  onEnter: () => {},
  onLeave: () => {},
  onChange: () => {},
}

const useIntersect = (target: Ref<HTMLElement | null>, options: UseIntersectOptions = {}) => {
  const merged = { ...defaultOptions, ...options }
  const active = ref(false)
  const revealed = ref(false)
  const observer = ref<IntersectionObserver | null>(null)

  const initObserver = () => {
    if (observer.value) return

    observer.value = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        active.value = true
        merged.onEnter(entry)
        if (!revealed.value) {
          revealed.value = true
          merged.onReveal(entry)
        }
      } else {
        active.value = false
        merged.onLeave(entry)
      }
      merged.onChange(entry)
    }, {
      root: merged.root,
      rootMargin: merged.rootMargin,
      threshold: merged.threshold,
    })

    const el = target.value
    if (!el) return

    // Handle both raw DOM elements and Vue component refs (.value.$el)
    const domEl = (el as any).$el ?? el
    observer.value.observe(domEl)
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

  onUnmounted(() => {
    destroyObserver()
  })

  return {
    active,
    revealed,
    initObserver,
  }
}

export default useIntersect
