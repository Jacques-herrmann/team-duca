<template>
  <div class="home-page">
    <blocks-list :blocks="homepage?.data.slices"></blocks-list>
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();
const page = usePage();

const {data: homepage } = useAsyncData("[home]", () => prismic.client.getSingle('home'))
console.log(homepage)

useHead({
  title: homepage.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: homepage.value?.data.meta_description,
    },
  ],
});
</script>

<style scoped lang="sass">
h1
  color: red
</style>
