<template>
  <section class="section prepa" id="prepa">
    <div class="prepa__header">
      <AppSectionHeader :label="$t('prepa.label')" :title="$t('prepa.title')">
        <p class="prepa__subtitle">{{ $t('prepa.subtitle') }}</p>
      </AppSectionHeader>
    </div>
    <div class="prepa__grid">
      <AppCard
        v-for="program in programs"
        :key="program.id"
        tag="article"
        class="program-card"
      >
        <div class="program-card__image-wrap">
          <AppImage :src="program.image" :alt="program.imageAlt" />
        </div>
        <div class="program-card__body">
          <AppBadge variant="red">{{ $t(program.profileKey) }}</AppBadge>
          <h3 class="program-card__title">{{ $t(program.titleKey) }}</h3>
          <div class="program-card__meta">
            <span class="program-card__duration">
              {{ $t('prepa.weeks', { n: program.duration }) }}
            </span>
            <AppBadge variant="outline-red">
              {{ $t('prepa.from') }} {{ program.price }}€
            </AppBadge>
          </div>
          <AppFeatureList :features="program.features.map(f => $t(f))" class="program-card__features" />
          <AppButton :to="localePath(program.ctaUrl)" variant="ghost-red" class="program-card__cta">
            {{ $t('cta.register') }}
          </AppButton>
        </div>
      </AppCard>
    </div>
    <div class="prepa__more">
      <AppButton :to="localePath('/prepa-physique')" variant="outline">
        {{ $t('cta.learnMore') }}
      </AppButton>
    </div>
  </section>
</template>

<script setup>
import { programs } from '~/data/programs'

const localePath = useLocalePath()
</script>

<style scoped lang="sass">
.prepa
  background-color: $black-mid

.prepa__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)

.prepa__subtitle
  @include sub(1rem)
  color: rgba($white, 0.5)
  margin: $spacing-sm 0 0

// ─── Grid ────────────────────────────────────────────────────
.prepa__grid
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md
  @include px

  @include md
    grid-template-columns: repeat(3, 1fr)

// ─── Card ────────────────────────────────────────────────────
.program-card__image-wrap
  aspect-ratio: 3 / 2
  overflow: hidden
  background-color: $black-mid

.program-card__body
  padding: $spacing-md
  display: flex
  flex-direction: column
  gap: $spacing-sm
  flex: 1

.program-card__title
  @include h3(clamp(1.8rem, 2.5vw, 2.8rem))
  color: $white
  margin: 0

.program-card__meta
  display: flex
  gap: $spacing-sm
  align-items: center

.program-card__duration
  @include caption(0.75rem)
  color: rgba($white, 0.45)

.program-card__features
  flex: 1

// ─── CTA ─────────────────────────────────────────────────────
.program-card__cta
  display: block
  text-align: center
  margin-top: auto

// ─── More link ───────────────────────────────────────────────
.prepa__more
  @include section-pad($spacing-lg, $spacing-xl, $spacing-lg, $spacing-xxl)
  display: flex
  justify-content: center
</style>
