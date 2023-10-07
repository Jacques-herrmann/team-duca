<template>
  <div id="app-layout">
    <Header />
    <main>
      <slot />
    </main>
    <Footer v-if="!isGalleryPage"/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue"
import Footer from "@/components/Footer/index.vue"
import Lenis from "@/utils/lenis/lenis"

const scroll: Ref<Lenis | null> = ref(null)
const route = useRoute()
const isGalleryPage = computed(() => route.name === 'locale-galerie')

const onUpdate = () => {
  requestAnimationFrame(onUpdate)

  scroll.value?.raf()
}

onMounted(() => {
  scroll.value = new Lenis()
  onUpdate()
})
onUnmounted(() => {
  scroll.value?.destroy()
})
</script>
<style lang="sass" scoped>
main
  margin-top: $header-height

</style>
