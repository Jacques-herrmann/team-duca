<template>
  <figure class="figure-element">
    <img
      ref="image"
      :src="image.url"
      :alt="image.alt"
    >
    <figcaption v-if="caption" class="figure-element__caption">
      <span>{{ caption }}</span>
    </figcaption>
  </figure>
</template>

<script>

import {onMounted} from "vue";

export default {
  name: 'FigureElement',
  props: {
    image: {
      type: Object,
      default: () => {
        return {
          url: {
            type: String,
            default: ''
          },
          alt: {
            type: String,
            default: ''
          }
        }
      }
    },
    caption: {
      type: String,
      default: undefined
    },
  },
  setup(props) {
    const image = ref(null)
    onMounted(() => {
      if (!props.image.url) {
        console.error('Image undefined, please check payload page ')
      }
    })
    return {}
  }
}
</script>

<style scoped lang="sass">
.figure-element
  width: 100%
  & > img
    width: 100%
    height: 100%
    display: block
    object-fit: cover

  &__caption
    max-width: 400px
    position: absolute
    top: calc(100% - 5.6rem)
    left: 1.2rem

</style>
