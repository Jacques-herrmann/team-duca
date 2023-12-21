
const useCursor = () => {
    const store = useIndexStore()
    onBeforeRouteLeave((to, from, next) => {
        store.setTransition(true)
        setTimeout(() => {
            next()
        }, 1200)
    })
    onMounted(() => {
        store.setTransition(false)
    })
    return {
    }
}

export default useCursor