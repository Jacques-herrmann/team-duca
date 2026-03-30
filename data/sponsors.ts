export interface Sponsor {
  id: string
  name: string
  logo: string
  logoAlt: string
  url?: string
}

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'Sponsor 1',
    logo: 'https://placehold.co/200x80/242424/f9f9f9?text=SPONSOR',
    logoAlt: 'Logo partenaire Science DUCA — à remplacer par le vrai logo SVG ou PNG fond transparent',
    url: '#',
  },
]
