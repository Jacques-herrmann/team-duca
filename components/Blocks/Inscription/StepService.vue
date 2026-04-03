<template>
  <div class="inscription-step">
    <h2 class="inscription-step__title">{{ $t('inscription.step1.title') }}</h2>
    <div class="services-grid">
      <button
          v-for="svc in services"
          :key="svc.id"
          class="service-card"
          :class="{ 'service-card--selected': modelValue === svc.id }"
          @click="$emit('update:modelValue', svc.id)"
      >
        <span class="service-card__icon" v-html="svc.icon" />
        <h3 class="service-card__title">{{ $t(svc.titleKey) }}</h3>
        <p class="service-card__desc">{{ $t(svc.descKey) }}</p>
      </button>
    </div>
    <div class="inscription-nav">
      <AppButton variant="primary" :disabled="!modelValue" @click="$emit('next')">
        {{ $t('inscription.continue') }}
      </AppButton>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: null },
})
defineEmits(['update:modelValue', 'next'])

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
</script>

<style scoped lang="sass">
.inscription-step__title
  @include title(clamp(2rem, 5vw, 4rem))
  color: $white
  margin-bottom: $spacing-lg

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

.inscription-nav
  display: flex
  gap: $spacing-sm
  align-items: center
  margin-top: $spacing-md
</style>
