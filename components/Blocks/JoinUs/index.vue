<template>
  <div class="join-us" ref="root">
    <div class="join-us__cover">
      <parallax :active="intersect.active.value" :speed="3" :is-absolute="true">
        <figure-element class="join-us__image" :image="block.primary.cover" caption="" />
      </parallax>
    </div>

    <h2 class="join-us__title" ref="title">
      <span v-for="line in titleArr">
        <span class="join-us__title--letter" v-for="l in line">{{ l }}</span>
      </span>
    </h2>
    <CTA class="join-us__cta" :url="block.primary.cta_link" :text="block.primary.cta_text" :is-nuxt-link="true"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from "gsap";
import A from "assets/animations";

const props = defineProps<{
  block: any
}>()
const root = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  rootMargin: '200px 0px -10px 0px',
})
const intersectTitle = useIntersect(title, {
  onReveal: () => {
    draw()
  },
})

const tl = gsap.timeline({ paused: true })
const titleArr = computed(() => props.block.primary.title.split('\n'))

const draw = () => {
  tl.play()
}

onMounted(() => {
  tl.from(title.value?.querySelectorAll('.join-us__title--letter') as NodeListOf<HTMLElement>, A.title)
  tl.from(root.value?.querySelectorAll('.join-us__cta') as NodeListOf<HTMLElement>, A.opacity, 0.4)
})
</script>
<style scoped lang="sass">
.join-us
  position: relative
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

  &__title
    @include h1(12vw)
    font-weight: 900
    letter-spacing: 0.1rem
    margin-top: 10rem
    width: 100%
    max-width: 70rem
    text-align: center
    color: $white
    & > span
      display: block
      overflow: hidden
    &--letter
      display: inline-block
      white-space: pre
      will-change: transform

    @include lg
      @include h1()
      margin-bottom: 10rem
      margin-top: 10rem

  &__cta
    position: relative
    margin: 8rem 0

  &__cover
    position: relative
    overflow: hidden
    width: 100vw
    height: calc(9/16 * 100vw)

  &__image
    width: 110%
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    object-fit: cover
    object-position: center

</style>
