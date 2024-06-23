<template>
  <div class="fight" ref="root">
    <figure-element class="fight__cover" :image="fight"/>
    <prismic-rich-text class="fight__text" :field="text"/>
  </div>
</template>
<script setup>
import {defineProps} from 'vue'
import {gsap} from 'gsap'
import A from "assets/animations";

const props = defineProps({
  fight: Object,
  text: Object
})

const root = ref(null)
const intersect = useIntersect(root, {
  threshold: 0.2,
  rootMargin: '100px 0px 0px 0px',
  onReveal: () => {
    draw()
  },
})
let tl

const draw = () => {
  tl?.play()
}

onMounted(() => {
  tl = gsap.timeline({paused: true})
  tl.from(root.value?.querySelectorAll('.fight__cover') , A.opacity)
})

</script>
<style scoped lang="sass">
.fight
  width: 80%
  max-width: 1000px
  position: relative
  margin: 40px 0
  @include lg
    margin: 80px 0

  &__text
    @include text(3.5vw)
    margin-top: 1.4rem
    max-width: 1200px
    color: $white
    @include lg
      @include text()

</style>
<style lang="sass">
.fight__text
  color: white
  text-align: center
  strong
    font-weight: bold
    font-size: 1rem
    @include lg
      font-size: 1.2rem

  p
    margin-top: 1rem
    margin-bottom: 1rem

  a
    color: $red
    text-decoration: underline

    &:hover
      text-decoration: none
</style>