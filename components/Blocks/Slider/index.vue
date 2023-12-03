<template>
  <div class="slider" ref="root">
    <div class="slider__btn slider__btn--previous" @click="onPrevious">
      <IconArrow/>
    </div>
    <div class="slider__inner">
      <BlocksSliderTitle ref="title" class="slider__title" :list="block.items" :current="current" />
      <prismic-rich-text :field="description" class="slider__description"/>
    </div>
    <div class="slider__btn slider__btn--next" @click="onNext">
      <IconArrow/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import Slider from "./webgl";

const props = defineProps<{
  block: any
}>()

const root = ref(null)
const title = ref(null)
const slider: Ref<null | Slider> = ref(null)

const current = ref(0)
const description = computed(() => {
  return props.block.items[current.value].content
})

const onNext = () => {
  slider.value?.onNext()
  const next = (current.value + 1) % 3;
  title.value?.changeTo(next)
  current.value = next
}

const onPrevious = () => {
  slider.value?.onPrevious()
}

onMounted(() => {
  slider.value = new Slider(root.value, props.block.items)
  // slider.value.on('change', (i: number) => {
  //   current.value = i
  // })
  console.log(props.block)
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
    width: calc(100% - 180px)
    display: flex
    flex-direction: column
    padding: 90px
    padding-top: 50vh
    pointer-events: none
    z-index: 1

  &__description
    @include text()
    color: $white
    max-width: 700px
    margin-top: 40px

  &__btn
    height: 100%
    width: 90px
    z-index: 1
    display: flex
    align-items: center
    justify-content: center
    background: transparent
    cursor: pointer

    & svg
      transition: transform .3s ease-out
    &:hover
      & svg
        transform: translateX(-2px)

    &--next
      transform: rotate(180deg)


</style>
<style lang="sass">
.slider canvas
  position: absolute
  top: 0
  left: 0
  z-index: 0
</style>
