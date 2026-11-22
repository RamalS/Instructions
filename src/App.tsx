import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About, Pricing, Steps, Subjects } from './components/Sections'
import { Contact } from './components/ContactForm'
import { brand } from './data/content'

const YEAR = new Date().getFullYear()

export default function App() {
  return (
    <>
      <a href="#sadrzaj" className="skip-link">
        Preskoči na sadržaj
      </a>
      <Header />
      <main id="sadrzaj">
        <Hero />
        <Subjects />
        <About />
        <Pricing />
        <Steps />
        <Contact />
      </main>
      <footer className="wrap site-footer">
        <span>
          {brand.name} · {brand.city}
        </span>
        <span>© {YEAR} {brand.person}</span>
      </footer>
    </>
  )
}
