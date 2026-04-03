<template>
  <section class="section athletes">

    <div class="athletes__header">
      <AppSectionHeader :label="$t('athletes.label')" :title="$t('athletes.title')"/>
    </div>

    <!-- ─── PRO ─────────────────────────────────────────────── -->
    <div class="athletes__group">
      <div class="athletes__group-header">
        <AppBadge variant="red" size="md">{{ $t('athletes.proLabel') }}</AppBadge>
        <span class="athletes__group-line" aria-hidden="true"/>
      </div>
      <div class="athletes__grid athletes__grid--pro">
        <BlocksAthletesAthleteCard v-for="athlete in proAthletes" :key="athlete.id" :athlete="athlete"/>
      </div>
    </div>

    <GraphicDivider ornament="diamond" color="white" class="athletes__divider"/>

    <!-- ─── AMATEUR ──────────────────────────────────────────── -->
    <div class="athletes__group">
      <div class="athletes__group-header">
        <AppBadge variant="dark" size="md">{{ $t('athletes.amateurLabel') }}</AppBadge>
        <span class="athletes__group-line" aria-hidden="true"/>
      </div>
      <div class="athletes__grid athletes__grid--amateur">
        <BlocksAthletesAthleteCard v-for="athlete in amateurAthletes" :key="athlete.id" :athlete="athlete"/>
      </div>
    </div>

  </section>
</template>

<script setup>
import { proAthletes, amateurAthletes } from '~/data/athletes'
</script>

<style scoped lang="sass">
.athletes
  background-color: $black

.athletes__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)

// ─── Group ───────────────────────────────────────────────────
.athletes__group
  @include section-pad(0, $spacing-md, $spacing-xl, $spacing-lg)

.athletes__group-header
  display: flex
  align-items: center
  gap: $spacing-md
  margin-bottom: $spacing-lg

.athletes__group-line
  flex: 1
  height: 1px
  background: rgba($white, 0.08)

// ─── Divider ─────────────────────────────────────────────────
.athletes__divider
  @include px
  margin-bottom: $spacing-xl

// ─── Grids ───────────────────────────────────────────────────
.athletes__grid--pro
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md

  @include lg
    grid-template-columns: repeat(2, 1fr)

.athletes__grid--amateur
  display: grid
  grid-template-columns: 1fr 1fr
  gap: $spacing-md

  @include md
    grid-template-columns: repeat(4, 1fr)
</style>
