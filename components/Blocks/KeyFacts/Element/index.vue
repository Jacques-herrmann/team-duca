<template>
  <div class="keyfact__element" ref="root">
    <div class="keyfact__number">
      <span class="keyfact__grey">{{number}}</span>
      <span class="keyfact__red">
        <span v-for="c in chars">{{c}}</span>
      </span>
    </div>
    <p class="keyfact__text">{{text}}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from 'gsap'
import A from '@/assets/animations'

const props = defineProps<{
  number: String,
  delay: Number,
  text: String
}>()

const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  onReveal: () => {
    draw()
  },
})
const tl = gsap.timeline({delay: props.delay, paused: true})

const chars = props.number.split('')

const draw = () => {
  tl.play()
}

onMounted(() => {
 const reds = root.value?.querySelectorAll('.keyfact__red span')
  if (reds) {
    tl.from(reds, A.h2, 0)
    tl.from(root.value?.querySelector('.keyfact__grey') as HTMLElement, A.opacity, 0.2)
    tl.from(root.value?.querySelector('.keyfact__text') as HTMLElement, A.opacity, 0.4)
  }
})


</script>
<style scoped lang="sass">
.keyfact
  &__element
    position: relative
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 10px

  &__number
    position: relative
    width: 100%
    display: grid
    place-items: center

  &__red
    @include title(7.5vw)
    font-size: clamp(80px, 7.5vw, 200px)
    font-weight: 800
    position: relative
    color: $red
    overflow: hidden
    & span
      display: inline-block


  &__grey
    @include title(12vw)
    font-size: clamp(125px, 12vw, 400px)
    font-weight: 800
    color: $white
    opacity: 0.04
    position: absolute

  &__text
    @include text(1.2rem)
    height: 3.5rem
    color: $white
    text-align: center
    max-width: 220px


</style>
