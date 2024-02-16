<template>
  <div class="cta">
    <div class="cta__background"/>
    <div class="cta__background"/>
    <NuxtLink v-if="isNuxtLink" :to="`${url}`" class="cta__link">
      {{ text }}
    </NuxtLink>
    <button v-else class="cta__link">
      {{ text }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: ''
  },
  isNuxtLink: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const locale = route.params.locale

</script>
<style scoped lang="sass">
.cta
  position: relative
  background-color: transparent
  height: 70px
  min-width: 180px
  width: max-content
  overflow: hidden
  border: 2px solid $red
  border-radius: 4px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  padding-top: 4px

  &__link
    @include cta()
    color: $white
    padding: 0 40px

  & button
    border: none
    background-color: transparent
    height: 100%
    width: 100%

  &__background
    position: absolute
    top: 0
    left: 0
    height: 100%
    width: 120%
    background-color: $white
    border-radius: 4px
    transform: translateX(-120%)
    transition: transform 0.3s ease
    clip-path: polygon(0 0, 90% 0, 100% 100%, 0% 100%)
    z-index: -1

    &:nth-child(2)
      background-color: $red
      transition: transform 0.3s ease 0.02s

  &:hover
    .cta__background
      transform: translateX(-1%)

</style>