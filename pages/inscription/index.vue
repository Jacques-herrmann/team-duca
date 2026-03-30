<template>
  <main class="inscription-page">
    <!-- Step indicator -->
    <div class="step-bar">
      <div
        v-for="(s, i) in steps"
        :key="i"
        class="step-bar__item"
        :class="{
          'step-bar__item--active': step === i + 1,
          'step-bar__item--done': step > i + 1,
        }"
      >
        <span class="step-bar__number">{{ i + 1 }}</span>
        <span class="step-bar__label">{{ $t(s.titleKey) }}</span>
      </div>
    </div>

    <!-- Étape 1 : Choix service -->
    <div v-show="step === 1" class="inscription-step">
      <h1 class="inscription-step__title">{{ $t('inscription.step1.title') }}</h1>
      <div class="services-grid">
        <button
          v-for="svc in services"
          :key="svc.id"
          class="service-card"
          :class="{ 'service-card--selected': selectedService === svc.id }"
          @click="selectService(svc.id)"
        >
          <span class="service-card__icon" v-html="svc.icon" />
          <h3 class="service-card__title">{{ $t(svc.titleKey) }}</h3>
          <p class="service-card__desc">{{ $t(svc.descKey) }}</p>
        </button>
      </div>
      <div class="inscription-nav">
        <AppButton variant="primary" :disabled="!selectedService" @click="nextStep">
          Continuer →
        </AppButton>
      </div>
    </div>

    <!-- Étape 2 : Choix formule -->
    <div v-show="step === 2" class="inscription-step">
      <h1 class="inscription-step__title">{{ $t('inscription.step2.title') }}</h1>

      <div v-if="selectedService === 'mma'" class="plans-grid">
        <div
          v-for="sub in subscriptions"
          :key="sub.id"
          class="plan-card"
          :class="{
            'plan-card--selected': selectedPlan === sub.id,
            'plan-card--hl': sub.highlighted,
          }"
          @click="selectedPlan = sub.id"
        >
          <h3 class="plan-card__title">{{ $t(sub.titleKey) }}</h3>
          <div class="plan-card__price">
            <span class="plan-card__amount">{{ sub.price }}€</span>
            <span class="plan-card__unit">/{{ sub.priceUnit }}</span>
          </div>
          <ul class="plan-card__features">
            <li v-for="f in sub.features" :key="f">
              <span class="check">✓</span> {{ $t(f) }}
            </li>
          </ul>
        </div>
      </div>

      <div v-else-if="selectedService === 'prepa'" class="plans-grid">
        <div
          v-for="prog in programs"
          :key="prog.id"
          class="plan-card"
          :class="{ 'plan-card--selected': selectedPlan === prog.id }"
          @click="selectedPlan = prog.id"
        >
          <span class="plan-card__profile">{{ $t(prog.profileKey) }}</span>
          <h3 class="plan-card__title">{{ $t(prog.titleKey) }}</h3>
          <div class="plan-card__meta">
            <span>{{ $t('prepa.weeks', { n: prog.duration }) }}</span>
            <span>{{ $t('prepa.from') }} {{ prog.price }}€</span>
          </div>
        </div>
      </div>

      <div v-else class="inscription-info">
        <p>{{ $t('inscription.services.' + selectedService + '.description') }}</p>
      </div>

      <div class="inscription-nav">
        <AppButton variant="outline" @click="prevStep">← Retour</AppButton>
        <AppButton variant="primary" :disabled="needsPlan && !selectedPlan" @click="nextStep">
          Continuer →
        </AppButton>
      </div>
    </div>

    <!-- Étape 3 : Formulaire -->
    <div v-show="step === 3" class="inscription-step">
      <h1 class="inscription-step__title">{{ $t('inscription.step3.title') }}</h1>
      <form
        name="inscription"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/merci"
        class="inscription-form"
      >
        <input type="hidden" name="form-name" value="inscription" />
        <input type="hidden" name="service" :value="selectedService || ''" />
        <input type="hidden" name="plan" :value="selectedPlan || ''" />
        <input name="bot-field" type="text" class="hidden-field" tabindex="-1" autocomplete="off" />
        <div class="form-row">
          <AppInput name="firstname" :label="$t('inscription.form.firstname')" required />
          <AppInput name="lastname" :label="$t('inscription.form.lastname')" required />
        </div>
        <div class="form-row">
          <AppInput name="email" type="email" :label="$t('inscription.form.email')" required />
          <AppInput name="phone" type="tel" :label="$t('inscription.form.phone')" />
        </div>
        <AppTextarea name="message" :label="$t('inscription.form.message')" :rows="4" />
        <div class="inscription-nav">
          <AppButton variant="outline" type="button" @click="prevStep">← Retour</AppButton>
          <AppButton variant="primary" type="submit">{{ $t('inscription.form.submit') }}</AppButton>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { subscriptions } from '~/data/subscriptions'
import { programs } from '~/data/programs'

const step = ref<1 | 2 | 3>(1)
const selectedService = ref<string | null>(null)
const selectedPlan = ref<string | null>(null)

const steps = [
  { titleKey: 'inscription.step1.title' },
  { titleKey: 'inscription.step2.title' },
  { titleKey: 'inscription.step3.title' },
]

const services = [
  {
    id: 'mma',
    titleKey: 'inscription.services.mma.title',
    descKey: 'inscription.services.mma.description',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>',
  },
  {
    id: 'prepa',
    titleKey: 'inscription.services.prepa.title',
    descKey: 'inscription.services.prepa.description',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  },
  {
    id: 'coaching',
    titleKey: 'inscription.services.coaching.title',
    descKey: 'inscription.services.coaching.description',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
  },
  {
    id: 'cage',
    titleKey: 'inscription.services.cage.title',
    descKey: 'inscription.services.cage.description',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
  },
]

const needsPlan = computed(() => selectedService.value === 'mma' || selectedService.value === 'prepa')

function selectService(id: string) {
  selectedService.value = id
  selectedPlan.value = null
}
function nextStep() {
  if (step.value < 3) step.value = (step.value + 1) as 1 | 2 | 3
}
function prevStep() {
  if (step.value > 1) step.value = (step.value - 1) as 1 | 2 | 3
}

useHead({ title: 'Inscription — Science DUCA MMA Marseille' })
</script>

<style scoped lang="sass">
.inscription-page
  min-height: 100vh
  padding: $spacing-xl $spacing-md

  @include lg
    padding: $spacing-xxl 90px

// ─── Step bar ────────────────────────────────────────────────
.step-bar
  display: flex
  align-items: center
  margin-bottom: $spacing-xl
  border-bottom: 1px solid rgba($white, 0.08)
  padding-bottom: $spacing-md

.step-bar__item
  display: flex
  align-items: center
  gap: 0.5rem
  opacity: 0.3
  transition: opacity 0.2s ease
  flex: 1

  &--active
    opacity: 1

  &--done
    opacity: 0.6

  & + &::before
    content: '─'
    @include caption(0.5rem)
    color: rgba($white, 0.2)
    margin: 0 0.5rem
    flex: 1

.step-bar__number
  width: 24px
  height: 24px
  border-radius: 50%
  background-color: rgba($white, 0.1)
  display: flex
  align-items: center
  justify-content: center
  @include caption(0.65rem)
  color: $white
  flex-shrink: 0

  .step-bar__item--active &
    background-color: $red

  .step-bar__item--done &
    background-color: rgba($red, 0.4)

.step-bar__label
  @include caption(0.65rem)
  color: $white
  display: none

  @include md
    display: block

// ─── Step ────────────────────────────────────────────────────
.inscription-step__title
  @include title(clamp(2rem, 5vw, 4rem))
  color: $white
  margin-bottom: $spacing-lg

// ─── Services ────────────────────────────────────────────────
.services-grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: $spacing-sm
  margin-bottom: $spacing-lg

  @include lg
    grid-template-columns: repeat(4, 1fr)

.service-card
  background-color: $black-light
  border: 1px solid rgba($white, 0.08)
  padding: $spacing-md
  cursor: pointer
  text-align: left
  transition: border-color 0.2s ease, background-color 0.2s ease
  display: flex
  flex-direction: column
  gap: $spacing-sm

  &:hover
    border-color: rgba($white, 0.2)

  &--selected
    border-color: $red
    background-color: rgba($red, 0.06)

.service-card__icon
  width: 32px
  height: 32px
  color: rgba($white, 0.45)
  display: flex
  align-items: center
  justify-content: center

  .service-card--selected &
    color: $red

.service-card__title
  @include sub(1.4rem)
  color: $white
  margin: 0

.service-card__desc
  @include text(0.8rem)
  color: rgba($white, 0.5)
  margin: 0

// ─── Plans ───────────────────────────────────────────────────
.plans-grid
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-sm
  margin-bottom: $spacing-lg

  @include md
    grid-template-columns: repeat(3, 1fr)

.plan-card
  background-color: $black-light
  border: 1px solid rgba($white, 0.08)
  padding: $spacing-md
  cursor: pointer
  display: flex
  flex-direction: column
  gap: $spacing-sm
  transition: border-color 0.2s ease, background-color 0.2s ease

  &:hover
    border-color: rgba($white, 0.2)

  &--selected
    border-color: $red
    background-color: rgba($red, 0.06)

  &--hl
    border-color: rgba($red, 0.25)

.plan-card__profile
  @include stamp(0.6rem)

.plan-card__title
  @include sub(1.6rem)
  color: $white
  margin: 0

.plan-card__price
  display: flex
  align-items: baseline
  gap: 0.3rem

.plan-card__amount
  @include title(2.5rem)
  color: $white

.plan-card__unit
  @include caption(0.75rem)
  color: rgba($white, 0.4)

.plan-card__meta
  @include caption(0.7rem)
  color: rgba($white, 0.45)
  display: flex
  flex-direction: column
  gap: 0.3rem

.plan-card__features
  list-style: none
  padding: 0
  margin: 0
  display: flex
  flex-direction: column
  gap: 0.4rem
  @include text(0.8rem)
  color: rgba($white, 0.65)

.check
  color: $red
  font-weight: bold
  margin-right: 0.3rem

// ─── Info ────────────────────────────────────────────────────
.inscription-info
  background-color: $black-light
  border: 1px solid rgba($white, 0.08)
  padding: $spacing-md
  margin-bottom: $spacing-lg

  p
    @include text(0.95rem)
    color: rgba($white, 0.7)
    margin: 0

// ─── Navigation ──────────────────────────────────────────────
.inscription-nav
  display: flex
  gap: $spacing-sm
  align-items: center
  margin-top: $spacing-md

// ─── Form ────────────────────────────────────────────────────
.inscription-form
  display: flex
  flex-direction: column
  gap: $spacing-md
  max-width: 640px

.form-row
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md

  @include md
    grid-template-columns: repeat(2, 1fr)

.hidden-field
  position: absolute
  left: -9999px
  opacity: 0
  pointer-events: none
</style>
