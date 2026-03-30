<template>
  <section class="section coaches">
    <div class="coaches__header">
      <AppSectionHeader :label="$t('coaches.label')" :title="$t('coaches.title')" />
    </div>
    <div class="coaches__grid">
      <div
        v-for="coach in coaches"
        :key="coach.id"
        class="coach-card"
      >
        <div class="coach-card__image-wrap">
          <AppImage :src="coach.image" :alt="coach.imageAlt" />
          <AppBadge v-if="coach.badgeKey" variant="red" class="coach-card__badge">
            {{ $t(coach.badgeKey) }}
          </AppBadge>
        </div>
        <div class="coach-card__info">
          <h3 class="coach-card__name">{{ $t(coach.nameKey) }}</h3>
          <p class="coach-card__role">{{ $t(coach.roleKey) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { coaches } from '~/data/coaches'
</script>

<style scoped lang="sass">
.coaches
  background-color: $black

.coaches__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)

// ─── Grid ────────────────────────────────────────────────────
.coaches__grid
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md
  @include section-pad(0, $spacing-xl, 0, $spacing-xxl)

  @include md
    grid-template-columns: repeat(3, 1fr)

// ─── Card ────────────────────────────────────────────────────
.coach-card__image-wrap
  position: relative
  aspect-ratio: 4 / 5
  overflow: hidden
  filter: grayscale(100%)
  background-color: $black-mid

.coach-card__badge
  position: absolute
  bottom: $spacing-sm
  left: $spacing-sm

.coach-card__info
  padding: $spacing-sm 0

.coach-card__name
  @include h3(clamp(1.8rem, 2.5vw, 2.8rem))
  color: $white
  margin: 0 0 0.3rem

.coach-card__role
  @include caption(0.75rem)
  color: rgba($white, 0.5)
  margin: 0
</style>
