<template>
  <div class="carousel">
    <div class="carousel__title">
      <h3>{{ content?.c_title}}</h3>
      <p>{{ content?.c_text }}</p>
    </div>
    <div class="carousel__content">
      <Splide  ref="carousel" :options="sliderOpts" @splide:moved="onMove">
        <SplideSlide
          v-for="image in content?.images"
          :key="image"
        >
          <IconsFullscreen
            class="carousel__fullscreen"
            @click="setFullscreen(`${config.public.ASSETS_URL}/assets/images/${image.ci_source}`)"
          />
          <FigureElement
            class="carousel__content-img"
            :source="`${config.public.ASSETS_URL}/assets/images/${image.ci_source}`"
            :caption="image.ci_text"
          />
        </SplideSlide>
      </Splide >
      <Navigation
        class="carousel__nav"
        :current="current"
        :length="content?.images.length"
        @next="onNext"
        @previous="onPrevious"
      />
    </div>
  </div>
</template>
<script setup>

import Navigation from "@/components/Carousel/Navigation";
import Fullscreen from "~/components/Icons/Fullscreen.vue";
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import {useIndexStore} from "~/store/index.js";
import '@splidejs/vue-splide/css/core';




const props = defineProps({
  content: {
    type: Object,
  }
})
const sliderOpts = ref({
  autoWidth: true,
  arrows: false,
  gap: '40px',
  speed: 800,
  drag: 'free',
  snap: true,
  dragMinThreshold: 60
})

const config = useRuntimeConfig()
const store = useIndexStore()

const carousel = ref(null)
const current = ref(0)
const dir = ref('ltr')
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
  if(document?.body.classList.contains('ar')) {
    dir.value = 'rtl'
  }

  setTimeout(() => {
    console.log(carousel.value.splide)
    carousel.value.splide.refresh()
  }, 1000)
})

</script>
<style lang="sass" scoped>
.carousel
  position: relative
  width: calc(100% + 20px)
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

  &__content
    height: 600px
    padding: 40px 0

    &-img
      height: 570px
      margin-right: 40px
      object-fit: cover
      display: block

  &__nav
    position: absolute
    bottom: -70px
    left: 0px

    .ar &
      left: unset
      right: 20px

  &__fullscreen
    position: absolute
    top: -20px
    right: 20px
    fill: white
    z-index: 1

    .ar &
      right: unset
      left: 20px

</style>

<style>
.splide__slide {
  max-width: calc(100% - 40px)!important;
  width: min-content!important;
}
.splide__slide .figure-element img {
  width: auto!important;
  //min-width: 400px!important;
}
.splide__slide .figure-element {
  max-width: calc(100% - 40px)!important;
  min-width: 100px!important;
  overflow: hidden;
}
.splide__slide .figure-element__caption {
  width: 100%;
}
</style>
