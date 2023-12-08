<template>
  <div class="sponsors">
    <h2 class="sponsors__title">{{ block.primary.title }}</h2>
    <div class="sponsors__list">
      <div class="sponsors__item" v-for="item in block.items">
        <img :src="item.logo.url" :alt="item.logo.alt" />
      </div>
    </div>
    <CTA class="sponsors__cta" :url="block.primary.cta_link" :text="block.primary.cta_text" :is-nuxt-link="true"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()


</script>
<style scoped lang="sass">
.sponsors
  position: relative
  width: 100%
  padding-top: 10rem

  &__title
    @include h1()
    font-weight: 900
    letter-spacing: 0.1rem
    width: 100%
    text-align: center
    color: $white
    margin-bottom: 10rem

  &__list
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    gap: 40px

  &__item
    height: 60px
    max-width: 200px
    margin: 0 1rem

    img
      height: 100%
      object-fit: contain
      object-position: center

  &__cta
    position: relative
    left: 50%
    transform: translateX(-50%)
    margin: 8rem 0

</style>
