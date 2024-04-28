<template>
  <div class="mask-image" ref="root">
    <svg class="mask" width="802" height="792" viewBox="0 0 802 792" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <image class="mask-image__image" height="100%" clip-path="url(#mask)" :xlink:href="url"/>
      <defs>
        <clipPath id="mask">
          <path d="M89.6784 23.5H259.5L166.5 761.5H0L89.6784 23.5Z" fill="white"/>
          <path d="M260.678 121.5H430.5L347 791.5H180L260.678 121.5Z" fill="white"/>
          <path d="M460.5 0H630L535.5 758H366.5L460.5 0Z" fill="white"/>
          <path d="M632.178 113.5H802L717 792H548L632.178 113.5Z" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </div>
</template>
<script setup lang="ts">

import {defineProps} from "vue";
import gsap from "gsap";

const props = defineProps<{
  image: any
}>()

const root = ref(null)
let tl = <Timeline | null>null

const url = ref(props.image.url)

watch(() => props.image, () => {
  tl.restart()
})

onMounted(() => {
  tl = gsap.timeline({
    repeat: 1,
    yoyo: true,
    onRepeat: () => {
      url.value = props.image.url
    }
  })

  const paths = Array.from(root.value?.querySelectorAll('.mask path'))

  paths.forEach((path, index) => {
    tl?.to(path, {
      duration: 0.5,
      x: 10 * (index % 2 ? 1 : -1),
      y: -80 * (index % 2 ? 1 : -1),
      ease: 'power1.in'
    }, 0)
  })
  tl?.to(root.value?.querySelector('.mask-image__image'), {
    duration: 0.2,
    opacity: 0,
  }, 0.3)
})

</script>

<style scoped lang="sass">
.mask-image
  position: relative
  opacity: 0.6

  @include lg
    opacity: 1

  .mask
    position: absolute
    top: 0
    left: 50%
    height: 100%
    width: calc(100% - 16.8vw)
    transform: translate(-50%, 0)
    fill: white
    @include lg
      width: 100%

    &__image
      height: 100%
      width: 100%
      object-fit: cover


</style>