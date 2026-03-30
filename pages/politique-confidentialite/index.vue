<template>
  <main class="legal-page">

    <header class="legal-page__header">
      <span class="section__label">{{ $t('politiqueConfidentialite.label') }}</span>
      <h1 class="legal-page__title">{{ $t('politiqueConfidentialite.title') }}</h1>
    </header>

    <div class="legal-page__content">

      <section class="legal-section">
        <h2 class="legal-section__title">Responsable du traitement</h2>
        <p><strong>Science DUCA</strong><br>
        268 Avenue de la Capelette, Bâtiment G, 1er étage<br>
        13010 Marseille, France<br>
        Email : <a href="mailto:contact@science-duca.fr" class="legal-link">contact@science-duca.fr</a></p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Données collectées</h2>
        <p>Dans le cadre de l'utilisation de ce site, nous collectons les données personnelles suivantes :</p>
        <ul class="legal-list">
          <li><strong>Formulaire de contact</strong> — nom, adresse email, message</li>
          <li><strong>Formulaire d'inscription</strong> — prénom, nom, adresse email, numéro de téléphone (optionnel), service choisi, formule sélectionnée, message (optionnel)</li>
        </ul>
        <p>Ces données sont transmises via <strong>Netlify Forms</strong> et stockées sur les serveurs de Netlify, Inc. Aucune donnée de paiement n'est collectée directement par ce site.</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Finalités et bases légales</h2>
        <ul class="legal-list">
          <li>Traitement de vos demandes de contact — <em>base légale : intérêt légitime</em></li>
          <li>Gestion des demandes d'inscription et des renseignements sur les formules — <em>base légale : exécution d'un contrat (pré-contractuel)</em></li>
          <li>Réponse aux questions relatives aux services proposés — <em>base légale : intérêt légitime</em></li>
        </ul>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Durée de conservation</h2>
        <p>Vos données sont conservées pendant une durée de <strong>3 ans</strong> à compter de votre dernier contact avec Science DUCA, ou jusqu'à l'exercice de votre droit à l'effacement.</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Destinataires des données</h2>
        <p>Vos données sont accessibles aux seuls membres de l'équipe Science DUCA habilités à traiter les demandes. Elles ne sont ni vendues, ni louées, ni cédées à des tiers.</p>
        <p>Sous-traitant technique : <strong>Netlify, Inc.</strong> (hébergeur des formulaires) — soumis aux clauses contractuelles types RGPD.</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
        <ul class="legal-list">
          <li><strong>Droit d'accès</strong> — obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
          <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
          <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
          <li><strong>Droit d'opposition</strong> — s'opposer à un traitement fondé sur l'intérêt légitime</li>
          <li><strong>Droit à la limitation</strong> — restreindre temporairement le traitement</li>
        </ul>
        <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@science-duca.fr" class="legal-link">contact@science-duca.fr</a></p>
        <p>En cas de réclamation non résolue, vous pouvez saisir la <strong>CNIL</strong> (<a href="https://www.cnil.fr" class="legal-link" target="_blank" rel="noopener noreferrer">cnil.fr</a>).</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Cookies</h2>
        <p>Ce site n'utilise <strong>aucun cookie publicitaire ou de tracking</strong>. Aucune donnée de navigation n'est transmise à des régies publicitaires ou à des services d'analyse tiers.</p>
        <p>Des cookies techniques strictement nécessaires au fonctionnement du site (session, préférences de langue) peuvent être déposés. Ils ne nécessitent pas de consentement préalable.</p>
      </section>

      <GraphicDivider ornament="diamond" color="white" />

      <section class="legal-section">
        <h2 class="legal-section__title">Contact</h2>
        <p>Pour toute question relative à la protection de vos données personnelles :</p>
        <p><a href="mailto:contact@science-duca.fr" class="legal-link">contact@science-duca.fr</a><br>
        Science DUCA — 268 Avenue de la Capelette, 13010 Marseille</p>
        <p class="legal-section__update">Dernière mise à jour : {{ lastUpdate }}</p>
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
const lastUpdate = new Date(2026, 2, 1).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

useHead({ title: 'Politique de confidentialité — Science DUCA MMA Marseille' })
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
  @include title(clamp(2.5rem, 6vw, 7rem))
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

  em
    color: rgba($white, 0.45)
    font-style: italic

.legal-section__update
  @include caption(0.7rem)
  color: rgba($white, 0.3)
  margin-top: $spacing-sm

// ─── Liste ───────────────────────────────────────────────────
.legal-list
  list-style: none
  padding: 0
  margin: 0
  display: flex
  flex-direction: column
  gap: 0.6rem

  li
    @include text(0.95rem)
    color: rgba($white, 0.7)
    line-height: 1.75
    padding-left: 1.2rem
    position: relative

    &::before
      content: '—'
      position: absolute
      left: 0
      color: $red
      font-weight: bold

    strong
      color: $white
      font-weight: 600

    em
      color: rgba($white, 0.4)
      font-style: italic

// ─── Links ───────────────────────────────────────────────────
.legal-link
  color: $red
  text-decoration: none
  transition: opacity $transition-fast

  &:hover
    opacity: 0.75
</style>
