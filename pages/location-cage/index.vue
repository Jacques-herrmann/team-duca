<template>
  <main class="cage-page">
    <div class="cage-page__hero">
      <span class="section__label">{{ $t('locationCage.label') }}</span>
      <h1 class="cage-page__title">Location<br><span class="cage-page__title-outline">Cage</span></h1>
    </div>

    <div class="cage-page__body">
      <div class="cage-page__left">
        <p class="cage-page__desc">{{ $t('locationCage.description') }}</p>
        <AppFeatureList :features="features" class="cage-page__features" />
        <AppButton :to="localePath('/inscription?service=cage')" variant="primary">
          {{ $t('locationCage.cta') }}
        </AppButton>
      </div>

      <div class="cage-page__image">
        <AppImage
          src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=700&h=500&fit=crop&q=80"
          alt="Cage MMA homologuée compétition — Science DUCA Marseille, éclairage de salle professionnelle, vue d'ensemble depuis l'extérieur de la cage"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { tm } = useI18n()

const features = computed(() => tm('locationCage.features') as string[])

useHead({ title: 'Location Cage MMA Marseille — Science DUCA' })
</script>

<style scoped lang="sass">
.cage-page
  min-height: 100vh
  padding: $spacing-xl $spacing-md

  @include lg
    padding: $spacing-xxl 90px

// ─── Hero ────────────────────────────────────────────────────
.cage-page__hero
  margin-bottom: $spacing-xl

.cage-page__title
  @include title(clamp(4rem, 10vw, 10rem))
  color: $white
  margin-top: $spacing-sm
  line-height: 0.88

.cage-page__title-outline
  -webkit-text-stroke: 1px $white
  color: transparent

// ─── Body ────────────────────────────────────────────────────
.cage-page__body
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-xl

  @include lg
    grid-template-columns: 1fr 1fr
    gap: $spacing-xxl
    align-items: start

// ─── Left ────────────────────────────────────────────────────
.cage-page__desc
  @include text(1rem)
  color: rgba($white, 0.75)
  line-height: 1.8
  margin: 0 0 $spacing-lg

.cage-page__features
  margin-bottom: $spacing-lg

// ─── Image ───────────────────────────────────────────────────
.cage-page__image
  aspect-ratio: 7 / 5
  overflow: hidden
  border: 1px solid rgba($white, 0.06)
</style>
