<template>
  <div class="snackbar" :class="`snackbar--${color}`">
    <span class="snackbar__message">{{ text }}</span>
  </div>
</template>
<script lang="ts" setup>
import gsap from 'gsap'

const text = ref('')
const color = ref('success')


const show = (message: string, type: 'success' | 'error' = 'success') => {
  text.value = message
  color.value = type

  gsap.to('.snackbar', {
    y: -10,
    xPercent: -50,
    duration: 0.5,
    ease: 'power3.out',
    onComplete: () => {
      setTimeout(() => {
        gsap.to('.snackbar', {
          y: 110,
          xPercent: -50,
          duration: 0.5,
          ease: 'power3.out',
        })
      }, 3000)
    },
  })
}

defineExpose({
  show,
})


</script>
<style scoped lang="sass">
.snackbar
  @include text()
  position: fixed
  bottom: 0
  left: 50%
  transform: translate(-50%, 110%)
  padding: 1rem 2rem
  z-index: 10
  background-color: $white
  color: $black
  overflow: hidden

  &--error
    background-color: $red
    color: $white

</style>