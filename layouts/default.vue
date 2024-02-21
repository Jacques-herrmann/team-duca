<template>
  <div class="app-layout">
    <PageTransition/>
    <Cursor/>
    <Header/>
    <main>
      <GridBackground/>
      <NuxtPage/>
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import PageTransition from "@/components/PageTransition/index.vue"
import gsap from "gsap"
import {useIndexStore} from "~/stores";

const store = useIndexStore()
const route = useRoute()

const noiseOpacity = ref(0)

onMounted(() => {
  gsap.to(noiseOpacity, {value: 0.04, duration: 1, ease: 'linear'})

  store.setTransition(true)
  setTimeout(() => {
    store.setLocalTransition(true)
    store.setTransition(false)
  }, 3000)

})


</script>
<style lang="sass" scoped>

main
  position: relative
  width: 100%
  min-height: 100vh
//z-index: $z-content

.app-layout::after
  animation: grain 6s steps(10) infinite
  background-image: url('/assets/images/grain.png')
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
