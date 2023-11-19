<template>
  <div class="abonnement">
    <h1>{{ block.primary.sous_titre }}</h1>
    <prismic-rich-text :field="block.primary.texte" />
    <div class="abonnement__item" v-for="elt in block.items">
      <figure-element :image="elt.cover" />
      <h3> {{ elt.title }} </h3>
      <p>{{ elt.texte }}</p>
      <span class="abonnement__price">{{ elt.price }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()

</script>
<style scoped lang="sass">
.abonnement
  position: relative
  width: 100%
  padding-top: 50rem

  &__item
    width: 100%
    color: $white

    & h3
      @include h3()
      position: absolute

    & p
      @include text()
      position: absolute

  &__price
    @include title(4rem)
    position: absolute
    color: $red


</style>