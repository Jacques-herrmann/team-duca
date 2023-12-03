<template>
  <div
   ref="root"
   class="history-element"
   :class="`${index % 2 === 0 ? 'history-element--reverse': ''} history-element--is-${orientation}`"
   :style="{
      height: media.dimensions.height + 'px'
   }"
  >
    <figure-element class="history-element__img" :image="media" />

    <Parallax :active="intersect.active.value" speed="3">
    <div class="history-element__content">
      <h3 class="history-element__title">{{title}}</h3>
      <prismic-rich-text class="history-element__text" :field="content" />
    </div>
    </Parallax>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  index: Number,
  media: any,
  title: String,
  orientation: String,
  content: any
}>()

const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  threshold: 0.2
})

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

.history-element
  position: relative
  width: 100%
  margin: 10rem 0

  &--reverse
    & .history-element__img
      @include grid(5, 11)

    & .history-element__content
      @include grid(0, 6)
      text-align: right

  &__img
    @include grid(1, 7)
    object-fit: cover
    object-position: center

  &--is-portrait
    & .history-element__img
      @include grid(2, 6)


  &__content
    @include grid(5, 11)
    top: 250px
    color: white
    padding: 0 0 0 5rem


  &__title
    @include h2()

  &__text
    @include text()


</style>