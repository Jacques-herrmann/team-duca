<template>
  <div class="boxing-bag" ref="root">
    <button class="boxing-bag__button" @click="toggleVisible"/>
    <div class="boxing-bag__content">
      <button class="boxing-bag__close-btn" @click="toggleVisible">X</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import gsap from "gsap";

const store = useIndexStore()
const isMobile = computed(() => store.isMobile)
const root = ref<HTMLElement | null>(null)
const visible = ref(false)
let tl = null

const onClose = () => {
  tl.reverse()
}

const onOpen = () => {
  tl.play()
}

const toggleVisible = () => {
  if (visible.value) {
    onClose()
  } else {
    onOpen()
  }
  visible.value = !visible.value
}

onMounted(() => {
  tl = gsap.timeline({paused: true})

  tl.to(root.value.querySelector('.boxing-bag__button'), {
    height: '200vw',
    width: '200vw',
    duration: 0.5,
    ease: 'power2.inOut'
  })
  tl.to(root.value.querySelector('.boxing-bag__button'), {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power2.inOut'
  }, 0.3)
  tl.to(root.value.querySelector('.boxing-bag__content'), {
    autoAlpha: 1,
    duration: 0.5,
    ease: 'power2.inOut'
  }, 0.2)
})


</script>

<style scoped lang="sass">

.boxing-bag
  position: fixed
  top: 0
  left: 0
  z-index: $z-boxing

  &__button
    position: absolute
    top: -50%
    left: -50%
    width: 200px
    height: 200px
    transform: translate(-60%, -60%) rotate(-45deg)
    background: $red
    border: none
    border-radius: 50%
    cursor: pointer
    z-index: 1
    transition: all 0.3s ease

    &:hover
      width: 300px
      transform: translate(-35%, -20%) rotate(-45deg)

  &__content
    background: $black
    position: absolute
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    opacity: 0
    overflow: hidden

  &__close-btn
    position: absolute
    top: 20px
    right: 20px
    background: transparent
    color: $white
    border: none
    padding: 10px 20px
    cursor: pointer
    z-index: 2
    transition: all 0.3s ease


</style>
