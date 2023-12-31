<template>
  <div class="join-us">
    <div class="join-us__cover" ref="root">
      <parallax :active="intersect.active.value" :speed="3" :is-absolute="true">
        <figure-element class="join-us__image" :image="block.primary.cover" caption="" />
      </parallax>
    </div>
    <h2 class="join-us__title">{{ block.primary.title }}</h2>
    <CTA class="join-us__cta" :url="block.primary.cta_link" :text="block.primary.cta_text" :is-nuxt-link="true"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()
const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  rootMargin: '200px 0px -10px 0px',
  onReveal: () => {
    draw()
  },
})
const draw = () => {
  console.log('draw')
  // gsap.from(root.value?.querySelectorAll('.history__cover-image') as NodeListOf<HTMLElement>, A.image)
}

</script>
<style scoped lang="sass">
.join-us
  position: relative
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

  &__title
    @include h1()
    font-weight: 900
    letter-spacing: 0.1rem
    margin-top: 10rem
    width: 100%
    max-width: 800px
    text-align: center
    color: $white

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
