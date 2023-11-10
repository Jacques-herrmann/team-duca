<template>
  <div class="b-hero">
    <img class="b-hero__background" :src="block.primary.hero.url" :alt="block.primary.hero.alt">
    <h1 class="b-hero__title">{{ block.primary.title }}</h1>
    <div class="b-hero__footer">
      <h2 class="b-hero__sub">{{ block.primary.text_left}}</h2>
      <h2 class="b-hero__sub">{{ block.primary.text_right}}</h2>
    </div>
    <!--    <CTA class="b-hero__cta" :text="block.primary.cta_text" :url="block.primary.cta_url" :is-nuxt-link="true"/>-->
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()

</script>
<style scoped lang="sass">
.b-hero
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  overflow: hidden
  &__background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    opacity: 0.8
    object-fit: cover
    object-position: center
    z-index: -1

  &__title
    @include h1(12vw)
    position: absolute
    bottom: 160px
    left: 50%
    width: 100%
    z-index: 1
    transform: translateX(-50%)
    text-align: center
    color: $white

  &__footer
    position: absolute
    bottom: 0
    left: 50%
    z-index: 1
    transform: translateX(-50%)
    width: 100%
    display: flex
    justify-content: space-between
    align-items: flex-end
    padding: 3.2vw
  &__sub
    @include h2(2.6rem)
    width: 400px
    color: $white
    &:first-child
      text-align: left
    &:last-child
      text-align: right

  &__cta
    position: absolute
    bottom: 200px
    left: 50%
    transform: translateX(-50%)
    z-index: 1
</style>