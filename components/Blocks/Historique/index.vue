<template>
  <div class="history">
    <figure-element class="history__cover" :image="block.primary.cover" />
    <BlocksHistoriqueElement
     class="history__element"
     v-for="(element, e) in block.items"
     :key="e"
     :index="e + 1"
     :media="element.media"
     :title="element.title"
     :content="element.content"
      :orientation="element.orientation"
    />

  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()

</script>
<style scoped lang="sass">

$columns: 12
$gap: 1rem
$margin: 90px

@mixin grid($start, $end)
  position: absolute
  left: calc($margin + (100% - $margin * 2) / $columns * ($start))
  width: calc((100% - $margin * 2) / $columns * ($end - $start))

@mixin ratio($ratio)
  padding-top: calc(100% / $ratio)

.history
  position: relative
  width: 100%

  &__cover
    object-fit: cover
    object-position: center

</style>