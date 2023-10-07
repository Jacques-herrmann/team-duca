<template>
  <header class="header">
    <img class="header__logo" :src="header?.data.logo.url" :alt="header?.data.logo.alt" @click="toHome">
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
  z-index: 100
  height: $header-height
  width: 100%
  background-color: $primary
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 40px

  &__logo
    height: 100%
    display: block
    object-fit: contain
    cursor: pointer
    pointer-events: all

  &__menu
    display: flex
    align-items: center
    height: 100%
    margin-left: 20px

    &-item
      margin-left: 20px
      font-size: 1.5rem
      font-weight: 600
      color: $text
      text-decoration: none
      cursor: pointer
      transition: color 0.2s ease-in-out

      &:hover
        color: $text-hover
</style>
