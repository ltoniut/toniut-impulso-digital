
import { useEffect } from 'react'
import { NavLink, Routes, Route, useLocation, Link } from 'react-router'
import './App.css'

import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Process from './pages/Process'
import Contact from './pages/Contact'
import Services from './pages/Services'
import FloraEstudio from './pages/samples/FloraEstudio'
import LegalApp from './pages/samples/legal/LegalApp'
import RestaurantApp from './pages/samples/restaurant/RestaurantApp'
import NapkinsApp from './pages/samples/servilletas/NapkinsApp'

const navigation = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Tarifas', path: '/tarifas' },
  { label: 'Cómo trabajo', path: '/como-trabajo' },
  { label: 'Contacto', path: '/contacto' },
]

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function NotFound() {
  return (
    <section className="services-hero">
      <h1>Esta página <span>no existe.</span></h1>
      <Link to="/" className="button button--primary">Volver al inicio</Link>
    </section>
  )
}

function ToniutSite() {
  return (
    <div className="site-container">
      <header className="site-header">
        <div className="brand">
          <span className="brand-name">
            Toniut <span>Impulso Digital</span>
          </span>
          <span className="brand-tagline">
            Desarrollo web a medida
          </span>
        </div>

        <nav className="main-navigation" aria-label="Navegación principal">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-button ${isActive ? 'nav-button--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/tarifas" element={<Pricing />} />
          <Route path="/como-trabajo" element={<Process />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>Toniut Impulso Digital</span>
        <span>Tu negocio merece su lugar en internet.</span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/flora-estudio" element={<FloraEstudio />} />
        <Route path="/estudio-juridico/*" element={<LegalApp />} />
        <Route path="/restaurante/*" element={<RestaurantApp />} />
<Route path="/servilletas/*" element={<NapkinsApp />} />
        <Route path="/*" element={<ToniutSite />} />
      </Routes>
    </>
  )
}

export default App
