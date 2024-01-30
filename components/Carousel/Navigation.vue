<template>
  <div class="carousel-navigation">
    <button
      class="carousel-navigation-btn carousel-navigation-btn--prev"
      :class="current === 0 ? 'carousel-navigation-btn--disable': ''"
      @click="onPrevious"
    >
      <Arrow/>
    </button>
    <button
      class="carousel-navigation-btn carousel-navigation-btn--next"
      :class="current === length - 1 ? 'carousel-navigation-btn--disable': ''"
      @click="onNext"
    >
      <Arrow/>
    </button>
  </div>
</template>
<script setup>

import Arrow from "~/components/Icons/Arrow.vue";

const emits = defineEmits(['next', 'previous'])
const props = defineProps({
  current: {
    type: Number,
  },
  length: {
    type: Number,
  }
})

const onNext = (ev) => {
  ev.preventDefault()
  emits('next')
}

const onPrevious = (ev) => {
  ev.preventDefault()
  emits('previous')
}

</script>
<style lang="sass" scoped>
.carousel-navigation
  width: 110px
  height: 50px
  display: flex
  justify-content: space-between

  &-btn
    height: 48px
    width: 48px
    display: flex
    justify-content: center
    align-items: center
    border-radius: 50%
    background-color: #002C5599
    opacity: 1

    &--disable
      opacity: 0.6

    &--prev
      transform: rotate(180deg)
      .ar &
        transform: rotate(0deg) !important

    .ar &
      transform: rotate(180deg)








</style>
