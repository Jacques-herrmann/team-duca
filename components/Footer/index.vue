<template>
  <footer class="footer">
    <div class="footer__left">
      <span class="footer__title">{{footer?.data.titre}}</span>
      <span class="footer__subtitle">{{footer?.data.subtitle}}</span>
    </div>
    <div class="footer__right">
      <prismic-rich-text class="footer__address" :field="footer?.data.address"></prismic-rich-text>
      <div class="footer__socials">
        <IconFacebook class="footer__icon" />
        <IconInstagram class="footer__icon" />
      </div>
    </div>
    <span class="footer__background">TEAM DUCA</span>
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
  height: 85vw
  width: 100%
  background-color: $black
  display: flex
  align-items: center
  justify-content: space-between
  flex-direction: column
  padding: 0 4rem
  @include lg
    height: 20vw
    flex-direction: row

  &__left, &__right
    display: flex
    flex-direction: column
    justify-content: center
    text-align: center
    @include lg
      text-align: left

  &__left
    margin-bottom: 4rem
    @include lg
      margin-bottom: 0

  &__right
    margin-bottom: 2rem
    @include lg
      margin-bottom: 0

  &__title
    @include h3()
    font-weight: 900
    letter-spacing: 0.1rem
    color: $white

  &__subtitle
    @include text()
    font-weight: 900
    letter-spacing: 0.1rem
    color: $red

  &__address
    @include text()
    color: $white
    text-align: center
    @include lg
      text-align: right

  &__socials
    display: flex
    align-items: center
    justify-content: center
    gap: 0.5rem
    margin-top: 0.5rem
    @include lg
      justify-content: flex-end

  &__icon
    width: 1.5rem
    height: 1.5rem
    fill: $white
    cursor: pointer


  &__text
    color: $white
    font-size: 14px
    font-weight: bold

  &__background
    @include h1(32vw)
    font-weight: 800
    width: 200vw

    text-align: center
    word-break: keep-all
    user-select: none
    pointer-events: none
    color: rgba(255, 255, 255, 0.01)
    @include lg
      position: absolute
      left: 50%
      bottom: -50%
      transform: translateX(-50%)
</style>
