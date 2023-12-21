<template>
  <div class="service-page">
    <figure-element class="service-page__cover" :image="servicePage?.data.cover"></figure-element>
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
    margin: 0 auto
    max-width: 400px
    background-color: rgba(255, 0, 0, 0.27)
    display: flex
    flex-direction: column
    @include text()
    &__cta
      margin-top: 100px
      align-self: flex-end


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
