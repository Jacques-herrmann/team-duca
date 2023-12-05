<template>
  <div>
    <div class="slider-element" ref="root">
      <slot />
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  list: Array<Object>,
  current: Number,
  key: String,
}>()

const root = ref<null |HTMLElement>(null)
const current = ref("")
const next = ref("")

const list = computed(() => {
  return props.list.map((i: any) => i[props.key])
})

const changeTo = (index: number) => {
  next.value = list.value[index]

  const elts = root.value?.children
  if(!elts || elts.length < 2) return
  const tl = gsap.timeline({
    onComplete: () => {
      current.value = list.value[index]
      next.value = ""
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