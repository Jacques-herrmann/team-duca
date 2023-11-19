<template>
  <div class="slider">
    <figure-element class="slider__image" v-for="element in block.items" :image="element.media" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()

</script>
<style scoped lang="sass">
.slider
  position: relative
  width: 100%
  height: 100vh

  &__image
    position: absolute
    width: 100%
    height: 100%


</style>