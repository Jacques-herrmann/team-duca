<template>
  <div class="inscription-page">
    <h1 class="inscription-page__title">{{ inscriptionPage?.data.titre }}</h1>
    <prismic-rich-text class="inscription-page__subtitle" :field="inscriptionPage?.data.texte"/>
    <blocks-list :blocks="inscriptionPage?.data.slices"></blocks-list>
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
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
</script>

<style scoped lang="sass">
.inscription-page
  min-height: 100vh
  width: 100%

  &__title
    @include h1()
    font-weight: 900
    letter-spacing: 0.1rem
    padding-top: 12rem
    color: white
    text-align: center

  &__subtitle
    @include text()
    color: $white
    text-align: center
    margin: 2rem auto 8rem auto
    max-width: 700px

</style>
