<template>
  <div class="b-keyfacts">
    <BlocksKeyFactsElement :number="block.primary.number_1" :text="block.primary.text_1" />
    <BlocksKeyFactsElement :number="block.primary.number_2" :text="block.primary.text_2" />
    <BlocksKeyFactsElement :number="block.primary.number_3" :text="block.primary.text_3" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()


</script>
<style scoped lang="sass">
.b-keyfacts
  position: relative
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-bottom: 80px

  & div
    width: calc((100% - 180px) / 3)
</style>