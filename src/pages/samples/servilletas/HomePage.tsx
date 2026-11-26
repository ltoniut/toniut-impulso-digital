import { Link } from 'react-router'
import ContactCta from './ContactCta'
import { base } from './routes'

function HomePage() {
  return (
    <>
      <section className="servilletas-hero" id="inicio">
        <div className="servilletas-hero-copy">
          <span className="servilletas-eyebrow">PARA RESTAURANTES · CAFÉS · BARES</span>
          <h1>Más que servilletas: Una identidad.</h1>
          <p>
            Creamos servilletas a medida que comuniquen la
            identidad de tu restaurante. Armá una propuesta a tu medida o
            comunicate con nosotros para crear juntos un modelo.
          </p>
          <Link className="servilletas-button" to={`${base}/productos`}>
            Ver las opciones <span aria-hidden="true">→</span>
          </Link>
          <span className="servilletas-hero-note">
            Asesoramiento personalizado · Pedidos para gastronomía
          </span>
        </div>

        <div className="servilletas-hero-visual" aria-label="Muestras de servilletas de tela">
          <div className="servilletas-napkin servilletas-napkin--large">
            <span className="napkin-stitch" />
            <span className="napkin-monogram">C.</span>
          </div>
          <div className="servilletas-napkin servilletas-napkin--small">
            <span className="napkin-stitch" />
          </div>
          <span className="servilletas-visual-caption">Lino lavado · Natural</span>
          <span className="servilletas-visual-index">01 / 03</span>
        </div>

        <span className="servilletas-hero-side">HECHAS PARA COMPARTIR</span>
      </section>

      <section className="servilletas-intro">
        <span className="servilletas-eyebrow">EL TOQUE FINAL</span>
        <h2>Tu marca también vive en la mesa.</h2>
        <p>
          Creamos servilletas para el ritmo real de tu negocio: cómodas,
          cuidadas y con opciones de personalización que se adaptan a lo que
          necesitás resolver.
        </p>
      </section>

      <ContactCta to={`${base}/personalizar`} />
    </>
  )
}

export default HomePage