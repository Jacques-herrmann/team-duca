<template>
  <div class="cursor" :style="`transform: translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`">
  </div>
</template>
<script lang="ts" setup>
import {Vec2} from "ogl";

const props = defineProps({
  lerp: {
    type: Number,
    default: 0.1
  },

})

const target = ref(new Vec2())
const position = ref(new Vec2())

const onMouseMove = (e: MouseEvent) => {
  target.value.set(e.clientX, e.clientY)
}

const onUpdate = () => {
  requestAnimationFrame(onUpdate)

  position.value.lerp(target.value, props.lerp)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  onUpdate()
})


</script>
<style lang="sass">
.cursor
  position: fixed
  height: 10px
  width: 10px
  top: 0
  left: 0
  z-index: $z-cursor
  background-color: $white
  border-radius: 50%
  pointer-events: none
  display: none
  @media (pointer: fine)
    display: block


</style>