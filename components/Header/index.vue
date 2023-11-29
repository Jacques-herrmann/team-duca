<template>
  <header class="header">
    <Logo class="header__logo" @click="toHome" />
    <div class="header__menu">
      <div class="header__menu-item" v-for="item in header?.data.pages" :key="item.id">
        <nuxt-link :to="`/${locale}${item.url ?`/${item.url}`: ''}`">{{ item.titre }}</nuxt-link>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();
console.log(route)
const locale = 'fr';

const {data: header } = useAsyncData("[header]", () => prismic.client.getSingle('header'))
console.log(header)

const toHome = () => {
 navigateTo(`/${locale}`)
}

</script>

<style scoped lang="sass">

.header
  position: fixed
  top: 0
  left: 0
  z-index: $z-header
  height: $header-height
  width: 100%
  //background-color: $black
  padding: 0 90px

  &__logo
    position: absolute
    left: 40px
    top: 40px
    height: 100px
    width: 100px
    cursor: pointer
    pointer-events: all

  &__menu
    position: absolute
    top: 0
    right: 40px
    display: flex
    align-items: center
    height: 100%
    margin-right: 20px

    &-item
      @include text()
      text-transform: uppercase
      margin-left: 60px
      color: $white
      text-decoration: none
      cursor: pointer
      transition: color 0.2s ease-in-out

      &:hover
        color: $red
      .router-link-active
          color: $red
</style>
