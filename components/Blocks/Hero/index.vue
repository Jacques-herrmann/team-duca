<template>
  <div class="hero" ref="root">
    <WebglImage class="hero__background" :image="block.primary.hero"/>
    <!--    <Logo class="hero__logo" @click="toHome" />-->
    <Parallax class="hero__content" :active="intersect.active.value" :speed="2">
      <div>
        <h1 class="hero__title">
          <span class="hero__title--word" v-for="s in splitTitle">
            <span class="hero__title--letter" v-for="l in s">{{ l }}</span>
          </span>
        </h1>
        <div class="hero__footer">
          <h2 class="hero__sub">{{ block.primary.text_left }}</h2>
          <h2 class="hero__sub">{{ block.primary.text_right }}</h2>
        </div>
      </div>
    </Parallax>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
import gsap from 'gsap'
import Timeline = gsap.core.Timeline;

const props = defineProps<{
  block: any
}>()

const store = useIndexStore();
const locale = 'fr';
const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root)
let tl = <Timeline | null>null

const splitTitle = computed(() => props.block.primary.title.split(' '))

watch(() => store.isTransitionVisible, (value) => {
  if (!value && store.isLocalTransition) {
    setTimeout(() => {
      draw()
    }, 1000)
  }
}, {immediate: true})

const toHome = () => {
  navigateTo(`/${locale}`)
}

const draw = () => {
  tl = gsap.timeline({paused: true})
  tl?.to('.hero__title--letter', {
    duration: 0.4,
    y: 0,
    rotateZ: 0,
    stagger: 0.022,
    ease: 'power2.out'
  })
  tl?.to('.hero__footer h2', {
    opacity: 1,
    duration: 0.6,
    ease: 'linear'
  }, 0.6)
  tl?.play()
}

defineExpose({
  draw
})


</script>
<style scoped lang="sass">
.hero
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  overflow: hidden

  &__logo
    position: absolute
    top: 40vw
    left: 68vw
    height: 100px
    width: 100px
    pointer-events: all
    z-index: 1
    cursor: pointer

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
    padding: 4vw 6vw
    padding-top: 60px
    width: 100%
    height: 100%
    z-index: 1
    user-select: none
    pointer-events: none
    @include lg
      bottom: 2.3vw
      left: unset
      padding: 0
      height: unset

  &__title
    @include h1(35vw)
    font-weight: 800 !important
    text-align: left
    color: $white
    pointer-events: none

    &--word
      overflow: hidden
      display: block
      @include lg
        display: inline-block
        white-space: pre
        will-change: transform
        &:first-child
          margin-right: 2vw

    &--letter
      display: inline-block
      white-space: pre
      will-change: transform
      transform: translateY(105%) rotateZ(10deg)

    @include lg
      @include h1(20vw)
      text-align: center
      line-height: 80% !important

  &__footer
    position: absolute
    bottom: 4vh
    left: 50%
    transform: translateX(-50%)
    width: 100%
    display: flex
    justify-content: space-between
    align-items: flex-end
    padding: 0 8.4vw
    pointer-events: none
    @include lg
      position: unset
      transform: none

  &__sub
    @include h2(3.2vw)
    font-weight: 800 !important
    letter-spacing: 0.08rem
    width: 50%
    color: $white
    opacity: 0

    &:first-child
      text-align: left

    &:last-child
      text-align: right

    @include lg
      @include h2(1.8vw)
      width: 26vw

  //@include xl
  //  width: 21.5vw

  &__cta
    position: absolute
    bottom: 200px
    left: 50%
    transform: translateX(-50%)
    z-index: 1
</style>