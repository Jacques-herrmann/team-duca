<template>
  <div class="slider" ref="root">
    <h2 class="slider__title">
      <span class="slider__title--letter" v-for="l in 'Nos Disciplines'">{{ l }}</span>
    </h2>
    <div class="slider__content">
      <div class="slider__left">
        <BlocksSliderElement :block="block" :current="current"/>
      </div>
      <BlocksSliderMask class="slider__right" :image="block.items[current].media"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
import gsap from "gsap";

const props = defineProps<{
  block: any
}>()

const root = ref(null)
const carousel = ref(null)
const current = ref(0)

let tl = <Timeline | null>null
const intersect = useIntersect(root, {
  threshold: 0.4,
  rootMargin: '100px 0px 0px 0px',
  onReveal: () => {
    draw()
  },
})

const draw = () => {
  tl?.play()
}

onMounted(() => {
  tl = gsap.timeline({paused: true})
  setInterval(() => {
    if (current.value === props.block.items.length - 1) {
      current.value = 0
    } else {
      current.value++
    }
  }, 3000)
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

  &__content
    position: relative
    width: 100%
    height: 80vh
    @include lg
      height: 100vh

  &__left
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1
    display: flex
    justify-content: center
    flex-direction: column

    @include lg
      left: 8rem
      width: 60%
      padding: 0 4rem


  &__right
    position: absolute
    top: 0
    right: 0
    width: 100%
    height: 100%
    overflow: hidden

    @include lg
      top: 0
      right: 8rem
      width: 50%
      overflow: hidden

</style>
