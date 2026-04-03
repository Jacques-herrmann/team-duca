/**
 * Témoignages — Science DUCA
 *
 * disciplineKey, quoteKey : clés i18n (voir locales/fr.json → testimonials, disciplines)
 * tag : 'mma' | 'prepa' (filtre d'affichage)
 */

export const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Karim B.',
    disciplineKey: 'disciplines.items.mma.title',
    quoteKey: 'testimonials.karim.quote',
    tag: 'mma',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=112&h=112&fit=crop&q=80',
    imageAlt: 'Portrait carré de Karim, athlète MMA Science DUCA, en tenue de sport, sourire naturel — photo authentique non posée, fond neutre sombre',
  },
  {
    id: 'testimonial-2',
    name: 'Sofia M.',
    disciplineKey: 'disciplines.items.boxe.title',
    quoteKey: 'testimonials.sofia.quote',
    tag: 'mma',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=112&h=112&fit=crop&q=80',
    imageAlt: 'Portrait carré de Sofia, pratiquante boxe Science DUCA, bandages aux mains, regard confiant — photo authentique, lumière directionnelle sombre',
  },
  {
    id: 'testimonial-3',
    name: 'Thomas R.',
    disciplineKey: 'programs.fondations.profile',
    quoteKey: 'testimonials.thomas.quote',
    tag: 'prepa',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=112&h=112&fit=crop&q=80',
    imageAlt: 'Portrait carré de Thomas, participant programme Fondations — portrait en action pendant une séance de prépa physique, fond sombre, sueur visible sur le visage',
  },
  {
    id: 'testimonial-4',
    name: 'Mehdi L.',
    disciplineKey: 'programs.combatReady.profile',
    quoteKey: 'testimonials.mehdi.quote',
    tag: 'prepa',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=112&h=112&fit=crop&q=80',
    imageAlt: 'Portrait carré de Mehdi, programme Combat Ready — tenue MMA, gants suspendus autour du cou, photo dans la salle d\'entraînement Science DUCA',
  },
]
