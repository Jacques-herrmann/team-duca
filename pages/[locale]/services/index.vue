<template>
  <div class="service-page" ref="root">
    <div class="service-page__cover" @click="onVideoClick">
      <figure-element class="service-page__img" :image="servicePage?.data.cover"/>
      <IconPlay class="service-page__icon" />
    </div>
    <video-fullscreen v-if="visible" :video="servicePage?.data.video"/>
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
const route = useRoute();
const page = usePage();
const store = useIndexStore()

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
const visible = computed(() => store.isFullscreenVisible)
const title = computed(() => servicePage.value?.data.title.split('\n'))
const tl = gsap.timeline({paused: true})


const onVideoClick = () => {
  store.isFullscreenVisible = true
}

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
  flex-direction: column
  @include lg
    flex-direction: row

  &__title
    @include h1(16vw)
    height: 6.1rem
    position: absolute
    top: 60px
    left: 45px
    font-weight: 800
    color: $white
    & > div
      overflow: hidden
    & span
      display: inline-block

    @include lg
      top: 100px
      left: 45%
      @include h1()


  &__right
    width: 100%
    height: 50vh
    padding: 35px
    display: flex
    flex-direction: column

    @include text()

    @include lg
      padding: 0 45px
      margin-top: 18rem
      width: 45%
      justify-content: flex-end

    &__cta
      margin-top: 30px
      align-self: end
      @include lg
        margin-top: 60px

  &__cover
    position: relative
    width: 100%
    height: 50vh
    cursor: pointer
    overflow: hidden
    @include lg
      width: 55%
      height: 100vh
      margin-bottom: 2rem

    &:hover
      & .service-page__icon
        opacity: 1

      & .service-page__img
        transform: scale(1.02)

  &__img
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
    transition: transform 0.6s ease-out

  &__icon
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    height: 70px
    width: 70px
    opacity: 0.8
    transition: opacity 0.6s ease-out

  &__content
    color: $white
    ::v-deep(ul)
      list-style: disc
      margin-top: 40px
      li
        margin-left: 1rem




</style>
