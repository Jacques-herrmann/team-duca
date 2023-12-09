<template>
  <div class="abonnement">
    <div class="abonnement__item" v-for="elt in block.items">
      <figure-element :image="elt.cover" class="abonnement__item__cover"/>
      <div class="abonnement__item__top ">
        <h3 class="abonnement__item__top__title" v-html="splitedText(elt.title)">
        </h3>
      <prismic-rich-text class="abonnement__item__top__subtitle" :field="elt.texte"></prismic-rich-text>
      </div>
      <span class="abonnement__item__price">{{ elt.price }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()


const splitedText = (text: string) => { // may be utils everywhere
  return text.replaceAll('\n', '<br>')
}

</script>
<style scoped lang="sass">
.abonnement
  position: relative
  width: 100%

  &__item
    width: 100%
    padding: 3rem 3rem 3rem 40px // TODO: Real spacing -  based footer's padding
    position: relative
    color: $white
    height: 350px
    display: flex
    flex-direction: column
    justify-content: space-between

    &__cover
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
      z-index: -1

    &__top
      &__title
        @include h3(4.2rem, 100%)

      &__subtitle
        @include text()
        font-style: italic
        max-width: 600px
        margin-top: .7rem

    &__price
      @include title(4rem)
      position: absolute
      bottom: 1rem
      right: 2rem
      color: $red
      float: right
      text-align: right


</style>
