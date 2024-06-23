<template>
  <div class="boxing-bag" ref="root">
    <button class="boxing-bag__button" @click="toggleVisible"/>
    <div class="boxing-bag__content">
      <button class="boxing-bag__close-btn" @click="toggleVisible">X</button>
      <canvas ref="webgl"/>
    </div>
  </div>
</template>
<script setup>
import gsap from "gsap";
import Loader from "~/components/BoxingBag/webgl/utils/loader.js";
import toLoad from "~/components/BoxingBag/webgl/toLoad.js";
import Engine from "~/components/BoxingBag/webgl/engine.js";
import Debug from "~/components/BoxingBag/webgl/utils/debug.js";

const store = useIndexStore()
const isMobile = computed(() => store.isMobile)

const root = ref(null)
const webgl = ref(null)
const visible = ref(false)
let tl, loader, engine, debug

const onClose = () => {
  tl.reverse()
  engine?.pause()
}

const onOpen = () => {
  tl.play()
  engine?.play()
}

const toggleVisible = () => {
  if (visible.value) {
    onClose()
  } else {
    onOpen()
  }
  visible.value = !visible.value
}

const onReady = () => {
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

  engine = new Engine(webgl.value)
  onOpen()
}


onMounted(() => {
  if (process.client) {
    debug = new Debug()
    loader = new Loader()
    loader.on('ready', () => {
      onReady()
    })
    loader.load(toLoad)
  }
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

  & canvas
    width: 100%
    height: 100%

</style>
