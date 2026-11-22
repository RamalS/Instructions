export const brand = {
  name: 'Bistra glavica',
  tagline: 'obrt za instrukcije i poduku',
  person: 'Patricia Adžić',
  city: 'Osijek',
}

export const contact = {
  email: 'patricia.adzic@gmail.com',
  phoneDisplay: '+385 95 856 6268',
  phoneHref: 'tel:+385958566268',
  instagram: 'patriciaadzic',
  instagramHref: 'https://www.instagram.com/patriciaadzic/',
}

export const links = {
  article:
    'https://tockanai.hr/poduzetnik/teenbiz-patricia-adzic-drustvo-treba-vise-cijeniti-znanje-93534/',
  thesis: 'https://repozitorij.etfos.hr/object/etfos:6279',
}

export const thesis = {
  title: 'Primjena varijacijskih autoenkodera za pretraživanje dermatoloških slika prema sadržaju',
  mentor: 'Irena Galić',
}

export type SubjectId = 'matematika' | 'fizika' | 'informatika' | 'biologija'

export interface Subject {
  id: SubjectId
  number: number
  symbol: string
  name: string
  levels: string
  description: string
  tone: 'ma' | 'fi' | 'in' | 'bi'
}

export const subjects: Subject[] = [
  {
    id: 'matematika',
    number: 1,
    symbol: 'Ma',
    name: 'Matematika',
    levels: 'OŠ · SŠ · Matura A/B',
    description:
      'Od razlomaka i jednadžbi do derivacija i integrala. Matura na osnovnoj (B) i višoj (A) razini.',
    tone: 'ma',
  },
  {
    id: 'fizika',
    number: 2,
    symbol: 'Fi',
    name: 'Fizika',
    levels: 'OŠ · SŠ · Matura',
    description:
      'Gibanje, sile, energija i elektricitet. Rješavamo zadatke tako da znaš zašto formula vrijedi, a ne samo kamo uvrstiti brojeve.',
    tone: 'fi',
  },
  {
    id: 'informatika',
    number: 3,
    symbol: 'In',
    name: 'Informatika',
    levels: 'OŠ · SŠ · Matura',
    description:
      'Python, algoritmi i logika. Od prvog programa do zadataka s ispita iz informatike na državnoj maturi.',
    tone: 'in',
  },
  {
    id: 'biologija',
    number: 4,
    symbol: 'Bi',
    name: 'Biologija',
    levels: 'OŠ · SŠ · Matura',
    description:
      'Stanica, genetika, ljudsko tijelo i ekologija. Pojmove povezujemo u cjelinu, pa ih ne moraš učiti napamet.',
    tone: 'bi',
  },
]

export interface Price {
  id: 'os' | 'ss' | 'matura'
  title: string
  note: string
  perHour: number
  package10: number
  featured?: boolean
}

export const prices: Price[] = [
  { id: 'os', title: 'Osnovna škola', note: '5. do 8. razred', perHour: 15, package10: 135 },
  { id: 'ss', title: 'Srednja škola', note: 'gimnazije i strukovne škole', perHour: 20, package10: 180 },
  {
    id: 'matura',
    title: 'Priprema za državnu maturu',
    note: 'matematika A i B razina, fizika, informatika, biologija',
    perHour: 25,
    package10: 225,
    featured: true,
  },
]

export const steps = [
  { title: 'Javiš se', text: 'Preko forme ispod napišeš predmet, razred i što ti stvara problem.', tone: 'fi' },
  { title: 'Prvi sat i procjena', text: 'Prolazimo gradivo i otkrivamo gdje točno zapinje.', tone: 'sun' },
  { title: 'Plan i termini', text: 'Dogovaramo redovite termine i plan do testa, ispita ili mature.', tone: 'in' },
] as const

export const levelOptions = [
  'Osnovna škola, 5.–8. razred',
  'Srednja škola',
  'Priprema za državnu maturu',
] as const

export const modeOptions = ['Uživo u Osijeku', 'Online', 'Svejedno mi je'] as const
