<template>
  <header class="header">
    <!--    <Logo class="header__logo" @click="toHome"/>-->
    <div class="header__burger" @click="toggleMenu">
      <svg width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 2L2 2" stroke="#F9F9F9" stroke-width="4" stroke-linecap="round"/>
        <path d="M36 14L2 14" stroke="#F9F9F9" stroke-width="4" stroke-linecap="round"/>
        <path d="M36 27L2 27" stroke="#F9F9F9" stroke-width="4" stroke-linecap="round"/>
      </svg>
    </div>
    <ul class="header__menu" ref="menu">
      <li class="header__menu-item" v-for="item in header?.data.pages" :key="item.id">
        <nuxt-link
          @click.native="onClose(`${item.url ?`/${item.url}`: '/'}`)"
          :to="`${item.url ?`/${item.url}`: '/'}`"
        >
          <span class="header__menu-item--letter" v-for="l in item.titre">{{ l }}</span>
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>
<script setup>
import A from '@/assets/animations'
import gsap from "gsap";

const prismic = usePrismic();
const route = useRoute();
const store = useIndexStore();
// console.log(route)
const locale = 'fr';

const {data: header} = await useAsyncData("header", () => prismic.client.getSingle('header'))
// console.log(header)
// const header = ref(null)

const isMobile = computed(() => store.isMobile)
const menu = ref(null)
const isOpen = ref(false)
let tl

const toHome = () => {
  navigateTo(`/`)
}

const toggleMenu = () => {
  if (isOpen.value) {
    onClose(route.path)
  } else {
    onOpen()
  }
}

const onOpen = () => {
  isOpen.value = true
  tl.timeScale(1).play()
}

const onClose = (path, d = 1000) => {
  if (path === route.path) {
    d = 0
  }
  setTimeout(() => {
    tl.timeScale(2).reverse()
    isOpen.value = false
  }, d)
}

const onResize = () => {
  // tl = gsap.timeline({paused: true})
  // console.log(isMobile.value)
  if (!isMobile.value) {
    gsap.to(menu.value, {
      height: '100%',
      duration: 0.4,
      ease: 'power2.out'
    })
    const listeElement = menu.value.querySelectorAll('.header__menu-item')
    listeElement.forEach((element, index) => {
      gsap.to(element.querySelectorAll('.header__menu-item--letter'), {
        y: 0,
        rotateZ: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, 0.1 + index * 0.05)
    })
  } else {
    gsap.to(menu.value, {
      height: '0',
      duration: 0.4,
      ease: 'power2.out'
    })
  }
}

onMounted(() => {
  tl = gsap.timeline({paused: true})
  if (isMobile.value) {
    tl.from(menu.value, {
      height: '0',
      duration: 0.4,
      ease: 'power2.out'
    })
    // tl.set(menu.value.querySelector('div'), {opacity: 1}, 0.1)
    const listeElement = menu.value.querySelectorAll('.header__menu-item')
    listeElement.forEach((element, index) => {
      tl.from(element.querySelectorAll('.header__menu-item--letter'), A.h2, 0.1 + index * 0.05)
    })
  }
  window.addEventListener('resize', onResize)
})

</script>

<style scoped lang="sass">

.header
  position: fixed
  top: 0
  left: 0
  height: $header-height
  width: 100vw
  padding: 0 90px
  z-index: $z-header
  @include lg
    background: $gradient
    height: 80px

  &__burger
    position: absolute
    right: 20px
    top: 20px
    z-index: 2
    @include lg
      display: none

  &__logo
    position: absolute
    left: 14px
    top: 10px
    height: 60px
    width: 60px
    cursor: pointer
    pointer-events: all
    opacity: 0
    @include lg
      opacity: 1


  &__menu
    position: fixed
    top: 0
    right: 0
    width: 100%
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)
    background-color: $black
    flex-direction: column
    justify-content: center
    display: flex
    overflow: hidden

    @include lg
      position: absolute
      background-color: transparent
      top: 0
      right: 90px
      align-items: center
      flex-direction: row
      height: 100%
      width: unset
      //margin-right: 20px
      gap: 10px


    &-item
      @include title(8vw)
      text-transform: uppercase
      color: $white
      text-decoration: none
      user-select: none
      cursor: pointer
      transition: color 0.2s ease-in-out
      margin-left: 60px

      &:not(:last-child)
        margin-bottom: 30px
        @include lg
          margin-bottom: 0

      &:hover
        color: $red

      .router-link-active
        color: $red

      &--letter
        display: inline-block
        white-space: pre
        will-change: transform

      @include lg
        @include text(0.8rem)
        //letter-spacing: unset
        margin-left: 2vw
        &:not(:last-child)
          margin-bottom: 0
          margin-right: 30px


</style>
<style lang="sass">
.header__menu-item > a
  overflow: hidden
  display: block

</style>