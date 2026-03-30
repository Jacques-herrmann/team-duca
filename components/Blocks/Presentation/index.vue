<template>
  <section class="section presentation">
    <div class="presentation__inner">
      <div class="presentation__text-col">
        <AppSectionHeader :label="$t('presentation.label')" :title="$t('presentation.title')" />
        <p class="presentation__text">{{ $t('presentation.text') }}</p>
      </div>
      <div class="presentation__facts">
        <div
          v-for="fact in keyfacts"
          :key="fact.labelKey"
          class="keyfact"
        >
          <span class="keyfact__value">{{ fact.value }}</span>
          <span class="keyfact__label">{{ $t(fact.labelKey) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { keyfacts } from '~/data/keyfacts'
</script>

<style scoped lang="sass">
.presentation
  background-color: $black

.presentation__inner
  @include section-pad
  display: flex
  flex-direction: column
  gap: $spacing-xl

  @include lg
    flex-direction: row
    align-items: flex-start
    gap: $spacing-xxl

// ─── Text ────────────────────────────────────────────────────
.presentation__text-col
  @include lg
    flex: 0 0 55%

.presentation__text
  @include text(1rem)
  color: rgba($white, 0.75)
  margin: $spacing-md 0 0
  max-width: 60ch
  line-height: 1.8

// ─── Keyfacts ────────────────────────────────────────────────
.presentation__facts
  display: flex
  flex-direction: column
  gap: $spacing-lg

  @include lg
    flex: 1
    justify-content: center

.keyfact
  display: flex
  flex-direction: column
  gap: 0.3rem
  padding-bottom: $spacing-md
  border-bottom: 1px solid rgba($white, 0.08)

  &:last-child
    border-bottom: none
    padding-bottom: 0

.keyfact__value
  @include h2(clamp(2.5rem, 5vw, 5rem))
  color: $red
  line-height: 1

.keyfact__label
  @include caption(0.8rem)
  color: rgba($white, 0.5)
</style>
