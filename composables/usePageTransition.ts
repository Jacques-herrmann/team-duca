const usePageTransition = () => {
  const store = useIndexStore()
  const scroll = computed(() => store.scroll)

  onBeforeRouteLeave((_to, _from, next) => {
    store.setTransition(true)
    setTimeout(() => {
      if (scroll.value) {
        scroll.value.smooth = false
        scroll.value.scrollTo(0)
        scroll.value.smooth = true
      }
      next()
    }, 1200)
  })

  onBeforeMount(() => {
    store.setTransition(false)
    document.documentElement.lang = 'fr'
  })

  return {}
}

export default usePageTransition