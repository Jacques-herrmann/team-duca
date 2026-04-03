<template>
  <section class="section abonnements">
    <div class="abonnements__header">
      <AppSectionHeader :label="$t('subscriptions.label')" :title="$t('subscriptions.title')" />
    </div>
    <div class="abonnements__grid">
      <AppCard
        v-for="sub in subscriptions"
        :key="sub.id"
        tag="article"
        :highlighted="sub.highlighted"
        class="subscription-card"
      >
        <div class="subscription-card__top">
          <h3 class="subscription-card__title">{{ $t(sub.titleKey) }}</h3>
          <p class="subscription-card__desc">{{ $t(sub.descriptionKey) }}</p>
          <AppPriceDisplay :amount="sub.price" :unit="sub.priceUnit" size="lg" class="subscription-card__price" />
        </div>
        <AppFeatureList :features="sub.features.map(f => $t(f))" class="subscription-card__features" />
        <AppButton
          :to="localePath(sub.ctaUrl)"
          :variant="sub.highlighted ? 'primary' : 'ghost-red'"
          class="subscription-card__cta"
        >
          {{ $t(sub.ctaKey) }}
        </AppButton>
      </AppCard>
    </div>
  </section>
</template>

<script setup>
import { subscriptions } from '~/data/subscriptions'

const localePath = useLocalePath()
</script>

<style scoped lang="sass">
.abonnements
  background-color: $black-mid

.abonnements__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)

// ─── Grid ────────────────────────────────────────────────────
.abonnements__grid
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md
  @include section-pad(0, $spacing-xl, 0, $spacing-xxl)

  @include md
    grid-template-columns: repeat(3, 1fr)

// ─── Card ────────────────────────────────────────────────────
.subscription-card
  padding: $spacing-md
  gap: $spacing-md

.subscription-card__top
  display: flex
  flex-direction: column
  gap: 0.5rem

.subscription-card__title
  @include h3
  color: $white
  margin: 0

.subscription-card__desc
  @include text(0.875rem)
  color: rgba($white, 0.45)
  margin: 0

.subscription-card__price
  margin-top: $spacing-sm

.subscription-card__features
  flex: 1

.subscription-card__cta
  display: block
  text-align: center
</style>
