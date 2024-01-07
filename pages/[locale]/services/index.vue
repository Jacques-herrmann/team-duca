<template>
  <div class="service-page">
    <div class="service-page__cover" @click="onVideoClick">
      <figure-element class="service-page__img" :image="servicePage?.data.cover"/>
      <IconPlay class="service-page__icon" />
    </div>
    <video-fullscreen v-if="visible" :video="servicePage?.data.video"/>
    <h1 class="service-page__title">{{servicePage?.data.title}}</h1>
    <div class="service-page__right">
      <prismic-rich-text class="service-page__content" :field="servicePage?.data.content"></prismic-rich-text>
      <CTA class="service-page__right__cta" :text="servicePage?.data.cta_text" :url="servicePage?.data.cta_link" :is-nuxt-link="true"/>
    </div>
  </div>
</template>
<script lang="ts" setup>

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

const visible = computed(() => store.isFullscreenVisible)


const onVideoClick = () => {
  store.isFullscreenVisible = true
}
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
    position: absolute
    top: 160px
    left: 45%
    font-weight: 800
    color: $white

  &__right
    width: 45%
    margin-top: 14rem
    padding: 0 45px
    display: flex
    flex-direction: column
    justify-content: flex-end
    @include text()
    &__cta
      margin-top: 100px
      align-self: end

  &__cover
    position: relative
    width: 55%
    height: 100vh
    margin-bottom: 2rem
    cursor: pointer
    overflow: hidden
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

  &__content
    color: $white
    ::v-deep(ul)
      list-style: disc
      margin-top: 40px
      li
        margin-left: 1rem




</style>
