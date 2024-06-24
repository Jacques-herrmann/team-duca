<template>
  <div class="afc-page" ref="root">
    <div class="afc-page__cover">
      <figure-element class="afc-page__cover-bg" :image="afcPage?.data.cover"/>
      <h1 class="afc-page__title">
        <span class="afc-page__title--letter" v-for="l in afcPage?.data.titre">{{ l }}</span>
      </h1>
      <prismic-rich-text class="afc-page__text" :field="afcPage?.data.text"/>
      <transition name="fade">
        <IconArrowDown v-if="iconVisible" class="icon-arrow-down"/>
      </transition>
    </div>
    <BlocksCard title="carte préliminaire" :fights="afcPage?.data.prelim"/>
    <BlocksCard title="carte principale" :fights="afcPage?.data.main"/>
    <BlocksCard title="nos partenaires" :fights="afcPage?.data.main"/>
  </div>
</template>
<script lang="ts" setup>

import gsap from "gsap";
import A from "assets/animations";
import Timeline = gsap.core.Timeline;

const prismic = usePrismic();
const store = useIndexStore();
const page = usePage();
const config = useRuntimeConfig();

const {data: afcPage} = await useAsyncData("afc", () => prismic.client.getSingle('afc'))

useSeoMeta({
  title: 'ALPHA FIGHT CHAMPOINSHIP',
  ogTitle: 'ALPHA FIGHT CHAMPOINSHIP',
  twitterTitle: 'ALPHA FIGHT CHAMPOINSHIP',
  description: '',
  ogDescription: '',
  twitterDescription: '',
  ogImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterCard: 'summary_large_image',
})

const root = ref<HTMLElement | null>(null)

const isMobile = computed(() => store.isMobile)
const iconVisible = computed(() => store.scroll?.scroll <= 0)
let tl = <Timeline | null>null

watch(() => store.isTransitionVisible, (value) => {
  if (!value) {
    setTimeout(() => {
      tl?.play()
    }, 280)
  }
})

onMounted(async () => {
  tl = gsap.timeline({paused: true})
  tl.from(root.value?.querySelectorAll('.afc-page__title--letter') as NodeListOf<HTMLElement>, A.title)
  tl.from(root.value?.querySelectorAll('.afc-page__text') as NodeListOf<HTMLElement>, A.opacity, 0.2)

  // console.log(token.value)
})
</script>

<style scoped lang="sass">
.afc-page
  &__cover
    position: relative
    width: 100%
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)

    &-bg
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      height: 100%
      opacity: 0.2

  &__title
    @include h1(12vw)
    font-weight: 900
    letter-spacing: 0.1rem
    padding-top: 14rem
    color: white
    text-align: center
    overflow: hidden

    & span
      display: inline-block
      white-space: pre
      will-change: transform

    @include lg
      @include h1()

  &__text
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

  & .icon-arrow-down
    position: absolute
    bottom: 20px
    left: 50%
    transform: translateX(-50%)
    z-index: 2


</style>
