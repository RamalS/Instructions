import type { Subject } from '../data/content'
import './ElementTile.css'

interface Props {
  subject: Subject
  size?: 'sm' | 'lg'
  className?: string
}

/** Pločica u stilu periodnog sustava: redni broj, simbol, ime. */
export function ElementTile({ subject, size = 'sm', className = '' }: Props) {
  if (size === 'sm') {
    return (
      <div className={`tile tile--sm tile--${subject.tone} ${className}`} aria-hidden="true">
        <span className="tile__num">{subject.number}</span>
        <span className="tile__symbol">{subject.symbol}</span>
        <span className="tile__name">{subject.name}</span>
      </div>
    )
  }

  return (
    <article className={`tile tile--lg tile--${subject.tone} ${className}`}>
      <div className="tile__meta">
        <span>{subject.number}</span>
        <span>{subject.levels}</span>
      </div>
      <span className="tile__symbol" aria-hidden="true">
        {subject.symbol}
      </span>
      <h3 className="tile__title">{subject.name}</h3>
      <p className="tile__text">{subject.description}</p>
    </article>
  )
}
