<template>
  <div class="abonnement-element" ref="root" @mouseenter="onHoverEnter" @mouseleave="onHoverLeave" @click="toInstagram">
    <parallax class="abonnement-element__parallax" :active="intersect.active.value" :speed="1.2" :speed-mobile="1.2"
              :is-absolute="true">
      <figure-element :image="cover" class="abonnement-element__cover"/>
    </parallax>
    <div class="abonnement-element__top ">
      <h3 class="abonnement-element__top__title">
        <div v-for="t in splitedText"><span>{{ t }}</span></div>
      </h3>
      <prismic-rich-text class="abonnement-element__top__subtitle" :field="texte"></prismic-rich-text>
    </div>
    <span class="abonnement-element__price">
      <div v-for="t in price"><span>{{ t }}</span></div>
    </span>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
import gsap from "gsap";
import A from "assets/animations";
import Timeline = gsap.core.Timeline;

const props = defineProps<{
  cover: any,
  title: String,
  texte: any,
  price: String
}>()

const root = ref<HTMLElement | null>(null)
let tl = <Timeline | null>null

const intersect = useIntersect(root, {
  threshold: 0,
  rootMargin: '100px 0px 0px 0px',
  onReveal: () => {
    tl?.play()
  },
})

const splitedText = computed(() => props.title.split('\n'))

const onHoverEnter = () => {
  gsap.to(root.value?.querySelectorAll('.abonnement-element__cover') as NodeList, {
    duration: 0.8,
    scale: 1.02,
    ease: 'power2.out'
  })
}
const onHoverLeave = () => {
  gsap.to(root.value?.querySelectorAll('.abonnement-element__cover') as NodeList, {
    duration: 0.8,
    scale: 1,
    ease: 'power2.out'
  })
}

onMounted(() => {
  tl = gsap.timeline({paused: true})
  tl.from(root.value?.querySelectorAll('.abonnement-element__top__title span') as NodeList, A.h2, 0.2)
  tl.from(root.value?.querySelectorAll('.abonnement-element__top__subtitle') as NodeList, A.opacity, 0.2)
  tl.from(root.value?.querySelectorAll('.abonnement-element__price span') as NodeList, A.h2, 0.4)
})

const toInstagram = () => {
  window.open('https://www.instagram.com/science_duca/?hl=fr', '_blank')
}

</script>
<style scoped lang="sass">
.abonnement-element
  width: 100%
  padding: 2rem 2rem 2rem 40px
  position: relative
  color: $white
  height: 300px
  display: flex
  flex-direction: column
  justify-content: space-between
  overflow: hidden
  cursor: pointer
  @include lg
    padding: 3.5rem 3.5rem 3.5rem 40px
    height: 30vw
    max-height: 450px

  &__parallax
    left: 0

  &__cover
    width: 100%
    height: 160%
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    opacity: 0.4
    z-index: -1
    @include lg
      width: 100%
      height: unset

  &__top
    &__title
      @include h3(4.2rem, 100%)

      & > div
        overflow: hidden

      & span
        display: inline-block

    &__subtitle
      @include text()
      font-style: italic
      max-width: 600px
      margin-top: .7rem
      position: relative
      z-index: 1

  &__price
    @include title(4rem)
    position: absolute
    bottom: 0
    right: 2rem
    color: $red
    float: right
    text-align: right
    @include lg
      bottom: 1rem

    & > div
      overflow: hidden
      display: inline-block

    & span
      display: inline-block


</style>
