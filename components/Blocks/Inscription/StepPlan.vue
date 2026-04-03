<template>
  <div class="inscription-step">
    <h2 class="inscription-step__title">{{ $t('inscription.step2.title') }}</h2>

    <!-- Abonnements MMA -->
    <div v-if="service === 'mma'" class="plans-grid">
      <div
          v-for="sub in subscriptions"
          :key="sub.id"
          class="plan-card"
          :class="{
            'plan-card--selected': modelValue === sub.id,
            'plan-card--hl': sub.highlighted,
          }"
          @click="$emit('update:modelValue', sub.id)"
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

    <!-- Programmes prépa -->
    <div v-else-if="service === 'prepa'" class="plans-grid">
      <div
          v-for="prog in programs"
          :key="prog.id"
          class="plan-card"
          :class="{ 'plan-card--selected': modelValue === prog.id }"
          @click="$emit('update:modelValue', prog.id)"
      >
        <span class="plan-card__profile">{{ $t(prog.profileKey) }}</span>
        <h3 class="plan-card__title">{{ $t(prog.titleKey) }}</h3>
        <div class="plan-card__meta">
          <span>{{ $t('prepa.weeks', { n: prog.duration }) }}</span>
          <span>{{ $t('prepa.from') }} {{ prog.price }}€</span>
        </div>
      </div>
    </div>

    <!-- Coaching / Cage : info descriptive -->
    <div v-else class="inscription-info">
      <p>{{ $t(`inscription.services.${service}.description`) }}</p>
    </div>

    <div class="inscription-nav">
      <AppButton variant="outline" @click="$emit('prev')">{{ $t('inscription.back') }}</AppButton>
      <AppButton variant="primary" :disabled="needsPlan && !modelValue" @click="$emit('next')">
        {{ $t('inscription.continue') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import { subscriptions } from '~/data/subscriptions'
import { programs } from '~/data/programs'

const props = defineProps({
  service: { type: String, default: null },
  modelValue: { type: String, default: null },
})
defineEmits(['update:modelValue', 'next', 'prev'])

const needsPlan = computed(() => props.service === 'mma' || props.service === 'prepa')
</script>

<style scoped lang="sass">
.inscription-step__title
  @include title(clamp(2rem, 5vw, 4rem))
  color: $white
  margin-bottom: $spacing-lg

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

.inscription-info
  background-color: $black-light
  border: 1px solid rgba($white, 0.08)
  padding: $spacing-md
  margin-bottom: $spacing-lg

  p
    @include text(0.95rem)
    color: rgba($white, 0.7)
    margin: 0

.inscription-nav
  display: flex
  gap: $spacing-sm
  align-items: center
  margin-top: $spacing-md
</style>
