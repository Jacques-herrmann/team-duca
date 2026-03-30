export type Day = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi'

export interface ScheduleItem {
  id: string
  day: Day
  time: string
  duration: number
  titleKey: string
  coachId: string
  level: 'all' | 'advanced' | 'competition'
}

export const schedule: ScheduleItem[] = [
  { id: 's1',  day: 'lundi',    time: '18h30', duration: 90,  titleKey: 'disciplines.items.boxe.title',       coachId: 'duca',    level: 'all' },
  { id: 's2',  day: 'lundi',    time: '20h00', duration: 90,  titleKey: 'schedule.mmaAdvanced',               coachId: 'duca',    level: 'advanced' },
  { id: 's3',  day: 'mardi',    time: '09h00', duration: 60,  titleKey: 'schedule.fitnessMma',                coachId: 'coach-2', level: 'all' },
  { id: 's4',  day: 'mardi',    time: '18h30', duration: 90,  titleKey: 'schedule.mma',                       coachId: 'duca',    level: 'all' },
  { id: 's5',  day: 'mercredi', time: '18h30', duration: 90,  titleKey: 'disciplines.items.kickboxing.title', coachId: 'coach-2', level: 'all' },
  { id: 's6',  day: 'mercredi', time: '20h00', duration: 90,  titleKey: 'schedule.sparring',                  coachId: 'duca',    level: 'advanced' },
  { id: 's7',  day: 'jeudi',    time: '18h30', duration: 90,  titleKey: 'disciplines.items.lutte.title',      coachId: 'coach-3', level: 'all' },
  { id: 's8',  day: 'jeudi',    time: '20h00', duration: 90,  titleKey: 'disciplines.items.grappling.title',  coachId: 'coach-2', level: 'all' },
  { id: 's9',  day: 'vendredi', time: '18h30', duration: 90,  titleKey: 'disciplines.items.boxe.title',       coachId: 'duca',    level: 'all' },
  { id: 's10', day: 'vendredi', time: '20h00', duration: 90,  titleKey: 'schedule.mmaCompetition',            coachId: 'duca',    level: 'competition' },
  { id: 's11', day: 'samedi',   time: '10h00', duration: 120, titleKey: 'schedule.openSession',               coachId: 'duca',    level: 'all' },
]
