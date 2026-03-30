<template>
  <section class="hero">
    <div class="hero__bg">
      <AppImage
          src="/images/hero/index.png"
          alt="Salle d'entraînement Science DUCA — cage MMA, sacs de frappe, éclairage dramatique sombre, ambiance club professionnel Marseille"
      />
    </div>
    <div class="hero__content">
      <span class="hero__eyebrow">{{ $t('hero.eyebrow') }}</span>
      <h1 class="hero__title">
        SCIENCE<br>DUCA<br>
      </h1>
      <p class="hero__subtitle">{{ $t('hero.subtitle') }}</p>
      <div class="hero__ctas">
        <AppButton :to="localePath('/inscription')" variant="primary" size="lg">
          {{ $t('hero.ctaPrimary') }}
        </AppButton>
        <AppButton :to="localePath('/prepa-physique')" variant="outline" size="lg">
          {{ $t('hero.ctaSecondary') }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style scoped lang="sass">
.hero
  position: relative
  min-height: 100svh
  display: flex
  align-items: flex-end
  overflow: hidden

// ─── Background ──────────────────────────────────────────────
.hero__bg
  position: absolute
  inset: 0
  z-index: 0

  &::after
    content: ''
    position: absolute
    inset: 0
    background: $gradient-full
    z-index: 1

// ─── Content ─────────────────────────────────────────────────
.hero__content
  position: relative
  z-index: 2
  @include section-pad($spacing-xl, $spacing-xl, $spacing-xl, $spacing-xxl)
  width: 100%

// ─── Eyebrow ─────────────────────────────────────────────────
.hero__eyebrow
  @include stamp
  display: block
  margin-bottom: $spacing-sm

// ─── Title ───────────────────────────────────────────────────
.hero__title
  @include title(clamp(4rem, 12vw, 8rem))
  line-height: 0.88
  font-weight: 900
  color: $white
  margin: 0 0 $spacing-md

  @include lg
    font-size: clamp(5rem, 20vw, 10rem)

.hero__title-outline
  -webkit-text-stroke: 1px $white
  color: transparent

// ─── Subtitle ────────────────────────────────────────────────
.hero__subtitle
  @include sub(1.1rem)
  color: rgba($white, 0.6)
  margin: 0 0 $spacing-lg
  max-width: 40ch

  @include lg
    font-size: 1.3rem

// ─── CTAs ────────────────────────────────────────────────────
.hero__ctas
  display: flex
  flex-wrap: wrap
  gap: $spacing-sm
</style>
