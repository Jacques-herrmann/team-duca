export interface NavItem {
  labelKey: string
  path: string
  highlight?: boolean
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.schedule',      path: '/#schedule' },
  { labelKey: 'nav.programs',      path: '/prepa-physique' },
  { labelKey: 'nav.locationCage',  path: '/location-cage' },
  { labelKey: 'nav.contact',       path: '/contact' },
  { labelKey: 'nav.join',          path: '/inscription', highlight: true },
]
