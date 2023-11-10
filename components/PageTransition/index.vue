<template>
  <div class="transition" ref="root">
    <div class="column" v-for="c in 8" :key="c" />
    <Logo class="logo"/>
  </div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
const emit = defineEmits(['end'])

const props = defineProps({})
const root = ref<HTMLElement | null>(null)

const onClose = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      emit('end')
    }
  })
  tl.set(root.value, { background: 'transparent' })
  tl.to(root.value?.querySelector('.logo') as HTMLElement, {opacity: 0, duration: 0.4, ease: 'linear'},0)
  tl.to(root.value?.querySelectorAll('.column') as NodeList, {height: '0', duration: 0.3, ease: 'power2.inOut', stagger: 0.06}, 0)
}

const onEnter = () => {
  const tl = gsap.timeline({onComplete: () => {gsap.set(root.value, { background: 'transparent' })}})

  tl.set(root.value, { background: '#171717' })
  tl.set(root.value?.querySelectorAll('.column') as NodeList, { height: '0' })

  tl.to(root.value?.querySelector('.logo') as HTMLElement, { opacity: 1, duration: 1, ease: 'linear' }, 0)
  tl.to(root.value?.querySelectorAll('.column') as NodeList, { height: '100%', duration: 0.6, ease: 'power2.inOut', stagger: 0.1 }, 0)


}

onMounted(() => {
  onEnter()
  setTimeout(() => {
    onClose()
  }, 3000)
})

</script>

<style scoped lang="sass">

.transition
  position: absolute
  top: 0
  left: 0
  z-index: $z-transition
  height: 100%
  width: 100%
  background: $black
  display: flex
  align-items: flex-start
  justify-content: space-between
  overflow: hidden

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
