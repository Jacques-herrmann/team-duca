const useCursor = () => {
  const store = useIndexStore()
  const scroll = computed(() => store.scroll)
  const route = useRoute()

  onBeforeRouteLeave((to, from, next) => {
    store.setTransition(true)
    setTimeout(() => {
      scroll.value.smooth = false
      scroll.value && scroll.value.scrollTo(0)
      scroll.value.smooth = true
      next()
    }, 1200)
  })


  onBeforeMount(() => {
    store.setTransition(false)
    document.documentElement.lang = 'fr' //route.params.locale
  })

  return {}
}

export default useCursor