<template>
  <div id="app-layout">
    <PageTransition />
    <Cursor />
    <Header />
    <main>
      <GridBackground />
      <slot />
    </main>
    <Footer v-if="!isGalleryPage"/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import PageTransition from "@/components/PageTransition/index.vue"
import Lenis from "@/utils/lenis/lenis"
import gsap from "gsap"
import {useIndexStore} from "~/stores";
import {body} from "slice-machine-ui/src/components/Table/Table.css";

const store = useIndexStore()
const scroll: Ref<Lenis | null> = ref(null)
const route = useRoute()
const isGalleryPage = computed(() => route.name === 'locale-galerie')

const noiseOpacity = ref(0)

const onUpdate = () => {
  requestAnimationFrame(onUpdate)
  scroll.value?.raf()
}

const onResize = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  store.setIsMobile(window.innerWidth < 1024)
}

onMounted(() => {
  gsap.to(noiseOpacity, { value: 0.04, duration: 1, ease: 'linear'})
  scroll.value = new Lenis()
  store.setScroll(scroll.value)
  store.setTransition(true)
  setTimeout(() => {
    store.setTransition(false)
  }, 3000)
  onResize()
  onUpdate()

  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  scroll.value?.destroy()
  window.removeEventListener('resize', onResize)
})

</script>
<style lang="sass" scoped>

main
  position: relative
  width: 100%
  min-height: 100vh
  z-index: $z-content

#app-layout::after
  animation: grain 6s steps(10) infinite
  background-image: url('./assets/images/grain.png')
  background-repeat: repeat
  content: ''
  position: fixed
  top: -100%
  left: -100%
  height: 300%
  width: 300%
  opacity: v-bind(noiseOpacity)
  pointer-events: none
  transition: opacity 0.4s ease
  will-change: transform
  z-index: $z-noise

  @keyframes grain
    0%
      transform: translate(20%, -15%)
    10%
      transform: translate(-20%, -15%)
    20%
      transform: translate(20%, -5%)
    30%
      transform: translate(-20%, -5%)
    40%
      transform: translate(20%, 5%)
    50%
      transform: translate(-20%, 5%)
    60%
      transform: translate(20%, 15%)
    70%
      transform: translate(-20%, 15%)
    80%
      transform: translate(20%, 5%)
    90%
      transform: translate(-20%, 5%)
    100%
      transform: translate(20%, -5%)

</style>
