<template>
</template>
<script lang="ts" setup>

import {navigateTo} from "#app";
import {onMounted} from "vue";


definePageMeta({ layout: 'default' })

const fallbackLocale = 'fr'
const locales = ['fr']

onMounted(() => {
  const userLocale = navigator.language.split('-')[0]
  const locale = locales.includes(userLocale) ? userLocale : fallbackLocale

  navigateTo(`/${locale}`)
})

</script>

