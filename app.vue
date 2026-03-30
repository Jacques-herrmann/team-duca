<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const store = useAppStore()

onMounted(() => {
  const checkMobile = () => store.setIsMobile(window.innerWidth < 1024)
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>
