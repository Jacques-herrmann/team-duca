<template>
  <div class="slider-title" ref="rootT">
    <h3 class="slider-title__item"><span v-for="l in title">{{l}}</span></h3>
    <h3 class="slider-title__item"><span v-for="l in nextTitle">{{l}}</span></h3>
  </div>
  <div class="slider-subtitle" ref="rootS">
    <h4 class="slider-subtitle__item" >{{subtitles[current]}}</h4>
<!--    <h4 class="slider-subtitle__item" >{{subtitles[next]}}</h4>-->
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  list: Array<Object>,
  current: Number,
}>()

const rootT = ref<null |HTMLElement>(null)
const title = ref("")
const nextTitle = ref("")

const titles = computed(() => {
  return props.list.map((i: any) => i.title)
})
const subtitles = computed(() => {
  return props.list.map((i: any) => i.subtitle)
})

const changeTo = (next: number) => {
  nextTitle.value = titles.value[next]
  const t = rootT.value?.querySelectorAll('.slider-title__item')
  if(!t) return
  const tl = gsap.timeline({
    onComplete: () => {
      title.value = titles.value[next]
      nextTitle.value = ""
    }
  })

  tl.set(t[1].querySelectorAll('span'), {
    opacity: 0
  })

  tl.to(t[0].querySelectorAll('span'), {
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: 'linear'
  }, 0)
  tl.to(t[1].querySelectorAll('span'), {
    opacity: 1,
    duration: 0.6,
    stagger: 0.05,
    ease: 'linear'
  }, 0.1)
}

defineExpose({
  changeTo
})

</script>
<style scoped lang="sass">
.slider

  &-title
    position: relative
    height: 5rem
    overflow: hidden

    &__item
      @include h3(5rem, 100%)
      font-weight: 800
      color: $red
      display: block
      position: absolute
      z-index: 1

  &-subtitle
    height: 1.4rem
    overflow: hidden

    &__item
      @include title(1.4rem)
      font-weight: 800
      letter-spacing: 0.1rem
      color: $white
      display: block


</style>