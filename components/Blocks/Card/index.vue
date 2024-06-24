<template>
  <div class="card" :class="hasSeperator ? '':'separator-hidden'" ref="root">
    <div class="seperator"/>
    <h2 class="card__title">
      <span class="card__title--letter" v-for="l in title">{{ l }}</span>
    </h2>
    <BlocksCardImage v-for="elt in fights" :key="elt.id" :fight="elt.fight" :text="elt.description"/>
  </div>
</template>
<script setup>
import {defineProps} from 'vue'
import {gsap} from 'gsap'
import A from "assets/animations";

const props = defineProps({
  title: String,
  fights: Array,
  hasSeperator: {
    type: Boolean,
    default: true
  }
})

const root = ref(null)
const intersect = useIntersect(root, {
  threshold: 0,
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
  tl.from(root.value?.querySelectorAll('.card__title--letter'), A.title)
})

</script>
<style scoped lang="sass">
.card
  position: relative
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  margin-top: 40px

  &.separator-hidden
    .seperator
      display: none

  & .seperator
    width: 80%
    height: 1px
    background: rgba(255, 255, 255, 0.4)
    margin-bottom: 40px

    @include lg
      width: 60%
      margin-bottom: 100px

  &__title
    @include h2(14vw)
    font-weight: 900
    letter-spacing: 0.1rem
    margin: 6rem 0 4rem 0
    color: white
    text-align: center
    overflow: hidden

    & span
      display: inline-block
      white-space: pre
      will-change: transform

    @include lg
      @include h2()

</style>