<template>
  <div
   ref="root"
   class="history-element"
   :class="`${index % 2 === 0 ? 'history-element--reverse': ''} history-element--is-${orientation}`"
  >
    <figure-element class="history-element__img" :image="media" />
    <Parallax class="history-element__parallax" :active="intersect.active.value" :speed="3">
    <div class="history-element__content">
      <h3 class="history-element__title">
        <div v-for="t in sTitle"><span>{{t}}</span></div>
      </h3>
      <prismic-rich-text class="history-element__text" :field="content" />
    </div>
    </Parallax>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { gsap } from 'gsap'
import A  from '@/assets/animations'

const props = defineProps<{
  index: Number,
  media: any,
  title: String,
  orientation: String,
  content: any
}>()

const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  threshold: 0.2,
  rootMargin: '100px 0px 0px 0px',
  onReveal: () => {
    draw()
  },
})

const sTitle = computed(() => props.title.split('\n'))

const draw = () => {
  const tl = gsap.timeline()
  tl.from(root.value?.querySelectorAll('.history-element__title span') as NodeListOf<HTMLElement>, A.h2)
  tl.from(root.value?.querySelectorAll('.history-element__text') as NodeListOf<HTMLElement>, A.opacity)
}

</script>
<style scoped lang="sass">

$columns: 12
$gap: 1rem
$margin: 90px


@mixin grid($start, $end)
  position: absolute
  left: calc($margin + (100% - $margin * 2) / $columns * ($start))
  width: calc((100% - $margin * 2) / $columns * ($end - $start))

@mixin grid-mobile($start, $end)
  position: absolute
  left: calc(10px + (100% - 20px) / $columns * ($start))
  width: calc((100% - 20px) / $columns * ($end - $start))

@mixin ratio($ratio)
  padding-top: calc(100% / $ratio)

.history-element
  position: relative
  width: 100%
  height: 75vw
  margin: 8rem 0
  @include lg
    margin: 10rem 0
    height: 36vw

  &__parallax
    height: 100%

  &--reverse
    & .history-element__img
      @include grid-mobile(3, 12)
      @include lg
        @include grid(5, 11)

    & .history-element__content
      @include grid-mobile(1, 9)
      text-align: right
      @include lg
        @include grid(0.1, 6)
        padding: 0
      @include xxl
        @include grid(1, 6)

  &__img
    @include grid-mobile(1, 9)
    object-fit: cover
    object-position: center
    @include lg
      @include grid(1, 7)

  &--is-portrait
    & .history-element__img
      @include grid-mobile(1, 7)
      @include lg
        @include grid(2, 6)

    & .history-element__content
      @include grid-mobile(3, 11)
      @include lg
        @include grid(5, 12)
      @include xxl
        @include grid(5, 11)


  &__content
    @include grid-mobile(2, 11)
    bottom: 0
    color: white
    @include lg
      @include grid(5, 12)
      padding: 0 0 0 5rem


  &__title
    @include h2(9vw)
    @include lg
      @include h2()
    & > div
      overflow: hidden
    & span
      display: block
      height: 9vw
      @include lg
        height: 4.5rem

  &__text
    @include text(3.5vw)
    margin-top: 1.4rem
    @include lg
      @include text()


</style>