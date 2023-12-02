<template>
  <div class="b-keyfact__element">
    <div class="b-keyfact__number">
      <span>{{number}}</span>
      <span>{{number}}</span>
    </div>
    <p class="b-keyfact__text">{{text}}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  number: String,
  text: String
}>()


</script>
<style scoped lang="sass">
.b-keyfact
  &__element
    position: relative
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  &__number
    position: relative
    width: 100%
    height: 8vw

    & span
      @include title(4.5vw)
      display: block
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      color: $red
      &:first-child
        @include title(7.5vw)
        color: $white
        opacity: 0.04

  &__text
    @include text(1.2rem)
    color: $white
    text-align: center
    max-width: 150px


</style>
