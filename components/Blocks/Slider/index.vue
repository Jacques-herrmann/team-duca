<template>
  <div class="slider" ref="root">
    <h2 class="slider__title">
      <span class="slider__title--letter" v-for="l in 'Nos Disciplines'">{{ l }}</span>
    </h2>
    <Splide ref="carousel" :options="sliderOpts">
      <SplideSlide
        v-for="(item, i) in block.items"
        :key="item"
      >
        <figure-element
          class="slider__image"
          :image="item.media"
          @mouseenter="onMouseEnter(i as number)"
          @mouseleave="onMouseLeave"
        />
        <div class="slider-item__content" :class="hovered === i ? 'slider__content--hovered':''">
          <h1 class="slider-item__title">{{ item.title }}</h1>
          <!--          <h3 class="slider__subtitle">{{ item.subtitle }}</h3>-->
          <!--          <prismic-rich-text class="slider__text" :field="item.content"/>-->
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
import {Splide, SplideSlide} from "@splidejs/vue-splide";
import '@splidejs/vue-splide/css/core';

const props = defineProps<{
  block: any
}>()
const sliderOpts = ref({
  type: 'loop',
  arrows: false,
  padding: '16vw',
  gap: '8vw',
})

const root = ref(null)
const carousel = ref(null)
const hovered = ref(-1)

const onMouseEnter = (index: number) => {
  hovered.value = index
}
const onMouseLeave = () => {
  hovered.value = -1
}

onMounted(() => {
})

</script>
<style scoped lang="sass">
.slider
  position: relative
  width: 100%
  cursor: grab

  &__title
    @include h1(14vw)
    font-weight: 900
    letter-spacing: 0.1rem
    width: 100%
    text-align: center
    color: $white
    margin-bottom: 6rem
    overflow: hidden

    & span
      display: inline-block
      white-space: pre
      will-change: transform

    @include lg
      @include h1()
      margin-bottom: 6rem

  &__image
    //min-width: 80vw
    //max-width: 80vw
    //width: 80vw
    height: calc(70vw * 9 / 16)
    opacity: 0.5

  &-item
    &__content
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      max-height: 8.5vw
      z-index: 2
      text-align: center
      color: $white
      pointer-events: none
      transition: all 0.3s ease-in-out
      display: flex
      flex-direction: column
      justify-content: center
      overflow: hidden

      &--hovered
        max-height: 100%
        padding: 0

    &__title
      @include h1(10vw, 85%)
      width: 100%

    &__subtitle
      @include title(4vw)
      width: 100%
      margin-top: 20px
      @include lg
        @include title(1.5rem)
        margin-top: 20px

    &__text
      @include text(1rem)
      max-width: 600px
      margin-top: 20px


</style>
<style lang="sass">
.slider__images canvas
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100%
  z-index: 0
</style>
