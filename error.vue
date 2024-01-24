<template>
  <div class="error-page" ref="root">
    <h1>404</h1>
    <div class="error-page__inner">
      <NuxtLink :to="`/${locale}`">Return to home</NuxtLink>
    </div>
  </div>
</template>
<script>

import {useIndexStore} from "@/stores/index";

export default {
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

  & h1
    @include title(3.8rem)
    text-align: center
    padding: 6rem 0
    @include lg
      padding: 3rem

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