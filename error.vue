<template>
  <div class="error-page" ref="root">
    <GridBackground/>
    <h1 class="error-page__title">
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </h1>
    <CTA class="error-page__cta" :text="`Retour à l'entrainement`" :url="`/fr`" :is-nuxt-link="true"/>
  </div>
</template>
<script>

import {useIndexStore} from "@/stores/index";
import gsap from "gsap";
import PageTransition from "~/components/PageTransition/index.vue";


export default {
  components: {PageTransition},
  head() {
    return {
      title: '404',
    }
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  setup() {
    const root = ref(null)
    const store = useIndexStore();
    const locale = computed(() => store.getLocale)

    let tl = null

    watch(() => store.isTransitionVisible, (value) => {
      if (!value) {
        setTimeout(() => {
          draw()
        }, 1000)
      }
    }, {immediate: true})

    const draw = () => {
      tl = gsap.timeline({paused: true})
      tl?.to(root.value?.querySelectorAll('.error-page__title > span'), {
        duration: 0.4,
        y: 0,
        rotateZ: 0,
        stagger: 0.022,
        ease: 'power2.out'
      })
      tl?.to(root.value?.querySelector('.error-page__cta'), {
        duration: 0.4,
        opacity: 1,
        ease: 'linear'
      }, 0.4)

      tl?.play()
    }

    return {
      root,
      locale
    }
  }
}

</script>

<style scoped lang="sass">
.error-page
  max-width: 100vw
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  &__title
    @include h1(20vw, 85%)
    font-weight: 800 !important
    text-align: left
    color: $white
    pointer-events: none
    overflow: hidden
    display: block

    & > span
      display: inline-block
      white-space: pre
      will-change: transform
      transform: translateY(105%) rotateZ(10deg)

  &__cta
    opacity: 0
    margin-top: 40px

    & ::deep(.cta__link)
      font-size: 1.4rem !important

  &__inner
    height: 300px
    width: 100%
    opacity: 0
    y: 20px

    & a
      @include title()
      display: block
      text-align: center
      color: white
      text-decoration: none


</style>