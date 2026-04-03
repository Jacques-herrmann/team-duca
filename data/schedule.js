/**
 * Calendrier des cours — Science DUCA
 * ─────────────────────────────────────────────────────────────
 *
 * DISCIPLINES (champ `discipline`) :
 *   mma   → MMA (cours complet, toutes techniques)
 *   nogi  → No-Gi (grappling sans kimono)
 *   boxe  → Boxe anglaise
 *   jjb   → Jiu-Jitsu Brésilien (avec kimono)
 *   open  → Open Mat (pratique libre encadrée)
 *
 * NIVEAUX (champ `level`) :
 *   all         → Tous publics
 *   competition → Compétiteurs
 *   women       → Femme
 *   kids        → Enfant
 *
 * JOURS (champ `day`) :
 *   lundi | mardi | mercredi | jeudi | vendredi | samedi
 *
 * TITRE (champ `titleKey`) :
 *   Clé i18n du nom affiché dans le calendrier.
 *   Clés disponibles : schedule.mma · schedule.nogi · schedule.boxe
 *                      schedule.jjb · schedule.openMat
 *   Ajouter une clé personnalisée dans locales/fr.json → schedule si besoin.
 *
 * DURÉE : en minutes  |  HEURE : format 'HHhMM' (ex : '18h30')
 *
 * Pour ajouter un créneau, copier un bloc et modifier les valeurs.
 * ─────────────────────────────────────────────────────────────
 */

export const schedule = [
  // ─── Lundi ────────────────────────────────────────────────
  { id: 's1',  day: 'lundi',    time: '10h00', duration: 60,  titleKey: 'schedule.boxe',    coachId: 'coach-2', level: 'all',         discipline: 'boxe' },
  { id: 's2',  day: 'lundi',    time: '12h00', duration: 60,  titleKey: 'schedule.jjb',     coachId: 'duca',    level: 'all',         discipline: 'jjb' },
  { id: 's3',  day: 'lundi',    time: '18h30', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's4',  day: 'lundi',    time: '20h00', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'competition', discipline: 'mma' },

  // ─── Mardi ────────────────────────────────────────────────
  { id: 's5',  day: 'mardi',    time: '09h30', duration: 60,  titleKey: 'schedule.boxe',    coachId: 'coach-2', level: 'women',       discipline: 'boxe' },
  { id: 's6',  day: 'mardi',    time: '12h00', duration: 60,  titleKey: 'schedule.nogi',    coachId: 'coach-2', level: 'all',         discipline: 'nogi' },
  { id: 's7',  day: 'mardi',    time: '18h30', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's8',  day: 'mardi',    time: '20h00', duration: 90,  titleKey: 'schedule.jjb',     coachId: 'coach-2', level: 'all',         discipline: 'jjb' },

  // ─── Mercredi ─────────────────────────────────────────────
  { id: 's9',  day: 'mercredi', time: '10h00', duration: 60,  titleKey: 'schedule.mma',     coachId: 'coach-3', level: 'kids',        discipline: 'mma' },
  { id: 's10', day: 'mercredi', time: '12h00', duration: 60,  titleKey: 'schedule.boxe',    coachId: 'duca',    level: 'all',         discipline: 'boxe' },
  { id: 's11', day: 'mercredi', time: '18h30', duration: 90,  titleKey: 'schedule.nogi',    coachId: 'coach-2', level: 'all',         discipline: 'nogi' },
  { id: 's12', day: 'mercredi', time: '20h00', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'competition', discipline: 'mma' },

  // ─── Jeudi ────────────────────────────────────────────────
  { id: 's13', day: 'jeudi',    time: '09h00', duration: 60,  titleKey: 'schedule.jjb',     coachId: 'coach-3', level: 'all',         discipline: 'jjb' },
  { id: 's14', day: 'jeudi',    time: '12h00', duration: 60,  titleKey: 'schedule.boxe',    coachId: 'duca',    level: 'all',         discipline: 'boxe' },
  { id: 's15', day: 'jeudi',    time: '18h30', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's16', day: 'jeudi',    time: '20h00', duration: 90,  titleKey: 'schedule.nogi',    coachId: 'coach-2', level: 'competition', discipline: 'nogi' },

  // ─── Vendredi ─────────────────────────────────────────────
  { id: 's17', day: 'vendredi', time: '10h00', duration: 60,  titleKey: 'schedule.jjb',     coachId: 'coach-2', level: 'all',         discipline: 'jjb' },
  { id: 's18', day: 'vendredi', time: '12h00', duration: 60,  titleKey: 'schedule.boxe',    coachId: 'coach-2', level: 'women',       discipline: 'boxe' },
  { id: 's19', day: 'vendredi', time: '18h30', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's20', day: 'vendredi', time: '20h00', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'competition', discipline: 'mma' },

  // ─── Samedi ───────────────────────────────────────────────
  { id: 's21', day: 'samedi',   time: '10h00', duration: 120, titleKey: 'schedule.openMat', coachId: 'duca',    level: 'all',         discipline: 'open' },
  { id: 's22', day: 'samedi',   time: '13h00', duration: 90,  titleKey: 'schedule.mma',     coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's23', day: 'samedi',   time: '15h00', duration: 90,  titleKey: 'schedule.jjb',     coachId: 'coach-2', level: 'all',         discipline: 'jjb' },
]
