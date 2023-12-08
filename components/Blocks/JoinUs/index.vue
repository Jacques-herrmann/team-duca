<template>
  <div class="join-us">
    <figure-element class="join-us__image" :image="block.primary.cover" caption="" />
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
  display: flex
  flex-direction: column
  align-items: center

  &__title
    @include h1()
    font-weight: 900
    letter-spacing: 0.1rem
    margin-top: 10rem
    width: 100%
    max-width: 700px
    text-align: center
    color: $white

  &__cta
    position: relative
    margin: 8rem 0

</style>
