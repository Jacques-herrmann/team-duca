<template>
  <div class="transition" ref="root">
    <div class="column" v-for="c in columns" :key="c" />
    <Logo class="logo" />
  </div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
const emit = defineEmits(['end'])

const props = defineProps({})
const store = useIndexStore()
const isMobile = computed(() => store.isMobile)
const root = ref<HTMLElement | null>(null)

const columns = computed(() => {
  return isMobile.value ? 6 : 8
})

const onClose = (cb=() => {}) => {
  const tl = gsap.timeline({delay: 0.2,
    onComplete: () => {
      emit('end')
      gsap.set(root.value, { background: 'transparent', autoAlpha: 0 })
      cb()
    }
  })
  tl.set(root.value, { background: 'transparent'})
  tl.to(root.value?.querySelector('.logo') as HTMLElement, {opacity: 0, duration: 0.4, ease: 'linear'},0)
  tl.to(root.value?.querySelectorAll('.column') as NodeList, {height: '0', duration: 0.3, ease: 'power2.inOut', stagger: 0.06}, 0)
}

const onEnter = (cb=() => {}) => {
  const tl = gsap.timeline({onComplete: () => {
    gsap.set(root.value, { background: 'transparent' })
    cb()
  }})

  tl.set(root.value?.querySelectorAll('.column') as NodeList, { height: '0' })
  tl.set(root.value, { autoAlpha: 1 })

  tl.to(root.value?.querySelector('.logo') as HTMLElement, { opacity: 1, duration: 0.4, ease: 'linear' }, 0.6)
  tl.to(root.value?.querySelectorAll('.column') as NodeList, { height: '100%', duration: 0.6, ease: 'power2.inOut', stagger: 0.1 }, 0)

}

watch(() => store.isTransitionVisible, (value) => {
  if(value) {
    onEnter()
  } else {
    onClose()
  }
})


</script>

<style scoped lang="sass">

.transition
  position: fixed
  top: 0
  left: 0
  z-index: $z-transition
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  width: 100vw
  background: $black
  display: flex
  align-items: flex-start
  justify-content: space-between
  overflow: hidden
  pointer-events: none

  & > .column
    position: relative
    flex-grow: 1
    height: 0
    background-color: $black
    border-right: 1px solid rgba(255, 255, 255, 0.08)

    &:first-child, &:nth-child(8)
      max-width: $grid-margin


.logo
  position: absolute
  top: 50%
  left: 50%
  opacity: 0
  transform: translate(-50%, -50%)
  width: 200px
  height: 200px
</style>
