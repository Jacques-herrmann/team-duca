<template>
  <div class="service-page" ref="root">
    <figure-element class="service-page__cover" :image="servicePage?.data.cover"></figure-element>
    <h1 class="service-page__title">
      <div v-for="t in title"><span>{{t}}</span></div>
    </h1>
    <div class="service-page__right">
      <prismic-rich-text class="service-page__content" :field="servicePage?.data.content"></prismic-rich-text>
      <CTA class="service-page__right__cta" :text="servicePage?.data.cta_text" :url="servicePage?.data.cta_link" :is-nuxt-link="true"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import A from '@/assets/animations'
import gsap from 'gsap'

const prismic = usePrismic();
const store = useIndexStore();
const page = usePage();

const {data: servicePage } = useAsyncData("[services]", () => prismic.client.getSingle('services'))
console.log(servicePage)

useHead({
  title: servicePage.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: servicePage.value?.data.meta_description,
    },
  ],
});

const root = ref<HTMLElement | null>(null)
const title = computed(() => servicePage.value?.data.title.split('\n'))
const tl = gsap.timeline({paused: true})

watch(() => store.isTransitionVisible, (value) => {
  if(!value) {
    setTimeout(() => {
      tl.play()
    }, 280)
  }
})


onMounted(() => {
  tl.from(root.value?.querySelectorAll(".service-page__cover") as NodeList, A.imageWidth, 0)
  tl.from(root.value?.querySelectorAll(".service-page__title span") as NodeList, A.h2, 0.4)
  tl.from(root.value?.querySelectorAll(".service-page__content") as NodeList, A.opacity, 0.6)
  tl.from(root.value?.querySelectorAll(".service-page__cta") as NodeList, A.opacity, 0.8)

})
</script>

<style scoped lang="sass">
.service-page
  position: relative
  min-height: 100vh
  width: 100%
  display: flex
  align-items: center
  justify-content: center

  &__title
    @include h1()
    height: 6.1rem
    position: absolute
    top: 100px
    left: 45%
    font-weight: 800
    color: $white
    & > div
      overflow: hidden
    & span
      display: inline-block

  &__right
    width: 45%
    margin-top: 18rem
    padding: 0 45px
    display: flex
    flex-direction: column
    justify-content: flex-end
    @include text()
    &__cta
      margin-top: 60px
      align-self: end

  &__cover
    width: 55%
    height: 100vh
    object-fit: cover
    object-position: center
    margin-bottom: 2rem

  &__content
    color: $white
    ::v-deep(ul)
      list-style: disc
      margin-top: 40px
      li
        margin-left: 1rem




</style>
