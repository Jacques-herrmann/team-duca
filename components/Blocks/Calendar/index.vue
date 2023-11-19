<template>
  <div class="planning">
    <h2>PLANNING</h2>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()

</script>
<style scoped lang="sass">
.planning
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

  & h2
    @include h1()
    color: white
    text-align: center
    margin-top: 200px


</style>