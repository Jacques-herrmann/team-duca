<template>
  <div class="gallery" ref="root">
    <ul id="thumbnails" class="gallery__thumbnails">
      <li
       class="gallery__thumbnail"
       :class="`${i === currentIndex ? 'gallery__thumbnail--is-active': ''}`"
       v-for="(image, i) in media"
       :key="i"
       @click="onThumbnailsClick(i)"
      >
        <img :src="image.media?.url" :alt="image.media?.alt">
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import Slider from "@/utils/slider/webgl"

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const slider: Ref<null | Slider> = ref(null)

const media = computed(() => {
  return props.block.items || []
})

const currentIndex: Ref<Number> = ref(0)

const onNext = () => {
  slider.value?.onNext()
}

const onPrevious = () => {
  slider.value?.onPrevious()
}

const onThumbnailsClick = (t: Number) => {
  currentIndex.value = t
  slider.value?.onChange(t)
}

onMounted(() => {
  const rootEl = root.value
  if (!rootEl) return
  slider.value = new Slider(root.value, media.value)
})

</script>
<style scoped lang="sass">
.gallery
  position: relative
  width: 100%
  height: 100vh

  &__thumbnails
    position: absolute
    bottom: 10px
    left: 50%
    transform: translateX(-50%)
    height: 75px
    margin: 1rem auto 0
    padding: 0
    display: flex
    justify-content: center
    align-items: center

  &__thumbnail
    width: 70px
    height: 70px
    background-color: white
    overflow: hidden
    list-style: none
    margin: 0 0.2rem
    cursor: pointer
    transition: all 0.2s ease

    &--is-active
      width: 75px
      height: 75px
      & img
        opacity: 1 !important

    & img
      width: 100%
      height: 100%
      opacity: 0.85
      object-fit: cover
      transition: all 0.2s ease

</style>
<style lang="sass">
.gallery canvas
  width: 100%
  height: 100%
  z-index: 0
</style>