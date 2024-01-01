<template>
  <div class="b-hero" ref="root">
<!--    <Parallax :active="intersect.active.value" :speed="1">-->
      <WebglImage class="b-hero__background" :image="block.primary.hero"/>
<!--    </Parallax>-->
    <!--    <img class="b-hero__background" :src="block.primary.hero.url" :alt="block.primary.hero.alt">-->
    <Parallax class="b-hero__content" :active="intersect.active.value" :speed="2" >
      <div>
        <h1 class="b-hero__title">
          <span class="b-hero__title--letter" v-for="l in block.primary.title">{{ l }}</span>
        </h1>
        <div class="b-hero__footer">
          <h2 class="b-hero__sub">{{ block.primary.text_left}}</h2>
          <h2 class="b-hero__sub">{{ block.primary.text_right}}</h2>
        </div>
      </div>
    </Parallax>
    <!--    <CTA class="b-hero__cta" :text="block.primary.cta_text" :url="block.primary.cta_url" :is-nuxt-link="true"/>-->
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from 'gsap'
import A from '@/assets/animations'

const props = defineProps<{
  block: any
}>()

const store = useIndexStore();
const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root)
const tl = gsap.timeline({paused: true})

watch(() => store.isTransitionVisible, (value) => {
  if(!value) {
    setTimeout(() => {
      draw()
    }, 1000)
  }
})

const draw = () => {
  tl.play()
}

onMounted(() => {
  tl.from('.b-hero__title--letter', A.title)
  tl.from('.b-hero__footer h2', {
    opacity: 0,
    duration: 0.6,
    ease: 'linear'
  }, 0.6)
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

  &__content
    position: absolute
    bottom: 2.3vw
    //left: 50%
    width: 100%
    //transform: translateX(-50%)
    z-index: 1

  &__title
    @include h1(20vw)
    font-weight: 800 !important
    text-align: center
    color: $white
    overflow: hidden
    pointer-events: none
    & span
      display: inline-block
      white-space: pre
      will-change: transform

  &__footer
    width: 100%
    display: flex
    justify-content: space-between
    align-items: flex-end
    padding: 0 8.4vw
    pointer-events: none
  &__sub
    @include h2(1.8vw)
    font-weight: 800 !important
    letter-spacing: 0.08rem
    width: 21.5vw
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