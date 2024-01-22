<template>
  <div class="fullscreen" @click="clickOutside">
    <div class="fullscreen__modal">
      <video class="fullscreen__video" :src="video.url" autoplay loop muted playsinline controls/>
      <IconClose class="fullscreen__close" @click="onClose"/>
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

    const onClose = () => {
      store.isFullscreenVisible = false
    }

    onMounted(() => {
      scroll.value.stop()
    })

    onBeforeUnmount(() => {
      scroll.value.start()
    })

    return {
      scroll,
      clickOutside,
      onClose
    }
  }
}
</script>
<style scoped lang="sass">
.fullscreen
  position: fixed
  width: 100vw
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  top: 0
  left: 0
  z-index: $z-video
  background: rgba(0,0,0,0.8)
  overflow: hidden

  &__modal
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 1

  &__video
    max-height: 100vh
    max-height: calc(var(--vh, 1vh) * 100)

  &__close
    position: absolute
    top: 20px
    right: 20px
    height: 40px
    width: 40px
    z-index: 100
    background: transparent
    border: none
    color: $white
    font-size: 1.2rem
    cursor: pointer
    outline: none


</style>