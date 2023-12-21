<template>
  <div class="galerie-page">
    <blocks-list :blocks="galeriePage?.data.slices" />
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();
const page = usePage();

const {data: galeriePage } = useAsyncData("[galerie]", () => prismic.client.getSingle('galerie'))
console.log(galeriePage)

useHead({
  title: galeriePage.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: galeriePage.value?.data.meta_description,
    },
  ],
});
</script>

<style scoped lang="sass">
.galerie-page
  min-height: 100vh
  width: 100%
</style>
