<template>
  <main class="legal-page">

    <header class="legal-page__header">
      <span class="section__label">{{ $t('mentionsLegales.label') }}</span>
      <h1 class="legal-page__title">{{ $t('mentionsLegales.title') }}</h1>
    </header>

    <div class="legal-page__content">

      <section class="legal-section">
        <h2 class="legal-section__title">Éditeur du site</h2>
        <p>Le présent site <strong>science-duca.fr</strong> est édité par :</p>
        <p><strong>Science DUCA</strong><br>
        268 Avenue de la Capelette, Bâtiment G, 1er étage<br>
        13010 Marseille, France</p>
        <p>Email : <a href="mailto:contact@science-duca.fr" class="legal-link">contact@science-duca.fr</a></p>
        <p>Directeur de la publication : [Nom légal du responsable à renseigner]</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Hébergement</h2>
        <p>Ce site est hébergé par :</p>
        <p><strong>Netlify, Inc.</strong><br>
        512 2nd Street, Suite 200<br>
        San Francisco, CA 94107, États-Unis<br>
        <a href="https://www.netlify.com" class="legal-link" target="_blank" rel="noopener noreferrer">www.netlify.com</a></p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Propriété intellectuelle</h2>
        <p>L'ensemble des contenus présents sur ce site (textes, photographies, logo, design, structure) sont la propriété exclusive de <strong>Science DUCA</strong> et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
        <p>Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Science DUCA.</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Limitation de responsabilité</h2>
        <p>Les informations contenues sur ce site sont aussi précises que possible. Elles peuvent toutefois contenir des inexactitudes ou des omissions. Science DUCA ne saurait être tenu responsable de tout dommage direct ou indirect découlant de l'utilisation du présent site.</p>
        <p>Des liens hypertextes peuvent renvoyer vers d'autres ressources. Science DUCA ne contrôle pas ces sites tiers et décline toute responsabilité quant à leur contenu.</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Données personnelles</h2>
        <p>Les données collectées via les formulaires de contact et d'inscription sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). Pour en savoir plus, consultez notre
          <nuxt-link :to="localePath('/politique-confidentialite')" class="legal-link">Politique de confidentialité</nuxt-link>.
        </p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Droit applicable et juridiction</h2>
        <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux de <strong>Marseille</strong> seront seuls compétents, sauf disposition légale contraire.</p>
        <p class="legal-section__update">Dernière mise à jour : {{ lastUpdate }}</p>
      </section>

    </div>
  </main>
</template>

<script setup>
const localePath = useLocalePath()

const lastUpdate = new Date(2026, 2, 1).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

useHead({ title: 'Mentions légales — Science DUCA MMA Marseille' })
</script>

<style scoped lang="sass">
.legal-page
  min-height: 100vh
  padding: $spacing-xl $spacing-md

  @include lg
    padding: $spacing-xxl 90px
    max-width: 860px

// ─── Header ──────────────────────────────────────────────────
.legal-page__header
  margin-bottom: $spacing-xl

.legal-page__title
  @include title(clamp(3.5rem, 8vw, 8rem))
  color: $white
  margin: 0
  line-height: 0.88

// ─── Content ─────────────────────────────────────────────────
.legal-page__content
  display: flex
  flex-direction: column
  gap: $spacing-lg

// ─── Section ─────────────────────────────────────────────────
.legal-section
  display: flex
  flex-direction: column
  gap: $spacing-sm

.legal-section__title
  @include h3(clamp(1.6rem, 3vw, 2.8rem))
  color: $white
  margin: 0 0 $spacing-sm

.legal-section p
  @include text(0.95rem)
  color: rgba($white, 0.7)
  margin: 0
  line-height: 1.85

  strong
    color: $white
    font-weight: 600

.legal-section__update
  @include caption(0.7rem)
  color: rgba($white, 0.3)
  margin-top: $spacing-sm

// ─── Links ───────────────────────────────────────────────────
.legal-link
  color: $red
  text-decoration: none
  transition: opacity $transition-fast

  &:hover
    opacity: 0.75
</style>
