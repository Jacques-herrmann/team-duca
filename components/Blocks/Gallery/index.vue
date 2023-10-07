<template>
  <div class="b-gallery" ref="root">
    <div
     class="b-gallery__base"
     :style="{
       height: block.primary.hauteur + 'px',
       width: block.primary.largeur + 'px',
     }">
      <figure
       class="b-gallery__figure"
       v-for="(item, i) in block.items"
       :key="i"
       :style="{
         height: item.hauteur + 'px',
         width: item.largeur + 'px',
         left: item.posx + 'px',
         top: item.posy + 'px',
       }"
      >
        <img class="b-gallery__image" :src="item.media.url" :alt="item.media.alt" crossorigin="anonymous">
      </figure>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import GalleryGrid from '@/utils/gallery-grid/gallery'

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const gallery: Ref<GalleryGrid | null> = ref(null)

onMounted(() => {
  const rootEl = root.value
  if (!rootEl) return

  gallery.value = new GalleryGrid(rootEl)
})

</script>
<style scoped lang="sass">
.b-gallery
  position: relative
  top: 0
  left: 0
  background-color: black

  &__base
    position: relative
    top: 0
    left: 0
    visibility: hidden

  &__figure
    position: absolute
    margin: 0
    padding: 0

  &__image
    position: absolute
    top: 0
    left: 0
    height: 100%
    width: 100%
    object-fit: cover
</style>

<style lang="sass">
.b-gallery canvas
  position: fixed
  top: 0
  left: 0
  height: 100%
  width: 100%

</style>
