import { useId, useRef, useState, type FormEvent } from 'react'
import { contact, levelOptions, modeOptions, subjects, type SubjectId } from '../data/content'
import { submitInquiry, type Inquiry } from '../lib/submitInquiry'
import './ContactForm.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'subjects', string>>

const emptyForm: Inquiry = {
  name: '',
  email: '',
  phone: '',
  role: 'roditelj',
  subjects: [],
  level: levelOptions[0],
  mode: modeOptions[0],
  message: '',
  website: '',
}

function validate(f: Inquiry): FieldErrors {
  const errors: FieldErrors = {}
  if (!f.name.trim()) errors.name = 'Upiši ime i prezime.'
  if (!f.email.trim()) errors.email = 'Upiši e-mail adresu da ti mogu odgovoriti.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    errors.email = 'Ova e-mail adresa nije ispravna. Provjeri je li u obliku ime@primjer.hr.'
  if (f.subjects.length === 0) errors.subjects = 'Odaberi barem jedan predmet.'
  return errors
}

export function Contact() {
  const id = useId()
  const [form, setForm] = useState<Inquiry>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleSubject = (sid: SubjectId) =>
    set(
      'subjects',
      form.subjects.includes(sid) ? form.subjects.filter((s) => s !== sid) : [...form.subjects, sid],
    )

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    const firstInvalid = (['name', 'email', 'subjects'] as const).find((k) => found[k])
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)
      el?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitInquiry(form)
      setStatus('sent')
      setForm(emptyForm)
      requestAnimationFrame(() => successRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof FieldErrors) => (errors[k] ? `${id}-${k}-err` : undefined)

  return (
    <section id="kontakt" className="contact" aria-labelledby="kontakt-naslov">
      <div className="wrap section contact__inner">
        <div className="contact__intro">
          <h2 id="kontakt-naslov" className="h2">
            Rezerviraj prvi sat
          </h2>
          <p className="contact__lead">
            Odgovaram u roku od jednog dana. Pišu mi i roditelji i učenici, oboje je u redu.
          </p>
          <ul className="contact__channels">
            <li>
              <a href={`mailto:${contact.email}`}>
                <MailIcon />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref}>
                <PhoneIcon />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.instagramHref} target="_blank" rel="noopener">
                <InstagramIcon />@{contact.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div className="contact__panel">
          {status === 'sent' ? (
            <div className="contact__success" ref={successRef} tabIndex={-1} role="status">
              <h3>Hvala, upit je zaprimljen.</h3>
              <p>
                Javit ću ti se u roku od jednog dana. Ako je hitno, nazovi me na{' '}
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
              </p>
              <button type="button" className="btn btn--ink" onClick={() => setStatus('idle')}>
                Pošalji još jedan upit
              </button>
            </div>
          ) : (
            <form ref={formRef} className="form" noValidate onSubmit={onSubmit}>
              <div className="form__field">
                <label htmlFor={`${id}-name`}>Ime i prezime</label>
                <input
                  id={`${id}-name`}
                  data-field="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={err('name')}
                  required
                />
                {errors.name && (
                  <p id={err('name')} className="form__error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="form__field">
                <label htmlFor={`${id}-email`}>E-mail</label>
                <input
                  id={`${id}-email`}
                  data-field="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={err('email')}
                  required
                />
                {errors.email && (
                  <p id={err('email')} className="form__error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form__field">
                <label htmlFor={`${id}-phone`}>
                  Telefon <span className="form__optional">(neobavezno)</span>
                </label>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                />
              </div>

              <fieldset className="form__field form__fieldset">
                <legend>Javljam se kao</legend>
                <div className="form__radios">
                  {(['roditelj', 'ucenik'] as const).map((r) => (
                    <label key={r} className="form__radio">
                      <input
                        type="radio"
                        name={`${id}-role`}
                        value={r}
                        checked={form.role === r}
                        onChange={() => set('role', r)}
                      />
                      {r === 'roditelj' ? 'roditelj' : 'učenik'}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset
                className="form__field form__fieldset form__wide"
                aria-describedby={err('subjects')}
              >
                <legend>Predmet</legend>
                <div className="form__chips">
                  {subjects.map((s, i) => (
                    <label key={s.id} className={`chip chip--${s.tone}`}>
                      <input
                        type="checkbox"
                        data-field={i === 0 ? 'subjects' : undefined}
                        checked={form.subjects.includes(s.id)}
                        onChange={() => toggleSubject(s.id)}
                        aria-invalid={!!errors.subjects}
                      />
                      <span className="chip__symbol" aria-hidden="true">
                        {s.symbol}
                      </span>
                      {s.name}
                    </label>
                  ))}
                </div>
                {errors.subjects && (
                  <p id={err('subjects')} className="form__error">
                    {errors.subjects}
                  </p>
                )}
              </fieldset>

              <div className="form__field">
                <label htmlFor={`${id}-level`}>Razina</label>
                <select
                  id={`${id}-level`}
                  value={form.level}
                  onChange={(e) => set('level', e.target.value)}
                >
                  {levelOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="form__field">
                <label htmlFor={`${id}-mode`}>Način</label>
                <select
                  id={`${id}-mode`}
                  value={form.mode}
                  onChange={(e) => set('mode', e.target.value)}
                >
                  {modeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="form__field form__wide">
                <label htmlFor={`${id}-message`}>
                  Poruka <span className="form__optional">(razred, gradivo, rok)</span>
                </label>
                <textarea
                  id={`${id}-message`}
                  rows={4}
                  placeholder="Npr. 2. razred gimnazije, imamo test iz derivacija za dva tjedna."
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                />
              </div>

              <div className="form__honeypot" aria-hidden="true">
                <label htmlFor={`${id}-website`}>Web stranica</label>
                <input
                  id={`${id}-website`}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set('website', e.target.value)}
                />
              </div>

              {status === 'error' && (
                <p className="form__alert form__wide" role="alert">
                  Upit se nije poslao. Pokušaj ponovno ili mi piši izravno na{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
              )}

              <div className="form__footer form__wide">
                <p className="form__privacy">Podatke koristim samo da bih ti odgovorila.</p>
                <button type="submit" className="btn btn--ink" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Šaljem…' : 'Pošalji upit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}
