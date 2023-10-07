<template>
  <div>
    <h1>Services</h1>
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
h1
  color: red
</style>
