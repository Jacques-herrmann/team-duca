<template>
  <section class="section schedule" id="schedule">
    <div class="schedule__header">
      <AppSectionHeader :label="$t('schedule.label')" :title="$t('schedule.title')"/>
    </div>

    <!-- Mobile: day tabs -->
    <div class="schedule__tabs">
      <button
          v-for="day in days"
          :key="day"
          class="schedule__tab"
          :class="{ 'schedule__tab--active': activeDay === day }"
          @click="activeDay = day"
      >
        {{ $t(`schedule.days.${day}`) }}
      </button>
    </div>

    <!-- Desktop: all columns / Mobile: active day only -->
    <div class="schedule__grid">
      <div
          v-for="day in days"
          :key="day"
          class="schedule__day"
          :class="{ 'schedule__day--hidden': activeDay !== day }"
      >
        <span class="schedule__day-label">{{ $t(`schedule.days.${day}`) }}</span>
        <div class="schedule__slots">
          <div
              v-for="slot in scheduleByDay[day] || []"
              :key="slot.id"
              class="schedule-slot"
              :class="[`schedule-slot--${slot.level}`, `schedule-slot--disc-${slot.discipline}`]"
          >
            <span class="schedule-slot__time">{{ slot.time }}</span>
            <span class="schedule-slot__title">{{ $t(slot.titleKey) }}</span>
            <div class="schedule-slot__meta">
              <span>{{ slot.duration }}min</span>
            </div>
            <span class="schedule-slot__level-badge">
              {{ $t(`schedule.levels.${slot.level}`) }}
            </span>
          </div>
          <div v-if="!scheduleByDay[day]?.length" class="schedule__empty">—</div>
        </div>
      </div>
    </div>

    <div class="schedule__download">
      <AppButton href="#" variant="outline">{{ $t('schedule.download') }}</AppButton>
    </div>
  </section>
</template>

<script setup>
import { schedule } from '~/data/schedule'

const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const activeDay = ref('lundi')

const scheduleByDay = computed(() => {
  return schedule.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = []
    acc[item.day].push(item)
    return acc
  }, {})
})
</script>

<style scoped lang="sass">
.schedule
  background-color: $black

.schedule__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)

// ─── Tabs (mobile) ───────────────────────────────────────────
.schedule__tabs
  display: flex
  overflow-x: auto
  gap: 0
  padding: 0 $spacing-md
  border-bottom: 1px solid rgba($white, 0.08)
  scrollbar-width: none

  &::-webkit-scrollbar
    display: none

  @include lg
    display: none

.schedule__tab
  @include caption(0.7rem)
  padding: 0.75rem 1rem
  background: none
  border: none
  color: rgba($white, 0.4)
  cursor: pointer
  white-space: nowrap
  border-bottom: 2px solid transparent
  transition: color 0.2s ease, border-color 0.2s ease

  &--active
    color: $white
    border-bottom-color: $red

// ─── Grid ────────────────────────────────────────────────────
.schedule__grid
  @include section-pad($spacing-md, $spacing-xl, 0, $spacing-xxl)
  display: flex
  flex-direction: column

  @include lg
    display: grid
    grid-template-columns: repeat(6, 1fr)
    gap: 1px

// ─── Day column ──────────────────────────────────────────────
.schedule__day
  background-color: $black
  flex-direction: column
  display: none

  &:not(.schedule__day--hidden)
    display: flex

  @include lg
    display: flex

.schedule__day-label
  @include caption(0.7rem)
  color: rgba($white, 0.35)
  padding: $spacing-sm $spacing-sm 0
  display: none

  @include lg
    display: block

.schedule__slots
  display: flex
  flex-direction: column
  gap: 1px
  padding: $spacing-sm
  flex: 1

.schedule__empty
  @include text(0.8rem)
  color: rgba($white, 0.2)
  text-align: center
  padding: $spacing-md 0

// ─── Slot ────────────────────────────────────────────────────
.schedule-slot
  padding: $spacing-sm
  display: flex
  flex-direction: column
  gap: 0.3rem
  border: 1px solid rgba($white, 0.07)

  &--competition
    box-shadow: inset 0 0 0 1px rgba($red, 0.4)

.schedule-slot__time
  @include caption(0.65rem)
  color: rgba($white, 0.45)

.schedule-slot__title
  @include caption(0.9rem)
  color: $white

.schedule-slot__meta
  @include text(0.75rem)
  color: rgba($white, 0.4)
  display: flex
  gap: 0.5rem

.schedule-slot__level-badge
  @include caption(0.55rem)
  color: rgba($white, 0.35)
  align-self: flex-start

  .schedule-slot--competition &
    color: $red

  .schedule-slot--women &
    color: rgba($gold, 0.8)

  .schedule-slot--kids &
    color: rgba($white, 0.6)

// ─── Discipline colors ───────────────────────────────────────
$c-mma:  #E72640
$c-nogi: #4A90E2
$c-boxe: #C9A84C
$c-jjb:  #7C3AED
$c-open: rgba(#f9f9f9, 0.2)

.schedule-slot--disc-mma
  border-left: 3px solid $c-mma
  background-color: rgba($c-mma, 0.08)

.schedule-slot--disc-nogi
  border-left: 3px solid $c-nogi
  background-color: rgba($c-nogi, 0.07)

.schedule-slot--disc-boxe
  border-left: 3px solid $c-boxe
  background-color: rgba($c-boxe, 0.08)

.schedule-slot--disc-jjb
  border-left: 3px solid $c-jjb
  background-color: rgba($c-jjb, 0.07)

.schedule-slot--disc-open
  border-left: 3px solid $c-open
  background-color: rgba(#f9f9f9, 0.03)

// ─── Download ────────────────────────────────────────────────
.schedule__download
  @include section-pad(0, $spacing-xl, 0, $spacing-xxl)
  display: flex
  justify-content: center
</style>
