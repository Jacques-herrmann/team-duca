<template>
  <section class="section disciplines">
    <div class="disciplines__header">
      <AppSectionHeader :label="$t('disciplines.label')" :title="$t('disciplines.title')"/>
    </div>
    <div class="disciplines__grid">
      <div
          v-for="slug in disciplineSlugs"
          :key="slug"
          class="discipline-card"
      >
        <h3 class="discipline-card__title">{{ $t(`disciplines.items.${slug}.title`) }}</h3>
        <p class="discipline-card__desc">{{ $t(`disciplines.items.${slug}.description`) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const disciplineSlugs = ['mma', 'boxe', 'kickboxing', 'grappling', 'lutte'] as const
</script>

<style scoped lang="sass">
.disciplines
  background-color: $black

.disciplines__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)

// ─── Grid ────────────────────────────────────────────────────
.disciplines__grid
  display: grid
  grid-template-columns: 1fr 1fr
  border-top: 1px solid rgba($white, 0.06)

  @include lg
    grid-template-columns: repeat(5, 1fr)

// ─── Card ────────────────────────────────────────────────────
.discipline-card
  padding: $spacing-lg $spacing-md
  border-right: 1px solid rgba($white, 0.06)
  border-bottom: 1px solid rgba($white, 0.06)
  transition: border-top-color 0.2s ease
  border-top: 2px solid transparent

  &:hover
    border-top-color: $red

  @include lg
    padding: $spacing-xl $spacing-md
    border-bottom: none

    &:last-child
      border-right: none

.discipline-card__title
  @include h3(clamp(1.8rem, 2.5vw, 3rem))
  color: $white
  margin: 0 0 $spacing-sm

.discipline-card__desc
  @include text(0.875rem)
  color: rgba($white, 0.55)
  margin: 0
  line-height: 1.7
</style>
