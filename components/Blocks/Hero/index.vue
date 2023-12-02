<template>
  <div class="b-hero" ref="root">
    <Parallax :active="intersect.active.value">
      <WebglImage class="b-hero__background" :image="block.primary.hero"/>
    </Parallax>
    <!--    <img class="b-hero__background" :src="block.primary.hero.url" :alt="block.primary.hero.alt">-->
    <h1 class="b-hero__title">
      <span class="b-hero__title--letter" v-for="l in block.primary.title">{{ l }}</span>
    </h1>
    <div class="b-hero__footer">
      <h2 class="b-hero__sub">{{ block.primary.text_left}}</h2>
      <h2 class="b-hero__sub">{{ block.primary.text_right}}</h2>
    </div>
    <!--    <CTA class="b-hero__cta" :text="block.primary.cta_text" :url="block.primary.cta_url" :is-nuxt-link="true"/>-->
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const tl = gsap.timeline()

const intersect = useIntersect(root)

onMounted(() => {
  tl.from('.b-hero__title--letter', {
    duration: 0.3,
    y: '100%',
    stagger: 0.022,
    ease: 'power2.out'
  }, 3.4)
  tl.from('.b-hero__footer h2', {
    opacity: 0,
    duration: 0.6,
    ease: 'linear'
  }, 4)
})


</script>
<style scoped lang="sass">
.b-hero
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  overflow: hidden
  &__background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    opacity: 0.8
    object-fit: cover
    object-position: center
    z-index: 0

  &__title
    @include h1(20vw)
    position: absolute
    bottom: 5vw
    left: 50%
    width: 100%
    z-index: 1
    transform: translateX(-50%)
    text-align: center
    color: $white
    overflow: hidden
    pointer-events: none
    & span
      display: inline-block
      white-space: pre
      will-change: transform

  &__footer
    position: absolute
    bottom: 0
    left: 50%
    z-index: 1
    transform: translateX(-50%)
    width: 100%
    display: flex
    justify-content: space-between
    align-items: flex-end
    padding: 2.2vw 8.4vw
    pointer-events: none
  &__sub
    @include h2(1.8vw)
    width: 20vw
    color: $white
    &:first-child
      text-align: left
    &:last-child
      text-align: right

  &__cta
    position: absolute
    bottom: 200px
    left: 50%
    transform: translateX(-50%)
    z-index: 1
</style>