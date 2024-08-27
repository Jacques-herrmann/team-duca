<template>
  <div class="inscription-page" ref="root">
    <h1 class="inscription-page__title">
      <span class="inscription-page__title--letter" v-for="l in inscriptionPage?.data.titre">{{ l }}</span>
    </h1>
    <prismic-rich-text class="inscription-page__subtitle" :field="inscriptionPage?.data.texte"/>
    <!--    <CTA-->
    <!--        class="inscription-page__cta"-->
    <!--        :text="inscriptionPage?.data.cta_text"-->
    <!--        @click="onDownload(inscriptionPage?.data.cta_url.url)"-->
    <!--    />-->
    <blocks-list :blocks="inscriptionPage?.data.slices"></blocks-list>
  </div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import A from "@/assets/animations";
import Timeline = gsap.core.Timeline;

const prismic = usePrismic();
const store = useIndexStore();
const route = useRoute();
const page = usePage();


const {data: inscriptionPage} = await useAsyncData("inscription", () => prismic.client.getSingle('inscription'))

useSeoMeta({
  title: 'SCIENCE DUCA - INSCRIPTION',
  ogTitle: 'SCIENCE DUCA - INSCRIPTION',
  twitterTitle: 'SCIENCE DUCA - INSCRIPTION',
  description: 'Rejoignez la TEAM SCIENCE DUCA, club de MMA à Marseille la Capelette !\nDécouvrez nos programmes d\'entraînement, nos instructeurs qualifiés et nos installations modernes.',
  ogDescription: 'Rejoignez la TEAM SCIENCE DUCA, club de MMA à Marseille la Capelette !\nDécouvrez nos programmes d\'entraînement, nos instructeurs qualifiés et nos installations modernes.',
  twitterDescription: 'Rejoignez la TEAM SCIENCE DUCA, club de MMA à Marseille la Capelette !\nDécouvrez nos programmes d\'entraînement, nos instructeurs qualifiés et nos installations modernes.',
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
  if (!value) {
    setTimeout(() => {
      draw()
    }, 1000)
  }
})

const draw = () => {
  tl?.play()
}

const onDownload = (url) => {
  window.open(url, '_blank');
}

onMounted(() => {
  tl = gsap.timeline({paused: true})
  tl.from(root.value?.querySelectorAll('.inscription-page__title--letter') as NodeListOf<HTMLElement>, A.title)
  tl.from(root.value?.querySelectorAll('.inscription-page__subtitle') as NodeListOf<HTMLElement>, A.opacity, 0.2)
})

</script>

<style scoped lang="sass">
.inscription-page
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
    margin: 2rem auto 2rem auto
    max-width: 900px
    padding: 0 20px
    @include lg
      @include text()
      padding: 0
      margin: 2rem auto 4rem auto

  &__cta
    margin: 0 auto 4rem auto
    @include lg
      margin: 0 auto 8rem auto

</style>
<style lang="sass">
.inscription-page__subtitle
  strong
    color: rgb(120, 120, 120)
    font-weight: bold
    font-size: 1rem
    @include lg
      font-size: 1.2rem

  p
    margin-top: 1rem
    margin-bottom: 1rem

  a
    color: $red
    text-decoration: underline

    &:hover
      text-decoration: none
</style>