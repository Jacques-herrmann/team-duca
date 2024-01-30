const useCursor = () => {
  const store = useIndexStore()
  const scroll = computed(() => store.scroll)

  onBeforeRouteLeave((to, from, next) => {

    console.log('leave')
    store.setTransition(true)
    setTimeout(() => {
      scroll.value.smooth = false
      scroll.value && scroll.value.scrollTo(0)
      scroll.value.smooth = true
      next()
    }, 1200)
  })

  onBeforeMount(() => {
    console.log('mounted')
    store.setTransition(false)
  })

  return {}
}

export default useCursor