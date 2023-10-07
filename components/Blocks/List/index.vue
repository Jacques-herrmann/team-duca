<template>
  <div class="block" v-for="b in blocks">
    <component :is="components[b.slice_type]" :block="b"></component>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  blocks: any[]
}>()

const components = {
  'hero': resolveComponent('BlocksHero')
}
</script>

<style scoped lang="sass">
.block
  position: relative
  padding: 40px 0
</style>