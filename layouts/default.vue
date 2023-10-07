<template>
  <div id="app-layout">
    <Header />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue"
import Lenis from "@/utils/lenis/lenis"

const scroll: Ref<Lenis | null> = ref(null)

const onUpdate = () => {
  requestAnimationFrame(onUpdate)

  scroll.value?.raf()
}

onMounted(() => {
  scroll.value = new Lenis()
  console.log('layout/default.vue')
  onUpdate()
})
</script>