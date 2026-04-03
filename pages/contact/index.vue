<template>
  <main class="contact-page">
    <div class="contact-page__header">
      <span class="section__label">{{ $t('contact.label') }}</span>
      <h1 class="contact-page__title">Contact</h1>
    </div>

    <div class="contact-page__body">
      <!-- Infos -->
      <div class="contact-infos">
        <div class="contact-infos__block">
          <span class="contact-infos__label">{{ $t('contact.labelAddress') }}</span>
          <p class="contact-infos__value">{{ $t('contact.address') }}</p>
          <p class="contact-infos__value">{{ $t('contact.addressDetail') }}</p>
          <p class="contact-infos__value">{{ $t('contact.city') }}</p>
        </div>
        <div class="contact-infos__block">
          <span class="contact-infos__label">Email</span>
          <p class="contact-infos__value">{{ $t('contact.email') }}</p>
        </div>
        <div class="contact-infos__block">
          <span class="contact-infos__label">{{ $t('contact.labelHours') }}</span>
          <p class="contact-infos__value">{{ $t('contact.hours') }}</p>
        </div>
        <!-- Carte placeholder -->
        <div class="contact-map">
          <AppImage
            src="https://placehold.co/600x350/242424/E72640?text=Google+Maps"
            alt="Carte Google Maps — 268 Avenue de la Capelette, 13010 Marseille — Science DUCA"
          />
        </div>
      </div>

      <!-- Formulaire -->
      <div class="contact-form-wrap">
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/merci"
          class="contact-form"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input name="bot-field" type="text" class="hidden-field" tabindex="-1" autocomplete="off" />
          <AppInput name="name" :label="$t('contact.form.name')" required />
          <AppInput name="email" type="email" :label="$t('contact.form.email')" required />
          <AppTextarea name="message" :label="$t('contact.form.message')" :rows="6" required />
          <AppButton type="submit" variant="primary">{{ $t('contact.form.submit') }}</AppButton>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
useHead({ title: 'Contact — Science DUCA MMA Marseille' })
</script>

<style scoped lang="sass">
.contact-page
  min-height: 100vh
  padding: $spacing-xl $spacing-md

  @include lg
    padding: $spacing-xxl 90px

.contact-page__header
  margin-bottom: $spacing-lg

.contact-page__title
  @include title(clamp(4rem, 10vw, 10rem))
  color: $white
  margin: 0
  line-height: 0.88

// ─── Body ────────────────────────────────────────────────────
.contact-page__body
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-xl

  @include lg
    grid-template-columns: 1fr 1fr
    gap: $spacing-xxl

// ─── Infos ───────────────────────────────────────────────────
.contact-infos
  display: flex
  flex-direction: column
  gap: $spacing-lg

.contact-infos__block
  display: flex
  flex-direction: column
  gap: 0.4rem

.contact-infos__label
  @include stamp(0.65rem)

.contact-infos__value
  @include text(0.95rem)
  color: rgba($white, 0.7)
  margin: 0

.contact-map
  aspect-ratio: 16 / 9
  overflow: hidden
  border: 1px solid rgba($white, 0.08)

// ─── Form ────────────────────────────────────────────────────
.contact-form
  display: flex
  flex-direction: column
  gap: $spacing-md

.hidden-field
  position: absolute
  left: -9999px
  opacity: 0
  pointer-events: none
</style>
