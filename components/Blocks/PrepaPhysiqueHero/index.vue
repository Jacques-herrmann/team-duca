<template>
  <div class="prepa-hero">
    <span class="section__label">{{ $t('prepa.label') }}</span>
    <h1 class="prepa-hero__title">{{ $t('prepa.title') }}</h1>
    <p class="prepa-hero__subtitle">{{ $t('prepa.subtitle') }}</p>
    <a href="#programmes" class="btn-outline">{{ $t('prepa.cta.anchor') }}</a>
  </div>
</template>

<script setup>
</script>

<style scoped lang="sass">
.prepa-hero
  padding: $spacing-xl $spacing-md
  border-bottom: 1px solid rgba($white, 0.06)
  display: flex
  flex-direction: column
  gap: $spacing-md

  @include lg
    padding: $spacing-xxl 90px

.prepa-hero__title
  @include title(clamp(4rem, 12vw, 14rem))
  color: $white
  margin: 0
  line-height: 0.88

.prepa-hero__subtitle
  @include sub(1rem)
  color: rgba($white, 0.5)
  margin: 0

.btn-outline
  @include stamp(0.65rem)
  display: inline-block
  padding: 0.8rem 2rem
  border: 1px solid rgba($white, 0.3)
  color: rgba($white, 0.7)
  text-decoration: none
  transition: all 0.2s ease
  align-self: flex-start

  &:hover
    border-color: $white
    color: $white
</style>
