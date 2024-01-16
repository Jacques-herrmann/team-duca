<template>
  <div class="sponsors" ref="root">
    <h2 class="sponsors__title">
      <span class="sponsors__title--letter" v-for="l in block.primary.title">{{ l }}</span>
    </h2>
    <div class="sponsors__list">
      <div class="sponsors__item" v-for="item in block.items">
        <img :src="item.logo.url" :alt="item.logo.alt" />
      </div>
    </div>
    <CTA class="sponsors__cta" :url="block.primary.cta_link" :text="block.primary.cta_text" :is-nuxt-link="true"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from "gsap";
import A from "assets/animations";
import {shuffle} from "~/utils/math";

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  threshold: 0.4,
  rootMargin: '100px 0px 0px 0px',
  onReveal: () => {
    draw()
  },
})
const tl = gsap.timeline({ paused: true })

const draw = () => {
  tl.play()
}

onMounted(() => {
  tl.from(root.value?.querySelectorAll('.sponsors__title--letter') as NodeListOf<HTMLElement>, A.title, 0)

  let elements = root.value?.querySelectorAll('.sponsors__item,.sponsors__cta') as NodeListOf<HTMLElement>
  tl.from(elements, {
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
  }, 0.4)

})

</script>
<style scoped lang="sass">
.sponsors
  position: relative
  width: 100%
  padding-top: 10rem

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
      margin-bottom: 10rem

  &__list
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    gap: 100px
    @include lg
      flex-direction: row
      gap: 40px

  &__item
    height: 40px
    max-width: 200px
    margin: 0 1rem

    @include lg
      height: 60px

    img
      height: 100%
      object-fit: contain
      object-position: center

  &__cta
    position: relative
    left: 50%
    transform: translateX(-50%)
    margin: 8rem 0

</style>
