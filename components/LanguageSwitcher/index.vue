<template>
  <div class="lang-switcher">
    <nuxt-link
        class="lang-switcher__item"
        :class="{ 'lang-switcher__item--active': locale === 'fr' }"
        :to="switchLocalePath('fr')"
    >FR
    </nuxt-link>
    <span class="lang-switcher__sep">|</span>
    <nuxt-link
        class="lang-switcher__item"
        :class="{ 'lang-switcher__item--active': locale === 'en' }"
        :to="switchLocalePath('en')"
    >EN
    </nuxt-link>
  </div>
</template>
<script setup>
const {locale} = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>
<style scoped lang="sass">
.lang-switcher
  display: flex
  align-items: center
  gap: 0.5rem

  &__item
    @include text(0.75rem)
    color: rgba($white, 0.4)
    text-decoration: none
    letter-spacing: 0.1em
    transition: color 0.2s ease

    &:hover
      color: $white

    &--active
      color: $white

  &__sep
    @include text(0.75rem)
    color: rgba($white, 0.2)
</style>
