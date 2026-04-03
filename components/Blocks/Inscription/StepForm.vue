<template>
  <div class="inscription-step">
    <h2 class="inscription-step__title">{{ $t('inscription.step3.title') }}</h2>
    <form
        name="inscription"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/merci"
        class="inscription-form"
    >
      <input type="hidden" name="form-name" value="inscription" />
      <input type="hidden" name="service" :value="service || ''" />
      <input type="hidden" name="plan" :value="plan || ''" />
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
        <AppButton variant="outline" type="button" @click="$emit('prev')">{{ $t('inscription.back') }}</AppButton>
        <AppButton variant="primary" type="submit">{{ $t('inscription.form.submit') }}</AppButton>
      </div>
    </form>
  </div>
</template>

<script setup>
defineProps({
  service: { type: String, default: null },
  plan:    { type: String, default: null },
})
defineEmits(['prev'])
</script>

<style scoped lang="sass">
.inscription-step__title
  @include title(clamp(2rem, 5vw, 4rem))
  color: $white
  margin-bottom: $spacing-lg

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

.inscription-nav
  display: flex
  gap: $spacing-sm
  align-items: center
  margin-top: $spacing-md
</style>
