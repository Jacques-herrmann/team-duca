<template>
  <div class="home-page">
    <blocks-list :blocks="homepage?.data.slices"></blocks-list>
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();
const page = usePage();

const {data: homepage} = useAsyncData("home", () => prismic.client.getSingle('home'))

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

</script>

<style scoped lang="sass">
h1
  color: red
</style>
