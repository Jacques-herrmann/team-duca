<template>
  <main class="prepa-page">
    <!-- Hero -->
    <div class="prepa-page__hero">
      <span class="section__label">{{ $t('prepa.label') }}</span>
      <h1 class="prepa-page__title">
        {{ $t('prepa.title') }}
      </h1>
      <p class="prepa-page__subtitle">{{ $t('prepa.subtitle') }}</p>
      <a href="#programmes" class="btn-outline">{{ $t('prepa.cta.anchor') }}</a>
    </div>

    <!-- Intro -->
    <div class="prepa-page__intro">
      <div class="prepa-intro__text">
        <span class="section__label">{{ $t('prepa.method.label') }}</span>
        <p>{{ $t('prepa.method.text1') }}</p>
        <p>{{ $t('prepa.method.text2') }}</p>
      </div>
      <div class="prepa-intro__highlights">
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

    <!-- Programmes -->
    <div id="programmes" class="prepa-page__programs">
      <span class="section__label">{{ $t('prepa.programsLabel') }}</span>
      <div class="programs-grid">
        <div
          v-for="program in programs"
          :key="program.id"
          class="program-card"
        >
          <div class="program-card__image-wrap">
            <AppImage :src="program.image" :alt="program.imageAlt" />
          </div>
          <div class="program-card__body">
            <span class="program-card__profile">{{ $t(program.profileKey) }}</span>
            <h2 class="program-card__title">{{ $t(program.titleKey) }}</h2>
            <div class="program-card__meta">
              <span class="program-card__duration">{{ $t('prepa.weeks', { n: program.duration }) }}</span>
              <span class="program-card__price">{{ $t('prepa.from') }} {{ program.price }}€</span>
            </div>
            <ul class="program-card__features">
              <li v-for="feature in program.features" :key="feature">
                <span class="check">✓</span> {{ $t(feature) }}
              </li>
            </ul>
            <nuxt-link :to="localePath(program.ctaUrl)" class="btn-primary program-card__cta">
              {{ $t('cta.register') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="prepa-page__faq">
      <span class="section__label">{{ $t('prepa.faq.label') }}</span>
      <div class="faq-list">
        <div
          v-for="i in 4"
          :key="i"
          class="faq-item"
        >
          <button
            class="faq-item__question"
            :class="{ 'faq-item__question--open': openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
          >
            {{ $t(`prepa.faq.q${i}`) }}
            <span class="faq-item__arrow">{{ openFaq === i ? '−' : '+' }}</span>
          </button>
          <div v-show="openFaq === i" class="faq-item__answer">
            <p>{{ $t(`prepa.faq.a${i}`) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="prepa-page__cta">
      <h2 class="prepa-page__cta-title">{{ $t('prepa.cta.title') }}</h2>
      <nuxt-link :to="localePath('/inscription?service=prepa')" class="btn-inverse btn--lg">
        {{ $t('prepa.cta.button') }}
      </nuxt-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { programs } from '~/data/programs'

const localePath = useLocalePath()
const openFaq = ref<number | null>(null)

const faq = [
  {
    q: 'Est-ce que je dois déjà pratiquer le MMA ?',
    a: 'Non. Le programme Fondations est spécialement conçu pour les débutants ou les personnes qui reviennent après une pause. Il n\'y a pas de prérequis techniques.',
  },
  {
    q: 'Comment se déroule le suivi coach ?',
    a: 'Selon le programme choisi, le suivi se fait via un groupe privé (message et questions) ou avec des retours hebdomadaires personnalisés. Tout se fait à distance, en ligne.',
  },
  {
    q: 'Quelle est la durée d\'un programme ?',
    a: 'Les programmes durent entre 8 et 16 semaines selon le niveau. Chaque semaine est planifiée avec des séances détaillées, des vidéos explicatives et des objectifs clairs.',
  },
  {
    q: 'Est-ce que je peux combiner avec mon abonnement MMA ?',
    a: 'Oui, c\'est même recommandé. Les programmes de prépa sont conçus pour être compatibles avec 2 à 4 entraînements MMA par semaine.',
  },
]

useHead({
  title: 'Préparation physique MMA Marseille — Science DUCA',
  meta: [
    {
      name: 'description',
      content: 'Programmes de préparation physique MMA à Marseille. Fondations, Combat Ready, Elite — plans structurés semaine par semaine avec suivi coach. Science DUCA.',
    },
    { property: 'og:title', content: 'Préparation physique MMA Marseille — Science DUCA' },
    {
      property: 'og:description',
      content: 'Programmes de préparation physique MMA à Marseille. Science DUCA.',
    },
  ],
})
</script>

<style scoped lang="sass">
.prepa-page
  min-height: 100vh

// ─── Hero ────────────────────────────────────────────────────
.prepa-page__hero
  padding: $spacing-xl $spacing-md
  border-bottom: 1px solid rgba($white, 0.06)
  display: flex
  flex-direction: column
  gap: $spacing-md

  @include lg
    padding: $spacing-xxl 90px

.prepa-page__title
  @include title(clamp(4rem, 12vw, 14rem))
  color: $white
  margin: 0
  line-height: 0.88

.prepa-page__title-outline
  -webkit-text-stroke: 1px $white
  color: transparent

.prepa-page__subtitle
  @include sub(1rem)
  color: rgba($white, 0.5)
  margin: 0

// ─── Intro ───────────────────────────────────────────────────
.prepa-page__intro
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

.prepa-intro__text
  display: flex
  flex-direction: column
  gap: $spacing-md

  p
    @include text(1rem)
    color: rgba($white, 0.7)
    margin: 0
    line-height: 1.8

.prepa-intro__highlights
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

// ─── Programmes ──────────────────────────────────────────────
.prepa-page__programs
  padding: $spacing-xl $spacing-md
  display: flex
  flex-direction: column
  gap: $spacing-lg

  @include lg
    padding: $spacing-xxl 90px

.programs-grid
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md

  @include md
    grid-template-columns: repeat(3, 1fr)

.program-card
  background-color: $black-light
  display: flex
  flex-direction: column

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

.program-card__profile
  @include stamp(0.6rem)

.program-card__title
  @include title(clamp(2rem, 3vw, 3rem))
  color: $white
  margin: 0

.program-card__meta
  display: flex
  gap: $spacing-sm
  align-items: center

.program-card__duration
  @include caption(0.7rem)
  color: rgba($white, 0.4)

.program-card__price
  @include caption(0.7rem)
  color: $white
  background-color: rgba($red, 0.12)
  padding: 0.15rem 0.5rem
  border: 1px solid rgba($red, 0.25)

.program-card__features
  list-style: none
  padding: 0
  margin: 0
  display: flex
  flex-direction: column
  gap: 0.4rem
  flex: 1
  @include text(0.8rem)
  color: rgba($white, 0.65)

.check
  color: $red
  font-weight: bold
  margin-right: 0.3rem

// ─── FAQ ─────────────────────────────────────────────────────
.prepa-page__faq
  padding: $spacing-xl $spacing-md
  background-color: $black-mid
  display: flex
  flex-direction: column
  gap: $spacing-lg

  @include lg
    padding: $spacing-xxl 90px

.faq-list
  display: flex
  flex-direction: column
  border-top: 1px solid rgba($white, 0.08)

.faq-item
  border-bottom: 1px solid rgba($white, 0.08)

.faq-item__question
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  padding: $spacing-md 0
  background: none
  border: none
  color: $white
  cursor: pointer
  text-align: left
  @include sub(1rem)
  transition: color 0.2s ease

  &:hover,
  &--open
    color: $red

.faq-item__arrow
  @include title(1.5rem)
  color: $red
  flex-shrink: 0
  margin-left: $spacing-md

.faq-item__answer
  padding: 0 0 $spacing-md

  p
    @include text(0.95rem)
    color: rgba($white, 0.65)
    margin: 0
    line-height: 1.8
    max-width: 70ch

// ─── CTA block ───────────────────────────────────────────────
.prepa-page__cta
  background-color: $red
  padding: $spacing-xl $spacing-md
  display: flex
  flex-direction: column
  align-items: center
  gap: $spacing-lg
  text-align: center

  @include lg
    flex-direction: row
    justify-content: space-between
    text-align: left
    padding: $spacing-xxl 90px

.prepa-page__cta-title
  @include title(clamp(3rem, 7vw, 7rem))
  color: $white
  line-height: 0.9
  margin: 0

  .outline
    -webkit-text-stroke: 1px rgba($black, 0.3)
    color: transparent

// ─── Buttons ─────────────────────────────────────────────────
.btn-red
  @include stamp(0.65rem)
  display: block
  text-align: center
  padding: 0.8rem 1.5rem
  background-color: $red
  color: $white
  text-decoration: none
  margin-top: auto
  transition: background-color 0.2s ease

  &:hover
    background-color: darken($red, 8%)

.btn-outline
  @include stamp(0.65rem)
  display: inline-block
  padding: 0.8rem 2rem
  border: 1px solid rgba($white, 0.3)
  color: rgba($white, 0.7)
  text-decoration: none
  transition: all 0.2s ease
  align-self: flex-start

  &:hover
    border-color: $white
    color: $white

.btn-white
  @include stamp(0.75rem)
  display: inline-block
  padding: 1rem 2.5rem
  background-color: $white
  color: $black
  text-decoration: none
  white-space: nowrap
  flex-shrink: 0
  transition: all 0.2s ease

  &:hover
    background-color: $black
    color: $white
</style>
