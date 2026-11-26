import { useEffect } from 'react'
import { Link, NavLink, Outlet, Route, Routes, useLocation } from 'react-router'
import DemoBar from '../../../components/DemoBar'
import HomePage from './HomePage'
import ProductPage from './ProductPage'
import CustomizePage from './CustomizePage'
import ContactPage from './ContactPage'
import { base } from './routes'
import './Napkins.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NapkinsLayout() {
  return (
    <div className="servilletas-site">
      <ScrollToTop />
      <DemoBar />

      <header className="servilletas-header">
        <Link className="servilletas-brand" to={base} aria-label="Pliegue, inicio">
          <span className="servilletas-brand-mark">P.</span>
          <span>
            <strong>pliegue</strong>
            <small>TEXTILES PARA LA MESA</small>
          </span>
        </Link>

        <nav className="servilletas-nav" aria-label="Navegación principal">
          <NavLink to={base} end>Inicio</NavLink>
          <NavLink to={`${base}/productos`}>Productos</NavLink>
          <NavLink to={`${base}/personalizar`}>Personalización</NavLink>
          <NavLink to={`${base}/contacto`}>Contacto</NavLink>
        </nav>

        <Link className="servilletas-header-link" to={`${base}/personalizar`}>
          Diseñá la tuya <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="servilletas-footer">
        <Link className="servilletas-brand" to={base}>
          <span className="servilletas-brand-mark">P.</span>
          <span>
            <strong>pliegue</strong>
            <small>TEXTILES PARA LA MESA</small>
          </span>
        </Link>
        <span>Detalles textiles para mesas con identidad.</span>
        <span>Proyecto demostrativo · Toniut Impulso Digital</span>
      </footer>
    </div>
  )
}

function NapkinsApp() {
  return (
    <Routes>
      <Route element={<NapkinsLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<ProductPage />} />
        <Route path="personalizar" element={<CustomizePage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default NapkinsApp
