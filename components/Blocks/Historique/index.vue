<template>
  <div class="history">
    <figure-element class="history__cover" :image="block.primary.cover" />
    <div class="history__element" v-for="element in block.items">
      <figure-element :image="element.media" />
      <h3>{{element.title}}</h3>
      <p>{{element.content}}</p>
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
.history
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

  &__cover
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
</style>