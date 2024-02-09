<template>
  <div class="galerie-page" ref="root">
    <h1 class="galerie-page__title">
      <span class="galerie-page__title--letter" v-for="l in galeriePage?.data.title">{{ l }}</span>
    </h1>
    <prismic-rich-text class="galerie-page__subtitle" :field="galeriePage?.data.content"/>
    <blocks-list :blocks="galeriePage?.data.slices"/>
  </div>
</template>
<script lang="ts" setup>

import gsap from "gsap";
import A from "assets/animations";
import Timeline = gsap.core.Timeline;

const prismic = usePrismic();
const store = useIndexStore();
const route = useRoute();
const page = usePage();

const {data: galeriePage} = await useAsyncData("galerie", () => prismic.client.getSingle('galerie'))

useSeoMeta({
  title: 'SCIENCE DUCA - ACTUALITES',
  ogTitle: 'LOCATION CAGE MMA MARSEILLE - ACTUALITES',
  twitterTitle: 'LOCATION CAGE MMA MARSEILLE - ACTUALITES',
  description: 'Restez à jour avec les dernières actualités de SCIENCE DUCA à Marseille.\nDécouvrez les événements à venir, les résultats des combats, les nouvelles recrues et plus encore.',
  ogDescription: 'Restez à jour avec les dernières actualités de SCIENCE DUCA à Marseille.\nDécouvrez les événements à venir, les résultats des combats, les nouvelles recrues et plus encore.',
  twitterDescription: 'Restez à jour avec les dernières actualités de SCIENCE DUCA à Marseille.\nDécouvrez les événements à venir, les résultats des combats, les nouvelles recrues et plus encore.',
  ogImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterCard: 'summary_large_image',
})


const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  rootMargin: '200px 0px -10px 0px',
})
let tl = <Timeline | null>null

watch(() => store.isTransitionVisible, (value) => {
  console.log(value)
  if (!value) {
    setTimeout(() => {
      draw()
    }, 1000)
  }
})

const draw = () => {
  tl?.play()
}

onMounted(() => {
  tl = gsap.timeline({paused: true})
  tl.from(root.value?.querySelectorAll('.galerie-page__title--letter') as NodeListOf<HTMLElement>, A.title)
  tl.from(root.value?.querySelectorAll('.galerie-page__subtitle') as NodeListOf<HTMLElement>, A.opacity, 0.2)
})
</script>

<style scoped lang="sass">
.galerie-page
  min-height: 100vh
  width: 100%

  &__title
    @include h1(16vw)
    font-weight: 900
    letter-spacing: 0.1rem
    padding-top: 12rem
    color: white
    text-align: center
    overflow: hidden

    & span
      display: inline-block
      white-space: pre
      will-change: transform

    @include lg
      @include h1()
  //padding-top: 20rem

  &__subtitle
    @include text(4vw)
    color: $white
    text-align: center
    margin: 2rem auto 4rem auto
    max-width: 900px
    padding: 0 40px
    @include lg
      @include text()
      padding: 0
      margin: 2rem auto 4rem auto

</style>
