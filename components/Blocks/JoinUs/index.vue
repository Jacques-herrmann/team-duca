<template>
  <div class="join-us">
    <h2 class="join-us__title">{{ block.primary.title }}</h2>
    <CTA class="join-us__cta" :url="block.primary.cta_link" :text="block.primary.cta_text" :is-nuxt-link="true"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()


</script>
<style scoped lang="sass">
.join-us
  position: relative
  width: 100%
  padding: 10rem 0

  &__title
    @include h1()
    width: 100%
    text-align: center
    color: $white
    margin-bottom: 10rem

  &__cta
    position: relative
    left: 50%
    transform: translateX(-50%)
    margin: 8rem 0

</style>
