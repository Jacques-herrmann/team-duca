<template>
  <div class="history">
    <figure-element class="history__cover" :image="block.primary.cover" />
    <div
     class="history__element"
     v-for="element in block.items"
      :key="element.id"
     :style="{
        height: element?.media.dimensions.height + 'px'
     }"
    >
      <figure-element class="history__img" :image="element.media" />
      <div class="history__content">
        <h3 class="history__title">{{element.title}}</h3>
        <prismic-rich-text class="history__text" :field="element.content"/>
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

  &__element
    position: relative
    width: 100%
    margin: 10rem 0

    &:nth-child(3)
      & > .history__img
        @include grid(5, 11)

      & > .history__content
        @include grid(1, 6)
        text-align: right

    &:nth-child(4)
      & > .history__img
        @include grid(2, 6)

      & > .history__content
        @include grid(5, 12)

  &__img
    @include grid(1, 7)
    object-fit: cover
    object-position: center


  &__content
    @include grid(6, 12)
    color: white
    padding: 0 0 0 5rem


  &__title
    @include h2()

  &__text
    @include text()


</style>