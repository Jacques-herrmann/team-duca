<template>
  <canvas class="webgl-image" ref="root"/>
</template>

<script>

import {onMounted} from "vue";
import webgl from "~/components/WebglImage/webgl.js";

export default {
  name: 'WebglImage',
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
    }
  },
  setup(props) {
    const root = ref(null)
    const cursor = useCursor()

    onMounted(() => {
      cursor.init(root)
      webgl.init(root, props.image.url, cursor)
    })

    return {
      root
    }
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
