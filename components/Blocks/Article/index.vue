<template>
  <div
    ref="root"
    class="article-element"
  >
    <span class="article-element__subtitle">{{ block.primary.subtitle }}</span>
    <h3 class="article-element__title">
      <div v-for="t in block.primary.title"><span>{{ t }}</span></div>
    </h3>
    <prismic-rich-text class="article-element__text" :field="block.primary.content"/>
    <Carousel class="article-element__carousel" :content="block.items"/>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
import {gsap} from 'gsap'
import Carousel from "~/components/Carousel/Carousel.vue";

const props = defineProps<{
  block: any,
}>()

const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  threshold: 0.2,
  rootMargin: '100px 0px 0px 0px',
  onReveal: () => {
    draw()
  },
})


const draw = () => {
  const tl = gsap.timeline()
}

</script>
<style scoped lang="sass">

.article-element
  position: relative
  width: 100%
  padding: 4rem 30px

  @include lg
    padding: 8rem 110px

  &__subtitle
    @include text(3vw)
    color: $red
    font-weight: bold
    @include lg
      @include text(0.9rem, 80%)

  &__title
    @include h2(9vw)
    margin-top: 0.5rem !important
    color: $white
    @include lg
      @include h2()

    & > div
      display: inline-block
      overflow: hidden


    & span
      height: 9vw
      white-space: pre
      @include lg
        height: 4.5rem

  &__text
    @include text(3.5vw)
    margin-top: 1.4rem
    max-width: 900px
    color: $white
    @include lg
      @include text()

  &__carousel
    margin-top: 40px

</style>