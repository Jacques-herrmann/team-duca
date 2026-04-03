/**
 * Programmes de préparation physique — Science DUCA
 *
 * titleKey, profileKey : clés i18n (voir locales/fr.json → programs)
 * features             : tableau de clés i18n (voir locales/fr.json → programs.features)
 */

export const programs = [
  {
    id: 'fondations',
    titleKey: 'programs.fondations.title',
    profileKey: 'programs.fondations.profile',
    duration: 8,
    price: 79,
    features: [
      'programs.features.pdfProgram',
      'programs.features.nutritionGuide',
      'programs.features.weeklyVideos',
      'programs.features.supportGroup',
    ],
    testimonialIds: ['testimonial-3'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80',
    imageAlt: 'Athlète débutant en tenue de sport, travaillant les bases de la condition physique sur sac de frappe — ambiance salle de sport sombre, éclairage dramatique sur le sujet',
    ctaUrl: '/inscription?programme=fondations',
  },
  {
    id: 'combat-ready',
    titleKey: 'programs.combatReady.title',
    profileKey: 'programs.combatReady.profile',
    duration: 12,
    price: 119,
    features: [
      'programs.features.pdfProgram',
      'programs.features.nutritionGuide',
      'programs.features.weeklyVideos',
      'programs.features.supportGroup',
      'programs.features.weeklyCoachFeedback',
      'programs.features.sparringProtocol',
    ],
    testimonialIds: ['testimonial-4'],
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop&q=80',
    imageAlt: 'Combattant MMA en pleine session de sparring dans la cage, gants rouges, regard concentré — noir et blanc avec accent rouge sur les gants',
    ctaUrl: '/inscription?programme=combat-ready',
  },
  {
    id: 'elite',
    titleKey: 'programs.elite.title',
    profileKey: 'programs.elite.profile',
    duration: 16,
    price: 149,
    features: [
      'programs.features.pdfProgram',
      'programs.features.nutritionGuide',
      'programs.features.weeklyVideos',
      'programs.features.supportGroup',
      'programs.features.weeklyCoachFeedback',
      'programs.features.sparringProtocol',
      'programs.features.competitionPrep',
      'programs.features.privateSession',
    ],
    testimonialIds: ['testimonial-5'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&q=80',
    imageAlt: 'Compétiteur MMA photographié en contre-plongée dans la cage pendant un combat officiel — atmosphère salle de combat professionnelle, supporters flous en arrière-plan',
    ctaUrl: '/inscription?programme=elite',
  },
]
