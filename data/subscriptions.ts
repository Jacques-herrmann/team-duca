export interface Subscription {
  id: string
  titleKey: string
  descriptionKey: string
  price: number
  priceUnit: string
  features: string[]
  highlighted: boolean
  ctaKey: string
  ctaUrl: string
}

export const subscriptions: Subscription[] = [
  {
    id: 'decouverte',
    titleKey: 'subscriptions.decouverte.title',
    descriptionKey: 'subscriptions.decouverte.description',
    price: 49,
    priceUnit: 'mois',
    features: [
      'subscriptions.features.oneClass',
      'subscriptions.features.equipment',
      'subscriptions.features.community',
    ],
    highlighted: false,
    ctaKey: 'cta.join',
    ctaUrl: '/inscription?formule=decouverte',
  },
  {
    id: 'standard',
    titleKey: 'subscriptions.standard.title',
    descriptionKey: 'subscriptions.standard.description',
    price: 79,
    priceUnit: 'mois',
    features: [
      'subscriptions.features.twoClasses',
      'subscriptions.features.equipment',
      'subscriptions.features.community',
      'subscriptions.features.sparring',
    ],
    highlighted: true,
    ctaKey: 'cta.join',
    ctaUrl: '/inscription?formule=standard',
  },
  {
    id: 'illimite',
    titleKey: 'subscriptions.illimite.title',
    descriptionKey: 'subscriptions.illimite.description',
    price: 119,
    priceUnit: 'mois',
    features: [
      'subscriptions.features.unlimited',
      'subscriptions.features.equipment',
      'subscriptions.features.community',
      'subscriptions.features.sparring',
      'subscriptions.features.competition',
      'subscriptions.features.privateAccess',
    ],
    highlighted: false,
    ctaKey: 'cta.join',
    ctaUrl: '/inscription?formule=illimite',
  },
]
