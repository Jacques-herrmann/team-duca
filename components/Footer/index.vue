<template>
  <footer class="footer">
    <span class="footer__title">{{footer?.data.titre}}</span>
    <span class="footer__text">{{footer?.data.email}}</span>
    <span class="footer__background">DUCA</span>
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
  position: relative
  height: 20vw
  width: 100%
  background-color: $black
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 40px
  &__title
    color: $white
    font-size: 20px
    font-weight: bold
  &__text
    color: $white
    font-size: 14px
    font-weight: bold

  &__background
    @include h1(30vw)
    position: absolute
    left: 50%
    bottom: -50%
    transform: translateX(-50%)
    color: rgba(255, 255, 255, 0.02)
</style>
