<template>
  <div class="slider" ref="root">
    <div class="slider__btn slider__btn--previous" @click="onPrevious">
      <IconArrow/>
    </div>
    <div class="slider__inner">
      <BlocksSliderElement ref="title" class="slider__title" :list="block.items" :current="current" l-key="title" />
      <BlocksSliderElement ref="subtitle" class="slider__subtitle" :list="block.items" :current="current" l-key="subtitle" />
      <prismic-rich-text :field="description" class="slider__description" />
    </div>
    <div class="slider__btn slider__btn--next" @click="onNext">
      <IconArrow/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import Slider from "@/utils/slider/webgl";

const props = defineProps<{
  block: any
}>()

const root = ref(null)
const title = ref(null)
const subtitle = ref(null)
const slider: Ref<null | Slider> = ref(null)

const current = ref(0)
const active = ref(false)
const description = computed(() => {
  return props.block.items[current.value].content
})

const setActive = () => {
  active.value = true
  setTimeout(() => {
    active.value = false
  }, 1000)
}

const onNext = () => {
  if(active.value) return
  setActive()
  const next = (current.value + 1) % 3
  current.value = next

  slider.value?.onNext()
  title.value?.changeTo(next)
  subtitle.value?.changeTo(next)
}

const onPrevious = () => {
  if(active.value) return
  setActive()
  let previous = (current.value - 1) % 3;
  if (previous < 0) {
    previous = 2;
  }
  current.value = previous

  title.value?.changeTo(previous)
  subtitle.value?.changeTo(previous)
  slider.value?.onPrevious()
}

onMounted(() => {
  slider.value = new Slider(root.value, props.block.items)
  title.value?.changeTo(0)
  subtitle.value?.changeTo(0)
})

</script>
<style scoped lang="sass">
.slider
  position: relative
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center

  &__inner
    height: 100%
    width: calc(100% - 60px)
    display: flex
    flex-direction: column
    padding: 90px 20px
    pointer-events: none
    z-index: 1
    @include lg
      width: calc(100% - 180px)
      padding: 90px
      padding-top: 40vh

  &__description
    @include text(3.5vw)
    color: $white
    max-width: 700px
    margin-top: 40px
    @include lg
      @include text()

  &__btn
    height: 100%
    width: 30px
    z-index: 1
    display: flex
    align-items: center
    justify-content: center
    background: transparent
    cursor: pointer
    @include lg
      width: 90px

    & svg
      transition: transform .3s ease-out
      transform: scale(0.5)
      @include lg
        transform: scale(1)

    &:hover
      & svg
        transform: translateX(-2px) scale(0.5)
        @include lg
          transform: translateX(-2px) scale(1)

    &--next
      transform: rotate(180deg)

  &__title
    @include h1(20vw)
    position: relative
    height: 18vw
    z-index: 1
    color: $red
    pointer-events: none
    @include lg
      @include h1()
      height: 6.1rem

  &__subtitle
    @include title(5vw)
    height: 5vw
    position: relative
    z-index: 1
    color: $white
    pointer-events: none
    @include lg
      @include title(1.5rem)
      height: 1.5rem


</style>
<style lang="sass">
.slider canvas
  position: absolute
  top: 0
  left: 0
  z-index: 0
</style>
