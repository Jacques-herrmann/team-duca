<template>
  <footer class="footer">
    <span class="footer__title">{{footer?.data.titre}}</span>
    <span class="footer__text">{{footer?.data.email}}</span>
  </footer>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();
const locale = route.params.locale;

const {data: footer } = useAsyncData("[footer]", () => prismic.client.getSingle('footer'))

</script>

<style scoped lang="sass">

.footer
  height: 200px
  width: 100%
  background-color: $primary
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 40px
  &__title
    color: $text
    font-size: 20px
    font-weight: bold
  &__text
    color: $text
    font-size: 14px
    font-weight: bold
</style>
