import faceWebp from '../assets/patricia-lice.webp'
import { links, prices, steps, subjects, thesis } from '../data/content'
import { ElementTile } from './ElementTile'
import './Sections.css'

export function Subjects() {
  return (
    <section id="predmeti" className="subjects" aria-labelledby="predmeti-naslov">
      <div className="wrap section">
        <div className="subjects__head">
          <h2 id="predmeti-naslov" className="h2 subjects__title">
            Četiri predmeta, jedna logika.
          </h2>
          <p className="subjects__intro">
            Matematika je jezik fizike, informatika je matematika koja radi, a biologija je sustav
            koji sve to povezuje. Zato ih predajem zajedno.
          </p>
        </div>
        <div className="subjects__grid">
          {subjects.map((s) => (
            <ElementTile key={s.id} subject={s} size="lg" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="o-meni" className="about wrap section" aria-labelledby="o-meni-naslov">
      <div className="about__visual">
        <div className="about__disc about__disc--in" aria-hidden="true" />
        <div className="about__disc about__disc--bi" aria-hidden="true" />
        <img
          className="about__photo"
          src={faceWebp}
          alt="Patricia Adžić"
          width={400}
          height={400}
          loading="lazy"
        />
      </div>

      <div className="about__body">
        <h2 id="o-meni-naslov" className="h2 about__title">
          Ja sam Patricia.
        </h2>
        <div className="about__text">
          <p>
            Magistra sam inženjerka računarstva. Diplomirala sam na FERIT-u u Osijeku, na smjeru
            Umjetna inteligencija i robotika.
          </p>
          <p>
            Diplomski rad izradila sam tijekom Erasmus razmjene na Sveučilištu u Gentu (Ghent
            University) u Belgiji, jednom od vodećih europskih sveučilišta. Istraživala sam kako
            varijacijski autoenkoderi, vrsta generativnih modela umjetne inteligencije, mogu
            pretraživati dermatološke slike prema sadržaju.
          </p>
          <p>
            U tom radu spojile su se matematika, programiranje i biologija. Naučila sam da najbolje
            razumijem ono što znam objasniti drugome. Tako i podučavam: korak po korak, bez učenja
            napamet, dok gradivo ne sjedne.
          </p>
        </div>

        <figure className="about__quote">
          <blockquote>
            <p>„Društvo treba više cijeniti znanje.”</p>
          </blockquote>
          <figcaption>
            Iz razgovora za{' '}
            <a href={links.article} target="_blank" rel="noopener">
              Točku na i
            </a>
            , 2025.
          </figcaption>
        </figure>

        <dl className="about__facts">
          <div>
            <dt>Diplomski rad</dt>
            <dd>
              <a href={links.thesis} target="_blank" rel="noopener">
                {thesis.title}
              </a>
            </dd>
          </div>
          <div>
            <dt>Mentorica</dt>
            <dd>{thesis.mentor}, FERIT Osijek</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <section id="cijenik" className="pricing" aria-labelledby="cijenik-naslov">
      <div className="wrap section">
        <h2 id="cijenik-naslov" className="h2">
          Cijenik
        </h2>
        <p className="pricing__intro">
          Sat traje 60 minuta. Cijena je ista za sva četiri predmeta, uživo ili online.
        </p>
        <div className="pricing__grid">
          {prices.map((p) => (
            <div key={p.id} className={`price${p.featured ? ' price--featured' : ''}`}>
              <h3 className="price__title">{p.title}</h3>
              <p className="price__note">{p.note}</p>
              <p className="price__amount">
                {p.perHour} €<span> / sat</span>
              </p>
              <p className="price__package">
                Paket 10 sati: <strong>{p.package10} €</strong> (−10 %)
              </p>
            </div>
          ))}
        </div>
        <ul className="pricing__notes">
          <li>
            <strong>Prvi sat</strong> je ujedno procjena znanja: vidimo gdje si i što treba
            nadoknaditi.
          </li>
          <li>
            <strong>Uživo</strong> kod mene u Osijeku, a mogu doći i k tebi uz doplatu koju
            dogovaramo.
          </li>
          <li>
            <strong>Online</strong> preko Google Meeta ili Zooma, uz zajedničku digitalnu ploču.
          </li>
        </ul>
      </div>
    </section>
  )
}

export function Steps() {
  return (
    <section className="wrap section steps" aria-labelledby="koraci-naslov">
      <h2 id="koraci-naslov" className="steps__title">
        Kako počinjemo
      </h2>
      <ol className="steps__list">
        {steps.map((s, i) => (
          <li key={s.title} className="step">
            <span className={`step__num step__num--${s.tone}`} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
