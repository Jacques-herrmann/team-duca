<template>
  <section class="section athletes-teaser">

    <div class="athletes-teaser__header">
      <AppSectionHeader :label="$t('athletes.label')" :title="$t('athletes.title')"/>
    </div>

    <div class="athletes-teaser__grid">
      <article
          v-for="athlete in proAthletes"
          :key="athlete.id"
          class="teaser-card"
      >
        <div class="teaser-card__photo">
          <AppImage :src="athlete.image" :alt="athlete.imageAlt"/>
        </div>
        <div class="teaser-card__body">
          <div class="teaser-card__identity">
            <h3 class="teaser-card__name">{{ athlete.name }}</h3>
            <span v-if="athlete.nickname" class="teaser-card__nickname">"{{ athlete.nickname }}"</span>
            <div class="teaser-card__sports">
              <AppBadge
                  v-for="sport in athlete.sports"
                  :key="sport"
                  variant="dark"
              >{{ $t(`athletes.sports.${sport}`) }}
              </AppBadge>
            </div>
          </div>

          <div v-if="athlete.record" class="teaser-card__record">
            <span class="teaser-card__record-label">{{ $t('athletes.record') }}</span>
            <div class="teaser-card__record-stats">
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

        </div>
      </article>
    </div>

    <div class="athletes-teaser__cta">
      <nuxt-link :to="localePath('/athletes')" class="btn-outline">
        {{ $t('athletes.seeAll') }}
      </nuxt-link>
    </div>

  </section>
</template>

<script setup>
import { proAthletes } from '~/data/athletes'

const localePath = useLocalePath()
</script>

<style scoped lang="sass">
.athletes-teaser
  background-color: $black

.athletes-teaser__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)

.athletes-teaser__grid
  @include section-pad(0, $spacing-md, $spacing-xxl, $spacing-lg)
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md

  @include lg
    grid-template-columns: repeat(2, 1fr)

.athletes-teaser__cta
  @include section-pad(0, $spacing-md, $spacing-xxl, $spacing-lg)
  padding-top: 0
  display: flex
  justify-content: center

// ─── Card ────────────────────────────────────────────────────
.teaser-card
  display: flex
  flex-direction: column
  background-color: $black-light
  border: 1px solid rgba($white, 0.06)

  @include lg
    flex-direction: row

.teaser-card__photo
  aspect-ratio: 3 / 2
  overflow: hidden
  background-color: $black-mid
  flex-shrink: 0

  @include lg
    width: 240px
    aspect-ratio: auto

.teaser-card__body
  padding: $spacing-md
  display: flex
  flex-direction: column
  gap: $spacing-md
  flex: 1

// ─── Identity ────────────────────────────────────────────────
.teaser-card__identity
  display: flex
  flex-direction: column
  gap: 0.4rem

.teaser-card__name
  @include h3(clamp(1.8rem, 3vw, 3rem))
  color: $white
  margin: 0
  line-height: 0.9

.teaser-card__nickname
  @include text(0.85rem)
  color: rgba($white, 0.45)
  font-style: italic

.teaser-card__sports
  display: flex
  gap: 0.4rem
  flex-wrap: wrap
  margin-top: 0.2rem

// ─── Record ──────────────────────────────────────────────────
.teaser-card__record
  display: flex
  flex-direction: column
  gap: 0.5rem
  padding: $spacing-sm
  border: 1px solid rgba($white, 0.08)

.teaser-card__record-label
  @include stamp(0.55rem)
  color: rgba($white, 0.4)

.teaser-card__record-stats
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

// ─── CTA ─────────────────────────────────────────────────────
.btn-outline
  @include stamp(0.65rem)
  display: inline-block
  padding: 0.8rem 2rem
  border: 1px solid rgba($white, 0.3)
  color: rgba($white, 0.7)
  text-decoration: none
  transition: all 0.2s ease

  &:hover
    border-color: $white
    color: $white
</style>
