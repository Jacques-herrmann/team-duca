<template>
  <section class="section athletes">

    <div class="athletes__header">
      <AppSectionHeader :label="$t('athletes.label')" :title="$t('athletes.title')" />
    </div>

    <!-- ─── PRO ─────────────────────────────────────────────── -->
    <div class="athletes__group">
      <div class="athletes__group-header">
        <AppBadge variant="red" size="md">{{ $t('athletes.proLabel') }}</AppBadge>
        <span class="athletes__group-line" aria-hidden="true" />
      </div>
      <div class="athletes__grid athletes__grid--pro">
        <article
          v-for="athlete in proAthletes"
          :key="athlete.id"
          class="athlete-card athlete-card--pro"
        >
          <div class="athlete-card__photo">
            <AppImage :src="athlete.image" :alt="athlete.imageAlt" />
          </div>
          <div class="athlete-card__body">
            <div class="athlete-card__identity">
              <h3 class="athlete-card__name">{{ athlete.name }}</h3>
              <span v-if="athlete.nickname" class="athlete-card__nickname">"{{ athlete.nickname }}"</span>
              <div class="athlete-card__sports">
                <AppBadge
                  v-for="sport in athlete.sports"
                  :key="sport"
                  variant="dark"
                >{{ $t(`athletes.sports.${sport}`) }}</AppBadge>
              </div>
            </div>

            <!-- MMA Record -->
            <div v-if="athlete.record" class="athlete-card__record">
              <span class="athlete-card__record-label">{{ $t('athletes.record') }}</span>
              <div class="athlete-card__record-stats">
                <div class="record-stat record-stat--win">
                  <span class="record-stat__num">{{ athlete.record.wins }}</span>
                  <span class="record-stat__label">{{ $t('athletes.wins') }}</span>
                </div>
                <span class="record-stat__sep" aria-hidden="true">-</span>
                <div class="record-stat record-stat--loss">
                  <span class="record-stat__num">{{ athlete.record.losses }}</span>
                  <span class="record-stat__label">{{ $t('athletes.losses') }}</span>
                </div>
                <span class="record-stat__sep" aria-hidden="true">-</span>
                <div class="record-stat">
                  <span class="record-stat__num">{{ athlete.record.draws }}</span>
                  <span class="record-stat__label">{{ $t('athletes.draws') }}</span>
                </div>
              </div>
            </div>

            <!-- BJJ Belt -->
            <div v-if="athlete.bjjBelt" class="athlete-card__belt">
              <span
                class="belt-dot"
                :class="`belt-dot--${athlete.bjjBelt}`"
                :aria-label="$t(`athletes.belts.${athlete.bjjBelt}`)"
              />
              <span class="athlete-card__belt-label">
                {{ $t('athletes.belt') }} · {{ $t(`athletes.belts.${athlete.bjjBelt}`) }}
              </span>
            </div>

            <!-- Palmarès -->
            <div class="athlete-card__palmares">
              <span class="athlete-card__palmares-title">{{ $t('athletes.palmares') }}</span>
              <ul class="palmares-list">
                <li
                  v-for="(entry, i) in athlete.palmare"
                  :key="i"
                  class="palmares-entry"
                  :class="`palmares-entry--${entry.result}`"
                >
                  <span class="palmares-entry__medal" aria-hidden="true">{{ medalIcon(entry.result) }}</span>
                  <div class="palmares-entry__info">
                    <span class="palmares-entry__label">{{ entry.label }}</span>
                    <span class="palmares-entry__event">{{ entry.year }} · {{ entry.event }}</span>
                  </div>
                  <AppBadge variant="dark" class="palmares-entry__sport">
                    {{ $t(`athletes.sports.${entry.sport}`) }}
                  </AppBadge>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>

    <GraphicDivider ornament="diamond" color="white" class="athletes__divider" />

    <!-- ─── AMATEUR ──────────────────────────────────────────── -->
    <div class="athletes__group">
      <div class="athletes__group-header">
        <AppBadge variant="dark" size="md">{{ $t('athletes.amateurLabel') }}</AppBadge>
        <span class="athletes__group-line" aria-hidden="true" />
      </div>
      <div class="athletes__grid athletes__grid--amateur">
        <article
          v-for="athlete in amateurAthletes"
          :key="athlete.id"
          class="athlete-card athlete-card--amateur"
        >
          <div class="athlete-card__photo">
            <AppImage :src="athlete.image" :alt="athlete.imageAlt" />
          </div>
          <div class="athlete-card__body">
            <div class="athlete-card__identity">
              <h3 class="athlete-card__name">{{ athlete.name }}</h3>
              <div class="athlete-card__sports">
                <AppBadge
                  v-for="sport in athlete.sports"
                  :key="sport"
                  variant="dark"
                >{{ $t(`athletes.sports.${sport}`) }}</AppBadge>
              </div>
            </div>

            <!-- MMA Record -->
            <div v-if="athlete.record" class="athlete-card__record athlete-card__record--compact">
              <div class="athlete-card__record-stats">
                <div class="record-stat record-stat--win">
                  <span class="record-stat__num">{{ athlete.record.wins }}</span>
                  <span class="record-stat__label">{{ $t('athletes.wins') }}</span>
                </div>
                <span class="record-stat__sep" aria-hidden="true">-</span>
                <div class="record-stat record-stat--loss">
                  <span class="record-stat__num">{{ athlete.record.losses }}</span>
                  <span class="record-stat__label">{{ $t('athletes.losses') }}</span>
                </div>
                <span class="record-stat__sep" aria-hidden="true">-</span>
                <div class="record-stat">
                  <span class="record-stat__num">{{ athlete.record.draws }}</span>
                  <span class="record-stat__label">{{ $t('athletes.draws') }}</span>
                </div>
              </div>
            </div>

            <!-- BJJ Belt -->
            <div v-if="athlete.bjjBelt" class="athlete-card__belt">
              <span
                class="belt-dot"
                :class="`belt-dot--${athlete.bjjBelt}`"
              />
              <span class="athlete-card__belt-label">
                {{ $t(`athletes.belts.${athlete.bjjBelt}`) }}
              </span>
            </div>

            <!-- Palmarès (condensé) -->
            <ul class="palmares-list palmares-list--compact">
              <li
                v-for="(entry, i) in athlete.palmare"
                :key="i"
                class="palmares-entry palmares-entry--compact"
                :class="`palmares-entry--${entry.result}`"
              >
                <span class="palmares-entry__medal" aria-hidden="true">{{ medalIcon(entry.result) }}</span>
                <span class="palmares-entry__label">{{ entry.label }}</span>
                <span class="palmares-entry__year">{{ entry.year }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { proAthletes, amateurAthletes, type PalmareResult } from '~/data/athletes'

function medalIcon(result: PalmareResult): string {
  switch (result) {
    case 'gold': return '🥇'
    case 'silver': return '🥈'
    case 'bronze': return '🥉'
    case 'win': return '✓'
    case 'loss': return '✗'
    case 'nc': return '—'
    default: return '·'
  }
}
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

// ─── Card base ───────────────────────────────────────────────
.athlete-card
  display: flex
  flex-direction: column
  background-color: $black-light
  border: 1px solid rgba($white, 0.06)

// ─── Photo ───────────────────────────────────────────────────
.athlete-card--pro .athlete-card__photo
  aspect-ratio: 3 / 2
  overflow: hidden
  background-color: $black-mid
  filter: grayscale(100%)

  @include lg
    aspect-ratio: 16 / 9

.athlete-card--amateur .athlete-card__photo
  aspect-ratio: 3 / 4
  overflow: hidden
  background-color: $black-mid
  filter: grayscale(100%)

// ─── Body ────────────────────────────────────────────────────
.athlete-card--pro .athlete-card__body
  padding: $spacing-md
  display: flex
  flex-direction: column
  gap: $spacing-md
  flex: 1

.athlete-card--amateur .athlete-card__body
  padding: $spacing-sm
  display: flex
  flex-direction: column
  gap: $spacing-sm
  flex: 1

// ─── Identity ────────────────────────────────────────────────
.athlete-card__identity
  display: flex
  flex-direction: column
  gap: 0.4rem

.athlete-card__name
  @include h3(clamp(1.8rem, 3vw, 3rem))
  color: $white
  margin: 0
  line-height: 0.9

  .athlete-card--amateur &
    @include h3(clamp(1.4rem, 2.5vw, 2rem))

.athlete-card__nickname
  @include text(0.85rem)
  color: rgba($white, 0.45)
  font-style: italic

.athlete-card__sports
  display: flex
  gap: 0.4rem
  flex-wrap: wrap
  margin-top: 0.2rem

// ─── MMA Record ──────────────────────────────────────────────
.athlete-card__record
  display: flex
  flex-direction: column
  gap: 0.5rem
  padding: $spacing-sm
  border: 1px solid rgba($white, 0.08)

.athlete-card__record--compact
  padding: 0.4rem $spacing-sm

.athlete-card__record-label
  @include stamp(0.55rem)
  color: rgba($white, 0.4)

.athlete-card__record-stats
  display: flex
  align-items: center
  gap: 0.5rem

.record-stat
  display: flex
  flex-direction: column
  align-items: center
  gap: 0.1rem

.record-stat__num
  @include title(clamp(1.8rem, 3vw, 2.8rem))
  color: rgba($white, 0.6)
  line-height: 1

  .record-stat--win &
    color: $white

.record-stat__label
  @include caption(0.55rem)
  color: rgba($white, 0.3)

.record-stat__sep
  @include title(1.5rem)
  color: rgba($white, 0.15)
  line-height: 1

// ─── BJJ Belt ────────────────────────────────────────────────
.athlete-card__belt
  display: flex
  align-items: center
  gap: 0.6rem

.belt-dot
  width: 12px
  height: 12px
  border-radius: 50%
  flex-shrink: 0

  &--white
    background: $white
    border: 1px solid rgba($white, 0.2)

  &--blue
    background: #2563EB

  &--purple
    background: #7C3AED

  &--brown
    background: #92400E

  &--black
    background: $black
    border: 1px solid rgba($white, 0.3)

.athlete-card__belt-label
  @include caption(0.65rem)
  color: rgba($white, 0.5)

// ─── Palmarès ────────────────────────────────────────────────
.athlete-card__palmares
  display: flex
  flex-direction: column
  gap: $spacing-sm
  flex: 1

.athlete-card__palmares-title
  @include stamp(0.55rem)
  color: rgba($white, 0.4)

.palmares-list
  list-style: none
  padding: 0
  margin: 0
  display: flex
  flex-direction: column
  gap: 0.4rem

.palmares-entry
  display: flex
  align-items: flex-start
  gap: 0.6rem
  padding: 0.5rem 0
  border-bottom: 1px solid rgba($white, 0.05)

  &:last-child
    border-bottom: none

  &--gold .palmares-entry__label
    color: $white

  &--silver .palmares-entry__label
    color: rgba($white, 0.7)

  &--bronze .palmares-entry__label
    color: $gold

  &--win .palmares-entry__label
    color: rgba($white, 0.7)

  &--loss .palmares-entry__label
    color: rgba($white, 0.35)

.palmares-entry__medal
  font-size: 0.9rem
  flex-shrink: 0
  margin-top: 0.1rem
  line-height: 1

  // Remplacement des emojis pour les victoires/défaites MMA
  .palmares-entry--win &,
  .palmares-entry--loss &
    @include title(1rem)
    font-style: normal

  .palmares-entry--win &
    color: rgba($white, 0.6)

  .palmares-entry--loss &
    color: rgba($white, 0.2)

.palmares-entry__info
  display: flex
  flex-direction: column
  gap: 0.2rem
  flex: 1

.palmares-entry__label
  @include caption(0.75rem)
  color: rgba($white, 0.7)
  transition: color 0

.palmares-entry__event
  @include text(0.7rem)
  color: rgba($white, 0.3)

.palmares-entry__sport
  flex-shrink: 0
  align-self: flex-start

// ─── Compact palmarès (amateur) ───────────────────────────────
.palmares-list--compact
  gap: 0.2rem

.palmares-entry--compact
  padding: 0.3rem 0
  align-items: center

  .palmares-entry__label
    @include caption(0.65rem)
    flex: 1

.palmares-entry__year
  @include caption(0.6rem)
  color: rgba($white, 0.25)
  flex-shrink: 0
</style>
