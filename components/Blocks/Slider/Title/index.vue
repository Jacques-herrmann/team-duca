<template>
  <div class="slider-title" ref="root">
    <h3 class="slider-title__item" >{{titles[current]}}</h3>
    <h3 class="slider-title__item" >{{titles[next]}}</h3>
  </div>
  <div class="slider-subtitle" ref="root">
    <h4 class="slider-subtitle__item" >{{subtitles[current]}}</h4>
    <h4 class="slider-subtitle__item" >{{subtitles[next]}}</h4>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  list: Array<Object>,
  current: Number,
  next: Number
}>()

const root = ref(null)
const titles = computed(() => {
  return props.list.map((i: any) => i.title)
})
const subtitles = computed(() => {
  return props.list.map((i: any) => i.subtitle)
})

</script>
<style scoped lang="sass">
.slider

  &-title
    //height: 60px
    overflow: hidden

    &__item
      @include h3(5rem, 100%)
      font-weight: 800
      color: $red
      display: block

  &-subtitle
    overflow: hidden

    &__item
      @include title(1.4rem)
      font-weight: 800
      letter-spacing: 0.1rem
      color: $white
      display: block


</style>