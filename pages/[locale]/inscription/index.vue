<template>
  <div class="inscription-page">
    <h1>Inscription</h1>
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();

const {data: page } = useAsyncData("[inscription]", () => prismic.client.getSingle('inscription'))
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
.inscription-page
  min-height: 100vh
  width: 100%

h1
  color: red
</style>
