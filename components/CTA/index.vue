<template>
  <div class="cta">
    <NuxtLink v-if="isNuxtLink" :to="`/${locale}${url}`" class="cta__link">
      {{ text }}
    </NuxtLink>
    <a v-else :href="text" class="cta__link">
      {{ text }}
    </a>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  text: string,
  url: string,
  isNuxtLink: boolean,
}>()

const route = useRoute()
const locale = route.params.locale

</script>
<style scoped lang="sass">
.cta
  background-color: $white
  height: 30px
  width: 120px
  &__link
    color: red
    text-decoration: none
    &:hover
      text-decoration: underline
</style>