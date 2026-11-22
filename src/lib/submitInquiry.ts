import type { SubjectId } from '../data/content'

export interface Inquiry {
  name: string
  email: string
  phone: string
  role: 'roditelj' | 'ucenik'
  subjects: SubjectId[]
  level: string
  mode: string
  message: string
  /** Honeypot: ljudi ga ne vide, botovi ga ispune. */
  website: string
}

/**
 * Šalje upit s kontakt forme.
 *
 * TODO: spojiti Web3Forms (https://web3forms.com) prije objave stranice.
 * Dok ovo nije spojeno, upit se NIGDJE ne šalje, nego se samo ispiše u konzolu.
 * Stranica se ne smije objaviti s ovim privremenim rješenjem.
 *
 * Primjer kad dobiješ ključ (VITE_WEB3FORMS_KEY u .env):
 *   const res = await fetch('https://api.web3forms.com/submit', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
 *     body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_KEY, ...data }),
 *   })
 *   if (!res.ok) throw new Error('Slanje nije uspjelo')
 */
export async function submitInquiry(data: Inquiry): Promise<void> {
  if (data.website) return // bot: tiho ignoriraj

  await new Promise((resolve) => setTimeout(resolve, 600))
  console.info('[Bistra glavica] Upit (još se ne šalje, spojiti Web3Forms):', data)
}
