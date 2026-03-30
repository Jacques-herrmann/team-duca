export type AthleteSport = 'mma' | 'bjj'
export type AthleteLevel = 'pro' | 'amateur'
export type BjjBelt = 'white' | 'blue' | 'purple' | 'brown' | 'black'
export type PalmareResult = 'gold' | 'silver' | 'bronze' | 'win' | 'loss' | 'nc'

export interface PalmareEntry {
  year: number
  event: string
  result: PalmareResult
  label: string       // Texte affiché : "Champion -77kg", "KO/TKO", "Vice-champion"…
  sport: AthleteSport
  division?: string
}

export interface MmaRecord {
  wins: number
  losses: number
  draws: number
}

export interface Athlete {
  id: string
  name: string
  nickname?: string
  sports: AthleteSport[]
  level: AthleteLevel
  image: string
  imageAlt: string
  record?: MmaRecord       // Pro/amateur MMA record
  bjjBelt?: BjjBelt        // Ceinture actuelle en BJJ
  palmare: PalmareEntry[]
}

export const athletes: Athlete[] = [
  // ─── PRO ───────────────────────────────────────────────────
  {
    id: 'duca-pro',
    name: 'Duca',
    nickname: 'The Science',
    sports: ['mma'],
    level: 'pro',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&h=750&fit=crop&q=80',
    imageAlt: 'Duca — Head Coach Science DUCA, combattant MMA professionnel Marseille, portrait noir et blanc, regard caméra',
    record: { wins: 12, losses: 3, draws: 0 },
    palmare: [
      { year: 2023, event: 'ARES Fighting Championship', result: 'win', label: 'Victoire KO/TKO', sport: 'mma', division: '-77kg' },
      { year: 2022, event: 'RFP — Regional Fight Promotion', result: 'win', label: 'Victoire décision', sport: 'mma', division: '-77kg' },
      { year: 2022, event: 'Force Fighting Championship', result: 'gold', label: 'Champion', sport: 'mma', division: '-77kg' },
      { year: 2021, event: 'Hexagone MMA', result: 'win', label: 'Victoire soumission', sport: 'mma', division: '-77kg' },
      { year: 2020, event: 'ARES Fighting Championship', result: 'loss', label: 'Défaite décision', sport: 'mma', division: '-77kg' },
    ],
  },
  {
    id: 'fighter-pro-2',
    name: 'Karim Bensalem',
    nickname: 'The Lion',
    sports: ['mma', 'bjj'],
    level: 'pro',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=750&fit=crop&q=80',
    imageAlt: 'Karim Bensalem — combattant MMA professionnel Science DUCA, portrait noir et blanc, posture de combat',
    record: { wins: 7, losses: 2, draws: 1 },
    bjjBelt: 'purple',
    palmare: [
      { year: 2024, event: 'ARES Fighting Championship', result: 'gold', label: 'Champion', sport: 'mma', division: '-84kg' },
      { year: 2023, event: 'Open International BJJ Paris', result: 'gold', label: 'Champion -82kg', sport: 'bjj', division: '-82kg' },
      { year: 2023, event: 'RFP — Regional Fight Promotion', result: 'win', label: 'Victoire soumission', sport: 'mma', division: '-84kg' },
      { year: 2022, event: 'Force Fighting Championship', result: 'silver', label: 'Vice-champion', sport: 'mma', division: '-84kg' },
    ],
  },

  // ─── AMATEUR ───────────────────────────────────────────────
  {
    id: 'amateur-1',
    name: 'Thomas Vergne',
    sports: ['bjj'],
    level: 'amateur',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=500&fit=crop&q=80',
    imageAlt: 'Thomas Vergne — athlète BJJ Science DUCA Marseille, portrait noir et blanc',
    bjjBelt: 'blue',
    palmare: [
      { year: 2024, event: 'Open Régional PACA', result: 'gold', label: 'Champion -73kg', sport: 'bjj', division: '-73kg' },
      { year: 2024, event: 'Open National Nîmes', result: 'silver', label: 'Vice-champion -73kg', sport: 'bjj', division: '-73kg' },
      { year: 2023, event: 'Open Régional PACA', result: 'bronze', label: '3e place -73kg', sport: 'bjj', division: '-73kg' },
    ],
  },
  {
    id: 'amateur-2',
    name: 'Sofia Amrani',
    sports: ['mma', 'bjj'],
    level: 'amateur',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&q=80',
    imageAlt: 'Sofia Amrani — athlète MMA et BJJ Science DUCA, portrait noir et blanc',
    record: { wins: 3, losses: 1, draws: 0 },
    bjjBelt: 'blue',
    palmare: [
      { year: 2024, event: 'Open Marseille MMA Amateur', result: 'gold', label: 'Championne -58kg', sport: 'mma', division: '-58kg' },
      { year: 2024, event: 'Open Régional BJJ', result: 'gold', label: 'Championne -61kg', sport: 'bjj', division: '-61kg' },
      { year: 2023, event: 'Open Régional MMA Amateur', result: 'silver', label: 'Vice-championne -58kg', sport: 'mma', division: '-58kg' },
    ],
  },
  {
    id: 'amateur-3',
    name: 'Mehdi Larbi',
    sports: ['bjj'],
    level: 'amateur',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop&q=80',
    imageAlt: 'Mehdi Larbi — athlète BJJ Science DUCA Marseille, portrait noir et blanc',
    bjjBelt: 'purple',
    palmare: [
      { year: 2024, event: 'Championnat de France FFJDA', result: 'bronze', label: '3e place -94kg', sport: 'bjj', division: '-94kg' },
      { year: 2024, event: 'Open International Paris', result: 'gold', label: 'Champion -94kg', sport: 'bjj', division: '-94kg' },
      { year: 2023, event: 'Open National Lyon', result: 'silver', label: 'Vice-champion -94kg', sport: 'bjj', division: '-94kg' },
      { year: 2023, event: 'Open Régional PACA', result: 'gold', label: 'Champion -94kg', sport: 'bjj', division: '-94kg' },
    ],
  },
  {
    id: 'amateur-4',
    name: 'Youssef Tazi',
    sports: ['mma'],
    level: 'amateur',
    image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=400&h=500&fit=crop&q=80',
    imageAlt: 'Youssef Tazi — athlète MMA amateur Science DUCA Marseille, portrait noir et blanc',
    record: { wins: 5, losses: 0, draws: 0 },
    palmare: [
      { year: 2024, event: 'Open Marseille MMA Amateur', result: 'gold', label: 'Champion -70kg', sport: 'mma', division: '-70kg' },
      { year: 2024, event: 'Open National MMA Amateur Lyon', result: 'gold', label: 'Champion -70kg', sport: 'mma', division: '-70kg' },
      { year: 2023, event: 'Open Régional MMA Amateur', result: 'gold', label: 'Champion -70kg', sport: 'mma', division: '-70kg' },
    ],
  },
]

export const proAthletes = athletes.filter(a => a.level === 'pro')
export const amateurAthletes = athletes.filter(a => a.level === 'amateur')
