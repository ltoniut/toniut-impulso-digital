import { Link } from 'react-router'
import './DemoBar.css'

function DemoBar() {
  return (
    <div className="demo-bar">
      <Link to="/tarifas" className="demo-bar__back">
        <span aria-hidden="true">←</span> Volver a Tarifas
      </Link>

      <span className="demo-bar__label">Proyecto demostrativo</span>

      <Link to="/contacto" className="demo-bar__cta">
        ¿Querés algo así? <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

export default DemoBar