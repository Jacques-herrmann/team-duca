<template>
  <div class="fullscreen" @click="clickOutside">
    <div class="fullscreen__modal">
      <video :src="video.url" autoplay loop muted playsinline controls/>
    </div>
  </div>
</template>

<script>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useIndexStore} from "~/stores/index.js";

export default {
  name: 'VideoFullScreen',
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useIndexStore()
    const scroll = computed(() => store.scroll)

    const clickOutside = (e) => {
      if(e.target.classList.contains('fullscreen')) {
        store.isFullscreenVisible = false
      }
    }

    onMounted(() => {
      scroll.value.stop()
    })

    onBeforeUnmount(() => {
      scroll.value.start()
    })

    return {
      scroll,
      clickOutside
    }
  }
}
</script>
<style scoped lang="sass">
.fullscreen
  position: fixed
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  z-index: 100
  background: rgba(0,0,0,0.8)
  overflow: hidden

  &__modal
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 100

</style>