export type Day = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi'
export type Discipline = 'mma' | 'boxe' | 'kickboxing' | 'grappling' | 'lutte' | 'fitness' | 'open'

export interface ScheduleItem {
  id: string
  day: Day
  time: string
  duration: number
  titleKey: string
  coachId: string
  level: 'all' | 'advanced' | 'competition'
  discipline: Discipline
}

export const schedule: ScheduleItem[] = [
  // ─── Lundi ────────────────────────────────────────────────
  { id: 's1',  day: 'lundi',    time: '10h00', duration: 60,  titleKey: 'schedule.fitnessMma',                coachId: 'coach-2', level: 'all',         discipline: 'fitness' },
  { id: 's2',  day: 'lundi',    time: '12h00', duration: 60,  titleKey: 'disciplines.items.boxe.title',       coachId: 'duca',    level: 'all',         discipline: 'boxe' },
  { id: 's3',  day: 'lundi',    time: '18h30', duration: 90,  titleKey: 'disciplines.items.boxe.title',       coachId: 'duca',    level: 'all',         discipline: 'boxe' },
  { id: 's4',  day: 'lundi',    time: '20h00', duration: 90,  titleKey: 'schedule.mmaAdvanced',               coachId: 'duca',    level: 'advanced',    discipline: 'mma' },

  // ─── Mardi ────────────────────────────────────────────────
  { id: 's5',  day: 'mardi',    time: '09h00', duration: 60,  titleKey: 'schedule.fitnessMma',                coachId: 'coach-2', level: 'all',         discipline: 'fitness' },
  { id: 's6',  day: 'mardi',    time: '12h00', duration: 60,  titleKey: 'disciplines.items.grappling.title',  coachId: 'coach-2', level: 'all',         discipline: 'grappling' },
  { id: 's7',  day: 'mardi',    time: '18h30', duration: 90,  titleKey: 'schedule.mma',                       coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's8',  day: 'mardi',    time: '20h00', duration: 90,  titleKey: 'disciplines.items.kickboxing.title', coachId: 'coach-2', level: 'all',         discipline: 'kickboxing' },

  // ─── Mercredi ─────────────────────────────────────────────
  { id: 's9',  day: 'mercredi', time: '10h00', duration: 60,  titleKey: 'disciplines.items.lutte.title',      coachId: 'coach-3', level: 'all',         discipline: 'lutte' },
  { id: 's10', day: 'mercredi', time: '12h00', duration: 60,  titleKey: 'schedule.mma',                       coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's11', day: 'mercredi', time: '18h30', duration: 90,  titleKey: 'disciplines.items.kickboxing.title', coachId: 'coach-2', level: 'all',         discipline: 'kickboxing' },
  { id: 's12', day: 'mercredi', time: '20h00', duration: 90,  titleKey: 'schedule.sparring',                  coachId: 'duca',    level: 'advanced',    discipline: 'mma' },

  // ─── Jeudi ────────────────────────────────────────────────
  { id: 's13', day: 'jeudi',    time: '09h00', duration: 60,  titleKey: 'schedule.fitnessMma',                coachId: 'coach-3', level: 'all',         discipline: 'fitness' },
  { id: 's14', day: 'jeudi',    time: '12h00', duration: 60,  titleKey: 'disciplines.items.boxe.title',       coachId: 'duca',    level: 'all',         discipline: 'boxe' },
  { id: 's15', day: 'jeudi',    time: '18h30', duration: 90,  titleKey: 'disciplines.items.lutte.title',      coachId: 'coach-3', level: 'all',         discipline: 'lutte' },
  { id: 's16', day: 'jeudi',    time: '20h00', duration: 90,  titleKey: 'disciplines.items.grappling.title',  coachId: 'coach-2', level: 'all',         discipline: 'grappling' },

  // ─── Vendredi ─────────────────────────────────────────────
  { id: 's17', day: 'vendredi', time: '10h00', duration: 60,  titleKey: 'disciplines.items.grappling.title',  coachId: 'coach-2', level: 'all',         discipline: 'grappling' },
  { id: 's18', day: 'vendredi', time: '12h00', duration: 60,  titleKey: 'disciplines.items.kickboxing.title', coachId: 'coach-2', level: 'all',         discipline: 'kickboxing' },
  { id: 's19', day: 'vendredi', time: '18h30', duration: 90,  titleKey: 'disciplines.items.boxe.title',       coachId: 'duca',    level: 'all',         discipline: 'boxe' },
  { id: 's20', day: 'vendredi', time: '20h00', duration: 90,  titleKey: 'schedule.mmaCompetition',            coachId: 'duca',    level: 'competition', discipline: 'mma' },

  // ─── Samedi ───────────────────────────────────────────────
  { id: 's21', day: 'samedi',   time: '10h00', duration: 120, titleKey: 'schedule.openSession',               coachId: 'duca',    level: 'all',         discipline: 'open' },
  { id: 's22', day: 'samedi',   time: '13h00', duration: 90,  titleKey: 'schedule.mma',                       coachId: 'duca',    level: 'all',         discipline: 'mma' },
  { id: 's23', day: 'samedi',   time: '15h00', duration: 90,  titleKey: 'disciplines.items.grappling.title',  coachId: 'coach-2', level: 'all',         discipline: 'grappling' },
]
