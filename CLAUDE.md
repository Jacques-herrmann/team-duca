# Science DUCA — Guide de développement

## Contexte projet

Site web du club de MMA **Science DUCA** (Marseille).
URL de production : `https://science-duca.fr`

Branche active : `refonte/design-pro-2026`

---

## Direction Artistique 2026

### Concept

**"Emblème de club underground + photographie documentaire combat"**
Identité artisanale brute (badge gravure, mascotte gorille) combinée à une typographie éditoriale massive et des photos de combat authentiques.
Deux pôles en tension : **emblème de club de boxe underground années 90** (organique, gravure, noir & blanc pur) et **exécution web contemporaine** (typographie display, mise en page cinématique).

> Ce n'est pas l'esthétique "corporate UFC / ESPN" — c'est plus viscéral, plus artisanal, plus brut.

### Esthétique

- **Grain-texture** — superposition subtile de `grain.png` sur les sections (overlay CSS, pas les photos)
- **Grain-film** — les photos elles-mêmes doivent avoir un grain photographique organique (pas un simple filtre désaturation) — visible dans `Hero.png`
- **Typographie display massive** — titres ultra-condensés, carré/brutal, superposés sur les photos
- **Éléments graphiques gravure/woodcut** — style linogravure : contraste fort, noir pur, pas de dégradés, rendu organique comme une gravure sur bois
- **Photos noir & blanc grain-film** — traitement documentaire authentique, pas juste désaturé

### Palette de couleurs

| Token | Valeur | Usage |
|---|---|---|
| `$black` | `#171717` | Fond principal |
| `$black-mid` | `#242424` | Fond sections secondaires |
| `$black-light` | `#2e2e2e` | Cards, surfaces élevées |
| `$white` | `#f9f9f9` | Texte principal, fond light |
| `$red` | `#E72640` | Accent ultra-ponctuel : CTA primaires, états hover, item actif nav — jamais décoratif ou structurant |
| `$gold` | `#C9A84C` | Accent vintage rare (badges spéciaux, tampons emblème) |

### Typographie

**Police display (titres)** : Dharma Gothic E — `font-weight: bold`, uppercase
→ Substitut web : Bebas Neue (Google Fonts), même rendu
**Police sous-titres/captions** : Barlow Condensed — weight 700–800, uppercase, espacé
**Police corps** : Barlow — weight 400, sobre et direct

> ⚠️ Playfair Display et Overpass sont supprimés de la DA. Ne pas les réintroduire.
> L'esthétique est dure et brute (fight club underground), pas vintage-élégante ni corporate-sportive.
> La typo doit sembler écrasée, carrée — rendu Impact/condensed brutal, pas display-sport arrondi.

**Hiérarchie :**
- Hero : `clamp(5rem, 20vw, 20rem)` — Dharma Gothic E, `font-weight: bold`, `line-height: 0.88`
- H1 : `clamp(2.5rem, 7vw, 7rem)` — Dharma Gothic E, bold
- H2 sections : `clamp(2rem, 5vw, 4rem)` — Dharma Gothic E, `line-height: 1`
- Captions/sous-titres : Barlow Condensed weight 700, uppercase, `letter-spacing: 0.08–0.15em` (mixin `caption`)
- Labels/stamps : Barlow Condensed weight 800, rouge, `letter-spacing: 0.3–0.35em` (mixin `stamp`)
- Corps de texte : Barlow weight 400, `line-height: 1.75` (mixin `text`)

**Outline text-stroke** : `1px` (pas plus — effet graphique, pas dominant)

### Identité visuelle — Emblème & Mascotte

**Logo** (`assets/images/logo.svg`) — Badge circulaire emblème :
- Illustration gorille face-split en style gravure/woodcut (linogravure)
- Bordure pointillée circulaire + banderole "SAMBO•JJB•MMA"
- Typographie condensed petites caps autour du cercle
- 100% N&B — ne jamais coloriser le logo
- Usage : header nav, certains fonds de section, éléments de marque

**Mascotte gorille** — L'animal rugissant est l'icône centrale du club.
- Style woodcut/gravure — contraste fort, noir pur
- Peut être réutilisé en overlay semi-transparent, watermark de fond, élément de section
- Ne jamais le traiter en couleur ou avec des effets "modernes" (dégradés, ombres portées)

**Style gravure/woodcut** — Règle pour tous les éléments graphiques custom :
- Contraste binaire fort (noir pur / blanc pur)
- Pas de dégradés, pas d'effets vectoriels lisses
- Rendu organique, traits irréguliers, texture artisanale

### Hero — Technique de mise en page

Le titre du Hero doit s'étaler EN SURIMPRESSION directe sur la photo :
- Texte split sur deux lignes (ex: "SCIENCES" / "DUCA"), ultra-massif
- Le texte déborde visuellement sur la photo — pas un bloc texte en dessous ou au-dessus
- `line-height: 0.88` ou moins — effet écrasé, carré, dense
- La photo et le texte occupent le même espace visuel (z-index, pas de séparation)

### Éléments graphiques réutilisables

- `components/GraphicDivider/` — séparateur ligne + ornement central (props : `ornament`, `color`)
- `components/AppBadge/` — badge/tampon stamp (props : `variant: red|dark|outline-red`, `size: sm|md`)
- `components/CornerDecor/` — coins décoratifs style imprimerie (à créer en phase 3)

---

## Stack technique

- **Framework** : Nuxt 3 (SSG — génération statique)
- **Nuxt** : 4.4.2 · **Vite** : 7.3.1 · **Vue** : 3.5.31
- **Langage** : TypeScript + Vue 3 Composition API
- **State** : Pinia — store `stores/app.ts` (isMobile, scroll, isTransitionVisible)
- **Animations** : GSAP (phase 3) · Lenis smooth scroll (phase 3) — stubs en place dans le store
- **Styles** : SASS — `assets/sass/main.sass` importé globalement via `nuxt.config.ts → additionalData`
- **Images** : `@nuxt/image`
- **i18n** : `@nuxtjs/i18n` v10 · FR (défaut) + EN · stratégie `prefix_except_default` · `restructureDir: false` · locales dans `locales/`
- **Formulaires** : Netlify Forms (phase 2) — pas de backend

> **Note** : Prismic CMS retiré. Contenu statique dans `data/*.ts` + `locales/*.json`.
> **Note i18n** : les `@` dans les valeurs JSON doivent être échappés `{'@'}` (ex: emails).

---

## Conventions de code

### Composants
- Nommage : PascalCase pour les fichiers, kebab-case dans les templates
- Structure : `components/Blocks/NomSection/index.vue` pour les sections de page
- Styles : SASS scoped dans chaque composant + variables SASS globales

#### Atoms disponibles (ne jamais recréer localement)
| Composant | Usage | Props clés |
|---|---|---|
| `AppButton` | Tous les CTA, liens, boutons submit | `variant: primary|outline|ghost-red|inverse`, `size: md|lg`, `to`, `href`, `type`, `disabled` |
| `AppBadge` | Tampons, étiquettes, labels positionnés | `variant: red|dark|outline-red`, `size: sm|md` |
| `AppTag` | Filtres actifs/inactifs espacés | `active`, `tag` |
| `AppInput` | Champs texte dans les formulaires | `modelValue`, `label`, `name`, `type`, `required`, `error` |
| `AppTextarea` | Zone texte dans les formulaires | `modelValue`, `label`, `name`, `rows`, `required`, `error` |
| `AppSelect` | Listes déroulantes | `modelValue`, `label`, `name`, `options[]`, `required`, `error` |

#### Molecules disponibles
| Composant | Usage | Props clés |
|---|---|---|
| `AppSectionHeader` | Label + h2 en tête de section (8 blocks/10) | `label`, `title`, `align: left|center` |
| `AppCard` | Surface card dark avec hover/highlight | `highlighted`, `tag` |
| `AppFeatureList` | Liste de features avec checkmark rouge | `features: string[]` |
| `AppPriceDisplay` | Affichage prix montant + unité | `amount`, `unit`, `size: md|lg` |
| `GraphicDivider` | Séparateur ligne + ornement | `ornament: diamond|cross|duca`, `color: red|gold|white` |

#### Règles absolues
- **Ne jamais redéfinir `.btn-primary`, `.btn-outline`, etc. localement** — utiliser `<AppButton>`
- **Ne jamais redéfinir `.form-group`, `.form-label`, `.form-input` localement** — utiliser `<AppInput>` / `<AppTextarea>`
- **Toujours passer les features i18n traduites** à `<AppFeatureList>` : `features.map(k => $t(k))`
- Les filtres en **groupe fusionné** (border merged, margin-left: -1px) restent en scoped local — AppTag est pour les filtres indépendants espacés

### SASS
- Variables globales dans `assets/sass/variables.sass`
- Mixins typographiques dans `assets/sass/font.sass`
- Import global via `nuxt.config.ts` → `additionalData`
- Classes boutons globales dans `assets/sass/base.sass` (`.btn-*`, `.section__label`, `.section__title`)

### Animations
- Utiliser les constantes de `assets/animations.ts` pour les valeurs GSAP
- IntersectionObserver via `composables/useIntersect.ts`
- Page transitions via `composables/usePageTransition.ts` + Pinia store

### Responsive
- Breakpoint mobile/desktop : **1024px** (détecté dans `app.vue` + Pinia)
- Mixins SASS : `@include lg` pour ≥ 992px, `@include xl` pour ≥ 1200px
- Mobile first par défaut

---

## Structure des pages

| Route | Fichier | Contenu |
|---|---|---|
| `/` | `pages/index.vue` | Home — toutes les sections |
| `/athletes` | `pages/athletes/index.vue` | Roster complet — pros + amateurs, palmarès, records |
| `/contact` | `pages/contact/index.vue` | Formulaire de contact |
| `/inscription` | `pages/inscription/index.vue` | Formulaire d'inscription (multi-step) |
| `/location-cage` | `pages/location-cage/index.vue` | Service location cage |
| `/prepa-physique` | `pages/prepa-physique/index.vue` | Programmes de préparation physique |
| `/merci` | `pages/merci/index.vue` | Page de confirmation |

---

## Sections home (ordre réel dans `pages/index.vue`)

1. **Hero** — titre split superposé sur photo + CTA
2. **Presentation** — texte club + chiffres clés
3. **Disciplines** — les 5 disciplines enseignées
4. **Coaches** — équipe (Duca + 2 coaches)
5. **AthletesTeaser** — teaser 2 athlètes pro (record W/L/N + CTA → `/athletes`)
6. **Abonnements** — 3 formules tarifaires
7. **Schedule** — programme des cours (grille par jour, couleurs par discipline)
8. **PrepaPhysique** — 3 programmes de préparation physique
9. **Testimonials** — témoignages athlètes (filtrables MMA / Prépa)
10. **JoinUs** — CTA rejoindre le club
11. **Sponsors** — partenaires

> **AthletesTeaser vs BlocksAthletes** : La home utilise `BlocksAthletesTeaser` (2 pros, record W/L/N, pas de palmarès détaillé). La page `/athletes` utilise `BlocksAthletes` (roster complet avec palmarès).

---

## Architecture fichiers de données

```
data/
  athletes.ts       — Athlete[] (id, name, nickname?, sports[], level, record?, bjjBelt?, palmare[])
                      + exports : proAthletes, amateurAthletes
                      + types : Discipline, AthleteSport, AthleteLevel, BjjBelt, PalmareResult
  coaches.ts        — Coach[] (id, nameKey, roleKey, image, imageAlt, badgeKey)
  keyfacts.ts       — KeyFact[] (value, labelKey)
  navigation.ts     — NavItem[] (labelKey, path, highlight?)
  programs.ts       — Program[] (id, titleKey, duration, price, features[], image)
  schedule.ts       — ScheduleItem[] (day, time, duration, titleKey, coachId, level, discipline)
                      + types : Day, Discipline
  sponsors.ts       — Sponsor[] (id, name, logo, url?)
  subscriptions.ts  — Subscription[] (id, price, features[], highlighted, ctaUrl)
  testimonials.ts   — Testimonial[] (id, name, quoteKey, tag: mma|prepa, image)

locales/
  fr.json           — toutes les clés i18n (FR, défaut)
  en.json           — miroir EN
```

### Convention features i18n

Les arrays `features` dans les data files stockent des **clés i18n**, pas des strings traduits.
Les features directement dans les locales (ex: `locationCage.featureItems.*`) utilisent le pattern `tm() + map(k => t(k))`.
Dans tous les cas, `<AppFeatureList>` reçoit toujours des strings résolus : `features.map(k => $t(k))`.

---

## Avancement phases

| Phase | Statut | Description |
|---|---|---|
| Phase 1 | ✅ Terminée | Cleanup · setup · contenu · data files · locales |
| Phase 2 | 🔄 En cours | Pages statiques (markup, sans animations) |
| Phase 3 | ⏳ À venir | Animations GSAP · Lenis · transitions |
| Phase 4 | ⏳ À venir | Perf · SEO · OpenGraph |
| Phase 5 | ⏳ À venir | Review + rapport hors-site (tunnel de vente, analytics) |

### Décisions d'architecture (Phase 2)

- **Page `/athletes` dédiée** — Les athlètes ont leur propre page (roster complet + palmarès). La home expose uniquement un teaser (`BlocksAthletesTeaser`) avec les 2 pros, le record W/L/N et un lien "Voir tous les athlètes".
- **Schedule discipline colors** — Chaque créneau a un champ `discipline` (`data/schedule.ts`). Le composant Schedule applique une `border-left` colorée : rouge = MMA, or = boxe/kickboxing, blanc léger = grappling/lutte/fitness/open.
- **Hero WebGL** — À implémenter en Phase 3 (effet actuel : photo statique).

### Éléments en attente (bloqués côté client)

| Élément | Ce qu'il faut |
|---|---|
| Hero — remplacement photo | Nouvel asset sans grille |
| Footer réseaux sociaux | URLs Instagram, Facebook, etc. |
| Schedule — horaires complets | Vrais créneaux du club |
| DA Présentation / Disciplines / Abonnements | Session de review design |
