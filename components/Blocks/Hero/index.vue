<template>
  <div class="b-hero">
    <img class="b-hero__background" :src="block.primary.hero.url" :alt="block.primary.hero.alt">
    <CTA class="b-hero__cta" :text="block.primary.cta_text" :url="block.primary.cta_url" :is-nuxt-link="true"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()

</script>
<style scoped lang="sass">
.b-hero
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  overflow: hidden
  &__background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
    z-index: -1

  &__cta
    position: absolute
    bottom: 200px
    left: 50%
    transform: translateX(-50%)
    z-index: 1
</style>