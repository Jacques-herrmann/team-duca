<template>
  <div class="prepa-method">
    <div class="prepa-method__text">
      <span class="section__label">{{ $t('prepa.method.label') }}</span>
      <h2 class="prepa-method__title">{{ $t('prepa.method.title') }}</h2>
      <p>{{ $t('prepa.method.text1') }}</p>
      <p>{{ $t('prepa.method.text2') }}</p>
    </div>
    <div class="prepa-method__highlights">
      <div class="prepa-highlight">
        <span class="prepa-highlight__value">3</span>
        <span class="prepa-highlight__label">{{ $t('prepa.highlights.programs') }}</span>
      </div>
      <div class="prepa-highlight">
        <span class="prepa-highlight__value">8–16</span>
        <span class="prepa-highlight__label">{{ $t('prepa.highlights.weeks') }}</span>
      </div>
      <div class="prepa-highlight">
        <span class="prepa-highlight__value">100%</span>
        <span class="prepa-highlight__label">{{ $t('prepa.highlights.online') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="sass">
.prepa-method
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-xl
  padding: $spacing-xl $spacing-md
  background-color: $black-mid
  border-bottom: 1px solid rgba($white, 0.06)

  @include lg
    grid-template-columns: 2fr 1fr
    padding: $spacing-xxl 90px
    gap: $spacing-xxl

.prepa-method__text
  display: flex
  flex-direction: column
  gap: $spacing-md

  p
    @include text(1rem)
    color: rgba($white, 0.7)
    margin: 0
    line-height: 1.8

.prepa-method__title
  @include title(clamp(2.5rem, 5vw, 5rem))
  color: $white
  margin: 0
  line-height: 0.9

.prepa-method__highlights
  display: flex
  flex-direction: row
  gap: $spacing-lg
  align-items: flex-start

  @include lg
    flex-direction: column

.prepa-highlight
  display: flex
  flex-direction: column
  gap: 0.3rem

.prepa-highlight__value
  @include title(clamp(2.5rem, 4vw, 4rem))
  color: $red

.prepa-highlight__label
  @include caption(0.7rem)
  color: rgba($white, 0.45)
</style>
