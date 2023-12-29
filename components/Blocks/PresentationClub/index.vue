<template>
  <div class="club" ref="root">
    <LogoRight class="club__logo-l" ref="right"/>
    <Parallax :active="intersect.active.value" :speed="2" :is-absolute="true">
      <div class="club__content">
        <h2 class="club__title">
          <div v-for="t in title"><span>{{t}}</span></div>
        </h2>
        <prismic-rich-text class="club__text" :field="block.primary.text"/>
      </div>
    </Parallax>
    <LogoLeft class="club__logo-r" ref="left"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import A from '@/assets/animations'
import gsap from 'gsap'

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const left = ref<HTMLElement | null>(null)
const right = ref<HTMLElement | null>(null)
const tl = gsap.timeline({paused: true})
const intersect = useIntersect(root, {
  threshold: 0,
  onReveal: () => {
    tl.play()
    left.value?.draw()
    right.value?.draw()
  },
})

const title = computed(() => props.block.primary.title.split('\n'))

onMounted(() => {
  tl.from(root.value?.querySelectorAll('.club__title span') as NodeList, A.h2, 0.2)
  tl.from(root.value?.querySelectorAll('.club__title span') as NodeList, A.opacity, 0.2)
  tl.from(root.value?.querySelectorAll('.club__text p') as NodeList, A.text, 0.4)
  tl.from(root.value?.querySelectorAll('.club__text p') as NodeList,  A.opacity, 0.4)

})



</script>
<style scoped lang="sass">
.club
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  overflow: hidden
  &__content
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 100%
    max-width: 800px
    padding: 0 40px
    color: $white
    z-index: 1
    text-align: center
  &__title
    @include h2()
    margin-bottom: 60px
    & > div
      overflow: hidden
    & span
      display: block
  &__text
    @include text()

  &__logo-l
    position: absolute
    top: 0
    left: 0
    height: 100%
    z-index: -1
  &__logo-r
    position: absolute
    top: 0
    right: 0
    height: 100%
    z-index: -1
</style>

<style lang="sass">
.club__text p
  margin: 20px 0
</style>