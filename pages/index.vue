<template>
  <div class="home-page">
    <blocks-list :blocks="homepage?.data.slices"></blocks-list>
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const page = usePage();

const {data: homepage} = useAsyncData("home", () => prismic.client.getSingle('home'))

useSeoMeta({
  title: 'SCIENCE DUCA - MMA MARSEILLE',
  ogTitle: 'SCIENCE DUCA - MMA MARSEILLE',
  twitterTitle: 'SCIENCE DUCA - MMA MARSEILLE',
  description: 'Bienvenue sur le site de la TEAM SCIENCE DUCA, club de MMA !\nRetrouvez nous au 50 Avenue de la Timone 13010 Marseille.\nRejoignez-nous pour apprendre les techniques de combat et améliorer votre condition physique.',
  ogDescription: 'Bienvenue sur le site de la TEAM SCIENCE DUCA, club de MMA !\nRetrouvez nous au 50 Avenue de la Timone 13010 Marseille.\nRejoignez-nous pour apprendre les techniques de combat et améliorer votre condition physique.',
  twitterDescription: 'Bienvenue sur le site de la TEAM SCIENCE DUCA, club de MMA !\nRetrouvez nous au 50 Avenue de la Timone 13010 Marseille.\nRejoignez-nous pour apprendre les techniques de combat et améliorer votre condition physique.',
  ogImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterCard: 'summary_large_image',
})

</script>

<style scoped lang="sass">
h1
  color: red
</style>
