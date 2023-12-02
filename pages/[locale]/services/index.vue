<template>
  <div class="service-page">
    <figure-element class="service-page__cover" :image="page?.data.cover"></figure-element>
    <h1 class="service-page__title">{{page?.data.title}}</h1>
    <div class="service-page__right">
      <prismic-rich-text class="service-page__content" :field="page?.data.content"></prismic-rich-text>
      <CTA class="service-page__cta" :text="page?.data.cta_text" :url="page?.data.cta_link" :is-nuxt-link="true"/>
    </div>
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();

const {data: page } = useAsyncData("[services]", () => prismic.client.getSingle('services'))
console.log(page)

useHead({
  title: page.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: page.value?.data.meta_description,
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
    display: flex
    flex-direction: column

  &__cover
    width: 55%
    height: 100vh
    object-fit: cover
    object-position: center
    margin-bottom: 2rem

  &__content
    color: $white


</style>
