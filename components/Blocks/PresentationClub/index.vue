<template>
  <div class="club">
    <LogoRight class="club__logo-l"/>
    <div class="club__content">
      <h2 class="club__title">{{ block.primary.title}}</h2>
      <prismic-rich-text class="club__text" :field="block.primary.text"/>
    </div>
    <LogoLeft class="club__logo-r"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()


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
    max-width: 650px
    padding: 0 40px
    color: $white
    z-index: 1
    text-align: center
  &__title
    @include h2()
    margin-bottom: 40px
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
.b-club__text p
  margin: 20px 0
</style>