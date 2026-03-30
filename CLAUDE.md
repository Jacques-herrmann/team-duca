# Science DUCA — Guide de développement

## Contexte projet

Site web du club de MMA **Science DUCA** (Marseille).
URL de production : `https://science-duca.fr`

Branche active : `refonte/design-pro-2026`

---

## Direction Artistique 2026

### Concept

**"Boxe old school + modernité"**
Garder l'image de dureté du MMA tout en ajoutant accessibilité et lisibilité moderne.
Référence : affiche de combat vintage avec exécution web soignée.

### Esthétique

- **Grain / texture papier** — superposition subtile de `grain.png` sur les sections
- **Typographie display massive** — titres très grands, style imprimerie/affiche
- **Éléments graphiques** — tampons, traits, badges, ornements (SVG ou CSS)
- **Photos noir & blanc** — traitement monochrome ou désaturé sur les images du club

### Palette de couleurs

| Token | Valeur | Usage |
|---|---|---|
| `$black` | `#171717` | Fond principal |
| `$black-mid` | `#242424` | Fond sections secondaires |
| `$black-light` | `#2e2e2e` | Cards, surfaces élevées |
| `$white` | `#f9f9f9` | Texte principal, fond light |
| `$red` | `#E72640` | Accent principal, hover, CTA |
| `$gold` | `#C9A84C` | Accent vintage optionnel (badges, tampons) |

### Typographie

**Police display (titres)** : Dharma Gothic E — `font-weight: bold`, uppercase
→ Substitut web : Bebas Neue (Google Fonts), même rendu
**Police sous-titres/captions** : Barlow Condensed — weight 700–800, uppercase, espacé
**Police corps** : Barlow — weight 400, sobre et direct

> ⚠️ Playfair Display et Overpass sont supprimés de la DA. Ne pas les réintroduire.
> L'esthétique est dure et éditoriale (UFC / ESPN), pas vintage-élégante.

**Hiérarchie :**
- Hero : `clamp(5rem, 20vw, 20rem)` — Dharma Gothic E, `font-weight: bold`, `line-height: 0.88`
- H1 : `clamp(2.5rem, 7vw, 7rem)` — Dharma Gothic E, bold
- H2 sections : `clamp(2rem, 5vw, 4rem)` — Dharma Gothic E, `line-height: 1`
- Captions/sous-titres : Barlow Condensed weight 700, uppercase, `letter-spacing: 0.08–0.15em` (mixin `caption`)
- Labels/stamps : Barlow Condensed weight 800, rouge, `letter-spacing: 0.3–0.35em` (mixin `stamp`)
- Corps de texte : Barlow weight 400, `line-height: 1.75` (mixin `text`)

**Outline text-stroke** : `1px` (pas plus — effet graphique, pas dominant)

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
| `/contact` | `pages/contact/index.vue` | Formulaire de contact |
| `/inscription` | `pages/inscription/index.vue` | Formulaire d'inscription |
| `/location-cage` | `pages/location-cage/index.vue` | Service location cage |
| `/merci` | `pages/merci/index.vue` | Page de confirmation |

---

## Sections prévues (home)

1. **Hero** — titre massif + CTA
2. **PresentationClub** — texte club + chiffres clés
3. **Disciplines** — les 5 disciplines enseignées
4. **Coaches** — équipe (Duca + 2 coaches)
5. **Abonnements** — 3 formules tarifaires
6. **Schedule** — programme des cours (grille par jour)
7. **PrepaPhysique** — 3 programmes de préparation physique
8. **Testimonials** — témoignages athlètes (filtrables MMA / Prépa)
9. **JoinUs** — CTA rejoindre le club
10. **Sponsors** — partenaires

---

## Architecture fichiers de données

```
data/
  coaches.ts        — Coach[] (id, nameKey, roleKey, image, imageAlt, badgeKey)
  keyfacts.ts       — KeyFact[] (value, labelKey)
  navigation.ts     — NavItem[] (labelKey, path, highlight?)
  programs.ts       — Program[] (id, titleKey, duration, price, features[], image)
  schedule.ts       — ScheduleItem[] (day, time, duration, titleKey, coachId, level)
  sponsors.ts       — Sponsor[] (id, name, logo, url?)
  subscriptions.ts  — Subscription[] (id, price, features[], highlighted, ctaUrl)
  testimonials.ts   — Testimonial[] (id, name, quoteKey, tag: mma|prepa, image)

locales/
  fr.json           — toutes les clés i18n (FR, défaut)
  en.json           — miroir EN
```

---

## Avancement phases

| Phase | Statut | Description |
|---|---|---|
| Phase 1 | ✅ Terminée | Cleanup · setup · contenu · data files · locales |
| Phase 2 | 🔄 En cours | Pages statiques (markup, sans animations) |
| Phase 3 | ⏳ À venir | Animations GSAP · Lenis · transitions |
| Phase 4 | ⏳ À venir | Perf · SEO · OpenGraph |
| Phase 5 | ⏳ À venir | Review + rapport hors-site (tunnel de vente, analytics) |
