<template>
  <div class="block" v-for="b in blocks">
    <component :is="components[b.slice_type]" :block="b"></component>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps<{
  blocks: any[]
}>()

const components = {
  'hero': resolveComponent('BlocksHero'),
  'gallery': resolveComponent('BlocksGallery'),
  'presentation_club': resolveComponent('BlocksPresentationClub'),
  'keys_facts': resolveComponent('BlocksKeyFacts'),
  'sponsors': resolveComponent('BlocksSponsors'),
  'join_us': resolveComponent('BlocksJoinUs'),
  'carousel': resolveComponent('BlocksSlider'),
  'historique': resolveComponent('BlocksHistorique'),
  'abonnement': resolveComponent('BlocksAbonnement'),
  'calendar': resolveComponent('BlocksCalendar'),
  'article': resolveComponent('BlocksArticle'),
}
</script>

<style scoped lang="sass">
.block
  position: relative
  @include lg
    margin: 6rem 0

  &:first-child
    margin-top: 0

  &:last-child
    margin-bottom: 0
</style>