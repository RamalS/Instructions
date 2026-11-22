import portraitWebp from '../assets/patricia-portret.webp'
import portraitJpg from '../assets/patricia-portret.jpg'
import { subjects } from '../data/content'
import { ElementTile } from './ElementTile'
import './Hero.css'

export function Hero() {
  const ma = subjects.find((s) => s.id === 'matematika')!
  const inf = subjects.find((s) => s.id === 'informatika')!

  return (
    <section id="vrh" className="hero wrap">
      <div className="hero__copy">
        <h1 className="hero__title">Gradivo koje konačno ima smisla.</h1>
        <p className="hero__lead">
          Instrukcije iz matematike, fizike, informatike i biologije za osnovnu školu, srednju
          školu i državnu maturu. Uživo u Osijeku ili online.
        </p>
        <div className="hero__actions">
          <a href="#kontakt" className="btn btn--blue hero__cta">
            Rezerviraj prvi sat
          </a>
          <a href="#cijenik" className="hero__secondary">
            Pogledaj cijenik
          </a>
        </div>
        <p className="hero__credentials">
          Patricia Adžić, mag. ing. comp. · FERIT Osijek · diplomski rad na Ghent University
        </p>
      </div>

      <div className="hero__stage">
        <div className="hero__layer hero__layer--sun" aria-hidden="true" />
        <div className="hero__layer hero__layer--fi" aria-hidden="true" />
        <picture>
          <source srcSet={portraitWebp} type="image/webp" />
          <img
            className="hero__layer hero__photo"
            src={portraitJpg}
            alt="Patricia Adžić u akademskoj togi drži diplomu FERIT-a"
            width={500}
            height={625}
            fetchPriority="high"
          />
        </picture>
        <ElementTile subject={ma} className="hero__tile hero__tile--ma" size="sm" />
        <ElementTile subject={inf} className="hero__tile hero__tile--in" size="sm" />
      </div>
    </section>
  )
}
