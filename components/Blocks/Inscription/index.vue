<template>
  <div>
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

    <InscriptionStepService
        v-show="step === 1"
        v-model="selectedService"
        @next="nextStep"
    />

    <InscriptionStepPlan
        v-show="step === 2"
        :service="selectedService"
        v-model="selectedPlan"
        @next="nextStep"
        @prev="prevStep"
    />

    <InscriptionStepForm
        v-show="step === 3"
        :service="selectedService"
        :plan="selectedPlan"
        @prev="prevStep"
    />
  </div>
</template>

<script setup>
const step = ref(1)
const selectedService = ref(null)
const selectedPlan = ref(null)

const steps = [
  { titleKey: 'inscription.step1.title' },
  { titleKey: 'inscription.step2.title' },
  { titleKey: 'inscription.step3.title' },
]

function nextStep() {
  if (step.value < 3) step.value++
}
function prevStep() {
  if (step.value > 1) step.value--
}

watch(selectedService, () => {
  selectedPlan.value = null
})
</script>

<style scoped lang="sass">
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
</style>
