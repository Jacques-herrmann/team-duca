<template>
  <div class="abonnement">
    <BlocksAbonnementElement
     class="abonnement__item"
     v-for="elt in block.items"
     :key="elt.id"
     :cover="elt.cover"
     :title="elt.title"
     :texte="elt.texte"
     :price="elt.price"
    />
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

</style>
