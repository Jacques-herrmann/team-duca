<template>
  <div class="galerie-page">
    <blocks-list :blocks="page?.data.slices" />
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();

const {data: page } = useAsyncData("[galerie]", () => prismic.client.getSingle('galerie'))
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
.galerie-page
  min-height: 100vh
  width: 100%
</style>
