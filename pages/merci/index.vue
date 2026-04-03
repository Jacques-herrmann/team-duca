<template>
  <main class="merci-page">
    <div class="merci-page__inner">
      <span class="merci-page__icon">✓</span>
      <h1 class="merci-page__title">Merci !</h1>
      <p class="merci-page__text">{{ $t('merci.text') }}</p>
      <nuxt-link :to="localePath('/')" class="btn-outline">
        {{ $t('merci.cta') }}
      </nuxt-link>
    </div>
  </main>
</template>

<script setup>
const localePath = useLocalePath()
useHead({ title: 'Merci — Science DUCA' })
</script>

<style scoped lang="sass">
.merci-page
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center
  padding: $spacing-xl $spacing-md

.merci-page__inner
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  gap: $spacing-md
  max-width: 480px

.merci-page__icon
  @include title(5rem)
  color: $red
  line-height: 1

.merci-page__title
  @include title(clamp(4rem, 10vw, 9rem))
  color: $white
  margin: 0

.merci-page__text
  @include text(1rem)
  color: rgba($white, 0.65)
  margin: 0
  line-height: 1.8

.btn-outline
  @include stamp(0.65rem)
  padding: 0.9rem 2rem
  border: 1px solid rgba($white, 0.3)
  color: rgba($white, 0.7)
  text-decoration: none
  transition: all 0.2s ease
  margin-top: $spacing-sm

  &:hover
    border-color: $white
    color: $white
</style>
