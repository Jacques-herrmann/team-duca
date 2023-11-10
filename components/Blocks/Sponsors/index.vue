<template>
  <div class="sponsors">
    <h2 class="sponsors__title">{{ block.primary.title }}</h2>
    <div class="sponsors__list">
      <div class="sponsors__item" v-for="item in block.items">
        <img :src="item.logo.url" :alt="item.logo.alt" />
      </div>
    </div>
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

  &__title
    @include h1()
    width: 100%
    text-align: center
    color: $white

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
</style>
