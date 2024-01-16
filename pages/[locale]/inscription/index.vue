<template>
  <div class="inscription-page" ref="root">
    <h1 class="inscription-page__title">
      <span class="inscription-page__title--letter" v-for="l in inscriptionPage?.data.titre">{{ l }}</span>
    </h1>
    <prismic-rich-text class="inscription-page__subtitle" :field="inscriptionPage?.data.texte"/>
    <blocks-list :blocks="inscriptionPage?.data.slices"></blocks-list>
  </div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import A from "@/assets/animations";

const prismic = usePrismic();
const store = useIndexStore();
const route = useRoute();
const page = usePage();


const {data: inscriptionPage } = useAsyncData("[inscription]", () => prismic.client.getSingle('inscription'))
console.log(inscriptionPage)

useHead({
  title: inscriptionPage.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: inscriptionPage.value?.data.meta_description,
    },
  ],
});

const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  rootMargin: '200px 0px -10px 0px',
})
const tl = gsap.timeline({ paused: true })

watch(() => store.isTransitionVisible, (value) => {
  if(!value) {
    setTimeout(() => {
      draw()
    }, 1000)
  }
})

const draw = () => {
  tl.play()
}

onMounted(() => {
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
      padding-top: 20rem

  &__subtitle
    @include text(4vw)
    color: $white
    text-align: center
    margin: 2rem auto 4rem auto
    max-width: 700px
    padding: 0 20px
    @include lg
      @include text()
      padding: 0
      margin: 2rem auto 8rem auto

</style>
