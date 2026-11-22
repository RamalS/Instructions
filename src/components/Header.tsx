import { useEffect, useState } from 'react'
import { brand } from '../data/content'
import { Logo } from './Logo'
import './Header.css'

const navItems = [
  { href: '#predmeti', label: 'Predmeti' },
  { href: '#o-meni', label: 'O meni' },
  { href: '#cijenik', label: 'Cijenik' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const mq = window.matchMedia('(min-width: 48rem)')
    const onResize = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="header wrap">
      <a href="#vrh" className="header__brand" onClick={close}>
        <Logo />
        <span>{brand.name}</span>
      </a>

      <button
        type="button"
        className="header__toggle"
        aria-expanded={open}
        aria-controls="glavni-izbornik"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? 'Zatvori izbornik' : 'Otvori izbornik'}</span>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <nav
        id="glavni-izbornik"
        aria-label="Glavna navigacija"
        className={`header__nav${open ? ' is-open' : ''}`}
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="header__link" onClick={close}>
            {item.label}
          </a>
        ))}
        <a href="#kontakt" className="btn btn--ink header__cta" onClick={close}>
          Rezerviraj prvi sat
        </a>
      </nav>
    </header>
  )
}
