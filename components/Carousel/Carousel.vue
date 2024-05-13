<template>
  <div class="carousel">
    <Splide ref="carousel" :options="sliderOpts" @splide:moved="onMove">
      <SplideSlide
        v-for="image in content"
        :key="image"
      >
        <FigureElement
          class="carousel__img"
          :image="image.media"
        />
      </SplideSlide>
    </Splide>
    <Navigation
      class="carousel__nav"
      v-if="content.length > 1"
      :current="current"
      :length="content.length"
      @next="onNext"
      @previous="onPrevious"
    />
  </div>
</template>
<script setup>

import Navigation from "@/components/Carousel/Navigation";
import {Splide, SplideSlide} from '@splidejs/vue-splide';
import {useIndexStore} from "@/stores/index.js";
import '@splidejs/vue-splide/css/core';


const props = defineProps({
  content: {
    type: Array,
  }
})
const sliderOpts = ref({
  autoWidth: true,
  arrows: false,
  gap: '0px',
  speed: 800,
  drag: 'free',
  snap: true,
  dragMinThreshold: 60
})

const config = useRuntimeConfig()
const store = useIndexStore()

const carousel = ref(null)
const current = ref(0)
const onAnim = ref(false)

const onMove = (slide, newIndex) => {
  current.value = newIndex
}

const onNext = () => {
  if (onAnim.value) return
  onAnim.value = true
  setTimeout(() => {
    onAnim.value = false
  }, sliderOpts.value.speed)

  carousel.value.go('+1')
}

const onPrevious = () => {
  if (onAnim.value) return
  onAnim.value = true
  setTimeout(() => {
    onAnim.value = false
  }, sliderOpts.value.speed)

  carousel.value.go('-1')
}

const setFullscreen = (url) => {
  store.setFullscreen(url)
}

onMounted(() => {
  setTimeout(() => {
    carousel.value.splide.refresh()
  }, 1000)
})

</script>
<style lang="sass" scoped>
.carousel
  position: relative
  width: 100%

  &__title
    width: 100%
    text-align: left

    & h3
      @include text(28px, 120%)
      color: $black
      display: block

    & p
      @include text(18px, 130%)
      max-width: 720px
      color: $black
      margin-top: 15px
      display: block


  &__img
    height: 350px
    margin-right: 20px
    object-fit: cover
    display: block
    @include lg
      height: 570px
      margin-right: 40px


  &__nav
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

  &__fullscreen
    position: absolute
    top: -20px
    right: 20px
    fill: white
    z-index: 1

</style>

<style lang="sass">
.carousel
  & .splide__slide
    max-width: calc(100% - 20px) !important
    width: min-content !important
    @include lg
      max-width: calc(100% - 40px) !important

  & .splide__slide .figure-element img
    min-width: 300px
    object-fit: cover
    @include lg
      width: auto !important
  //min-width: 400px!important

  & .splide__slide .figure-element
    max-width: calc(100% - 40px) !important
    min-width: 100px !important
    overflow: hidden

  & .splide__slide .figure-element__caption
    width: 100%

  & .splide__pagination
    display: none

</style>
