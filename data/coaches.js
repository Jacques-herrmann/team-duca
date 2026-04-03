/**
 * Coaches — Science DUCA
 *
 * nameKey, roleKey, badgeKey : clés i18n (voir locales/fr.json → coaches)
 */

export const coaches = [
  {
    id: 'head',
    nameKey: 'coaches.duca.name',
    roleKey: 'coaches.duca.role',
    disciplines: ['mma', 'nogi', 'jjb'],
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=500&fit=crop&q=80',
    imageAlt: 'Portrait de Duca, Head Coach Science DUCA — cadrage serré épaules/visage, fond sombre neutre, regard direct caméra, tenue de sport ou kimono, traitement noir et blanc',
    badgeKey: 'coaches.badge.head',
  },
  {
    id: 'coach-2',
    nameKey: 'coaches.coach2.name',
    roleKey: 'coaches.coach2.role',
    disciplines: ['boxe'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop&q=80',
    imageAlt: 'Portrait coach Science DUCA — même style que Duca : portrait serré, fond sombre, noir et blanc, posture assurée, tenue sport',
    badgeKey: 'coaches.badge.coach',
  },
  {
    id: 'coach-3',
    nameKey: 'coaches.coach3.name',
    roleKey: 'coaches.coach3.role',
    disciplines: ['jjb', 'nogi'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=500&fit=crop&q=80',
    imageAlt: 'Portrait coach prépa physique Science DUCA — portrait serré, fond sombre, noir et blanc, en tenue de sport ou en action sur un exercice de prépa physique',
    badgeKey: 'coaches.badge.coach',
  },
]
