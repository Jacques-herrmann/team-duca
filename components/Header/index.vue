<template>
  <header class="header">
    <Logo class="header__logo" @click="toHome" />
    <div class="header__burger" @click="toggleNav">
      <svg width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 2L2 2" stroke="#F9F9F9" stroke-width="4" stroke-linecap="round"/>
        <path d="M36 14L2 14" stroke="#F9F9F9" stroke-width="4" stroke-linecap="round"/>
        <path d="M36 27L2 27" stroke="#F9F9F9" stroke-width="4" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="header__menu" ref="menu">
      <div class="header__menu-item" v-for="item in header?.data.pages" :key="item.id">
        <nuxt-link @click.native="toggleNav" :to="`/${locale}${item.url ?`/${item.url}`: ''}`">{{ item.titre }}</nuxt-link>
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

const menu = ref(null)

const toHome = () => {
 navigateTo(`/${locale}`)
}

const toggleNav = () => {
  // TODO: Better than this
  // resolve resize issue
  if(window.innerWidth > 768) return
  document.body.style.display = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden'
  menu.value.style.display = menu.value.style.display === 'flex' ? 'none' : 'flex'
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
  background: $gradient
  padding: 0 90px
  &__burger
    position: absolute
    right: 40px
    top: calc( 40px + (50px / 2))
    z-index: 2
    @include md
      display: none

  &__logo
    position: absolute
    left: 40px
    top: 40px
    height: 100px
    width: 100px
    cursor: pointer
    pointer-events: all


  &__menu
    position: fixed
    top: 0
    right: 0
    width: 100%
    height: 100vh
    background-color: $black
    flex-direction: column
    justify-content: center
    display: none

    @include md
      display: flex
      position: absolute
      background-color: transparent
      top: 0
      right: 40px
      align-items: center
      flex-direction: row
      height: 100%
      width: unset
      margin-right: 20px


    &-item
      @include text(0.8rem)
      text-transform: uppercase
      color: $white
      text-decoration: none
      user-select: none
      cursor: pointer
      transition: color 0.2s ease-in-out
      margin-left: 60px
      &:not(:last-child)
        margin-bottom: 40px
        @include md
          margin-bottom: 0


      &:hover
        color: $red
      .router-link-active
          color: $red
</style>
