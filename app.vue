<template>
  <NuxtLayout>
    <NuxtPage/>
    <GridBackground/>
  </NuxtLayout>
</template>

<script setup>
import {useAppStore} from '~/stores/app'

const store = useAppStore()

onMounted(() => {
  const checkMobile = () => store.setIsMobile(window.innerWidth < 1024)
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>
