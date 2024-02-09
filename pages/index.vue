<template>
  <div></div>
</template>
<script lang="ts" setup>


definePageMeta({layout: 'empty'})
useSeoMeta({
  title: 'SCIENCE DUCA - MMA MARSEILLE',
  ogTitle: 'SCIENCE DUCA - MMA MARSEILLE',
  twitterTitle: 'SCIENCE DUCA - MMA MARSEILLE',
  description: 'Bienvenue sur le site de la TEAM DUCA, club de MMA ! Retrouvez nous au 50 Avenue de la Timone 13010 Marseille. Rejoignez-nous pour apprendre les techniques de combat et améliorer votre condition physique.',
  ogDescription: 'Bienvenue sur le site de la TEAM DUCA, club de MMA ! Retrouvez nous au 50 Avenue de la Timone 13010 Marseille. Rejoignez-nous pour apprendre les techniques de combat et améliorer votre condition physique.',
  twitterDescription: 'Bienvenue sur le site de la TEAM DUCA, club de MMA ! Retrouvez nous au 50 Avenue de la Timone 13010 Marseille. Rejoignez-nous pour apprendre les techniques de combat et améliorer votre condition physique.',
  ogImage: '/meta.png',
  twitterImage: '/meta.png',
  twitterCard: 'summary_large_image',
})

const fallbackLocale = 'fr'
const locales = ['fr']

onMounted(() => {
  const userLocale = navigator.language.split('-')[0]
  const locale = locales.includes(userLocale) ? userLocale : fallbackLocale

  navigateTo(`/${locale}`)
})

</script>

