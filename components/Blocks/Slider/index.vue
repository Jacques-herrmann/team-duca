<template>
  <div class="slider" ref="root">
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
        <div class="slider__content">
          <h1 class="slider__title">{{ item.title }}</h1>
          <h3 class="slider__subtitle" v-if="hovered === i">{{ item.subtitle }}</h3>
          <prismic-rich-text class="slider__text" :field="item.content" v-if="hovered === i"/>
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
  padding: '360px',
  gap: '180px',
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
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  width: 100%

  &__image
    //min-width: 80vw
    //max-width: 80vw
    //width: 80vw
    height: calc((100vw - 620px) * 9 / 16)

  &__content
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    z-index: 2
    text-align: center
    color: $white
    pointer-events: none
    transition: height 0.3s ease-in-out

  &__title
    @include h1(10vw, 85%)
    width: 100%

  &__subtitle
    @include title(4vw)
    width: 100%
    margin-top: 20px
    @include lg
      @include title(1.5rem)

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
