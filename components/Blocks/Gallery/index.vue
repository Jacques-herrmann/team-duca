<template>
  <div class="gallery" ref="root">
    <section id="main-carousel" class="splide" >
      <div class="splide__track">
        <ul class="splide__list">
          <li class="splide__slide" v-for="image in media">
            <img :src="image.media?.url" :alt="image.media?.alt">
          </li>
        </ul>
      </div>
    </section>
    <ul id="thumbnails" class="gallery__thumbnails">
      <li class="gallery__thumbnail" v-for="image in media">
        <img :src="image.media?.url" :alt="image.media?.alt">
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import Splide from "@splidejs/splide";
import '@splidejs/splide/css';
import '@splidejs/splide/css/core';

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const splide = ref<Splide | null>(null)

const media = computed(() => {
  return props.block.items || []
})

onMounted(() => {
  const rootEl = root.value
  if (!rootEl) return
  splide.value = new Splide(root.value?.querySelector('#main-carousel') as HTMLElement, {
    pagination: false,
    height: '100vh',
    cover: true
  })
  splide.value.mount()
})

</script>
<style scoped lang="sass">
.gallery
  position: relative
  top: 0
  left: 0

  &__thumbnails
    position: absolute
    bottom: 10px
    left: 50%
    transform: translateX(-50%)
    display: flex
    margin: 1rem auto 0
    padding: 0
    justify-content: center

  &__thumbnail
    width: 70px
    height: 70px
    overflow: hidden
    list-style: none
    margin: 0 0.2rem
    cursor: pointer

  &__thumbnail img
    width: 100%
    height: 100%
    object-fit: cover

</style>