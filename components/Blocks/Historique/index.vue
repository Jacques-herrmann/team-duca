<template>
  <div class="history" ref="root">
    <div class="history__cover">
      <parallax :active="intersect.active.value" :speed="3" :speed-mobile="1.2" :is-absolute="true">
        <figure-element class="history__cover-image" :image="block.primary.cover"/>
      </parallax>
    </div>
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
import {defineProps} from 'vue'

const props = defineProps<{
  block: any
}>()
const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  rootMargin: '200px 0px -10px 0px',
  onReveal: () => {
    draw()
  },
})

const draw = () => {
  console.log('draw')
  // gsap.from(root.value?.querySelectorAll('.history__cover-image') as NodeListOf<HTMLElement>, A.image)
}

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
  padding-bottom: 10rem

  &__cover
    position: relative
    overflow: hidden
    width: 100vw
    height: calc(9 / 16 * 100vw)

    &-image
      width: 110%
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      object-fit: cover
      object-position: center

</style>