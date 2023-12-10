<template>
  <div class="b-keyfact__element">
    <div class="b-keyfact__number">
      <span>{{number}}</span>
      <span>{{number}}</span>
    </div>
    <p class="b-keyfact__text">{{text}}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  number: String,
  text: String
}>()
const tl = gsap.timeline({paused: true})

const draw = () => {
  tl.play()
}

onMounted(() => {

})


</script>
<style scoped lang="sass">
.b-keyfact
  &__element
    position: relative
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  &__number
    position: relative
    width: 100%
    display: grid
    place-items: center


    & span
      @include title(7.5vw)
      font-size: clamp(80px, 7.5vw, 200px)
      font-weight: 800
      display: block
      color: $red
      &:first-child
        @include title(12vw)
        font-size: clamp(125px, 12vw, 400px)
        font-weight: 800
        color: $white
        opacity: 0.04
        position: absolute

  &__text
    @include text(1.2rem)
    color: $white
    text-align: center
    max-width: 220px


</style>
