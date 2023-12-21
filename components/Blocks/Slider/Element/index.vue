<template>
    <div class="slider-element" ref="root">
      <span>{{ currentT }}</span>
      <span>{{ nextT }}</span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  list: Array<Object>,
  current: Number,
  lKey: String,
}>()

const root = ref<null |HTMLElement>(null)
const currentT = ref("")
const nextT = ref("")

const list = computed(() => {
  return props.list.map((i: any) => i[props.lKey])
})

const changeTo = (index: number) => {
  nextT.value = list.value[index]

  const elts = root.value?.children
  if(!elts || elts.length < 2) return
  const tl = gsap.timeline({
    onComplete: () => {
      currentT.value = list.value[index]
      nextT.value = ""
      gsap.set(elts[1], {opacity: 0})
      gsap.set(elts[0], {opacity: 1, y: 0})
    }
  })
  gsap.set(elts[1], {opacity: 0, y: -10})

  tl.to(elts[0], {
    opacity: 0,
    duration: 0.4,
    ease: 'linear'
  }, 0)
  tl.to(elts[0], {
    y: -10,
    duration: 0.4,
    ease: 'power1.out'
  }, 0)

  tl.to(elts[1], {
    opacity: 1,
    duration: 0.4,
    ease: 'linear'
  }, 0.2)
  tl.to(elts[1], {
    y: 0,
    duration: 0.4,
    ease: 'power1.in'
  }, 0.2)
}


defineExpose({
  changeTo
})

</script>
<style scoped lang="sass">

</style>