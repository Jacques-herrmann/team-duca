<template>
  <div class="slider-element" ref="root">
    <h2 class="slider-element__title">
      <span class="slider-element__title--letter" v-for="l in max">{{ l <= title.length ? title[l - 1] : '' }}</span>
    </h2>
    <h3 class="slider-element__subtitle">{{ subtitle }}</h3>
    <prismic-rich-text class="slider-element__text" :field="content"/>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
import gsap from "gsap";

const props = defineProps<{
  block: any,
  current: number
}>()

const root = ref<null | HTMLElement>(null)
let tl = <Timeline | null>null

const title = ref(props.block.items[props.current].title)
const subtitle = ref(props.block.items[props.current].subtitle)
const content = ref(props.block.items[props.current].content)

const max = computed(() => {
  let v = 0
  props.block.items.forEach((item: any) => {
    if (v < item.title.length) {
      v = item.title.length
    }
  })
  return v
})

watch(() => props.current, () => {
  tl?.restart()
})

onMounted(() => {
  tl = gsap.timeline({
    repeat: 1,
    yoyo: true,
    onRepeat: () => {
      title.value = props.block.items[props.current].title
      subtitle.value = props.block.items[props.current].subtitle
      content.value = props.block.items[props.current].content
    }
  })

  const elements = Array.from(root.value?.querySelectorAll('.slider-element__title--letter') as NodeListOf<HTMLElement>)
  elements.reverse()

  tl?.to(elements, {
    duration: 0.25,
    y: '105%',
    rotateZ: '3deg',
    stagger: 0.012,
    ease: 'power1.out'
  }, 0)
  tl?.to(root.value?.querySelector('.slider-element__subtitle'), {
    duration: 0.2,
    opacity: 0,
    ease: 'linear'
  }, 0.2)
  tl?.to(root.value?.querySelectorAll('.slider-element__text'), {
    duration: 0.2,
    opacity: 0,
    ease: 'linear'
  }, 0.2)
})


</script>
<style scoped lang="sass">
.slider-element
  position: relative
  padding: 0 8.4vw
  @include lg
    padding: 0

  &__title
    @include h1(6rem, 100%)
    font-weight: 900
    color: $white
    overflow: hidden

    @include md
      @include h1(10rem, 100%)

    & span
      display: inline-block
      white-space: pre
      will-change: transform

  &__subtitle
    @include h2(4vw)
    font-weight: 400
    color: $red
    letter-spacing: 0 !important

    @include lg
      @include h2(2vw)
      margin-bottom: 4rem

  &__text
    @include text()
    height: 200px
    color: $white
    line-height: 1.5
    font-weight: 400
    transform: translateY(20px)
    @include lg
      max-width: 80%


</style>