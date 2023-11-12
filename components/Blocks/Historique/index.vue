<template>
  <div class="history">
    {{  block  }}
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
</style>