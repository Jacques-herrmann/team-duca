<template>
  <div class="abonnement">
    <h1 class="abonnement__title">{{ block.primary.titre }}</h1>
    <p class="abonnement__subtitle">{{block.primary.soutitre}}</p>
    <prismic-rich-text :field="block.primary.soustitre" v-if="false" /><!-- prismic fiels is not of this type -->
    <div class="abonnement__item" v-for="elt in block.items">
      <figure-element :image="elt.cover" class="abonnement__item__cover"/>
      <div class="abonnement__item__top ">
        <h3 class="abonnement__item__top__title"> {{ elt.title }} </h3>
        <p class="abonnement__item__top__subtitle">{{ elt.texte }}</p>
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

onMounted(() => {
  console.log(props.block)
})

</script>
<style scoped lang="sass">
.abonnement
  position: relative
  width: 100%
  padding-top: 30rem

  // The heading styles may be defined in a global file
  // because they are used in many places
  &__title
    @include h1()
    color: white
    text-align: center
  &__subtitle
    @include text()
    color: $white
    text-align: center
    margin: 10px auto 100px auto
    max-width: 500px


  &__item
    width: 100%
    padding: 3rem 3rem 3rem 40px // TODO: Real spacing -  based footer's padding
    position: relative
    color: $white
    height: 300px
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
        @include h3()

      &__subtitle
        @include text()
        margin-top: .7rem

    &__price
      @include title(4rem)
      color: $red
      float: right
      text-align: right


</style>
