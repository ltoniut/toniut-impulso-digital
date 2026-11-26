
import './FloraEstudio.css'
import floristeria from '../../assets/floristeria.jpg'
import especiales from '../../assets/especiales.jpg'
import silvestre from '../../assets/silvestre.jpg'
import regalo from '../../assets/regalo.jpg'
import colores from '../../assets/colores.jpg'
import DemoBar from '../../components/DemoBar'

const whatsapp = (message: string) =>
  `https://wa.me/?text=${encodeURIComponent(message)}`

const products = [
  {
    name: 'Ramo silvestre',
    description: 'Una combinación fresca y espontánea de flores de estación.',
    image: silvestre
  },
  {
    name: 'Flores para regalar',
    description: 'Arreglos pensados para sorprender en cualquier momento.',
    image: regalo
  },
  {
    name: 'Diseños especiales',
    description: 'Composiciones personalizadas para momentos importantes.',
    image: especiales
  },
]

const occasions = [
  ['01', 'Cumpleaños', 'Un detalle lleno de color para celebrar un día especial.'],
  ['02', 'Aniversarios', 'Flores que dicen mucho, incluso sin palabras.'],
  ['03', 'Agradecimientos', 'Una forma sencilla y hermosa de estar presente.'],
  ['04', 'Porque sí', 'No hace falta una ocasión para regalar flores.'],
]

function FloraEstudio() {
  return (
    <div className="flora-site">
  <DemoBar />
      <header className="flora-header">
        <a className="flora-brand" href="#inicio" aria-label="Flora Estudio, inicio">
          <span className="flora-brand-name">flora<span>.</span></span>
          <span className="flora-brand-caption">ESTUDIO FLORAL</span>
        </a>

        <nav className="flora-nav" aria-label="Navegación principal">
          <a href="#coleccion">Colección</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <a
          className="flora-header-cta"
          href={whatsapp('¡Hola! Quisiera consultar por sus arreglos florales.')}
          target="_blank"
          rel="noreferrer"
        >
          Hacer un pedido <span>↗</span>
        </a>
      </header>

      <main>
        <section className="flora-hero" id="inicio">
          <div className="flora-hero-copy">
            <span className="flora-eyebrow">FLORES · DISEÑO · NATURALEZA</span>
            <h1>Flores para hacer especial <em>lo cotidiano.</em></h1>
            <p>
              Arreglos florales hechos con dedicación, inspirados en la belleza
              natural de cada estación.
            </p>
            <a className="flora-button" href="#coleccion">
              Descubrí nuestras flores <span>→</span>
            </a>
            <span className="flora-hero-note">Diseños únicos · Flores de estación</span>
          </div>

          <div className="flora-hero-image">
            <img
              src= {floristeria}
              alt="Composición de flores naturales en tonos suaves"
            />
            <span className="flora-image-caption">La belleza está en los detalles.</span>
          </div>
          <span className="flora-hero-number">01 / 04</span>
        </section>

        <section className="flora-intro" id="nosotros">
          <span className="flora-eyebrow">UN ESTUDIO, MUCHAS FLORES</span>
          <h2>Creemos en los pequeños gestos que hacen <em>grandes momentos.</em></h2>
          <p>
            En Flora seleccionamos flores de estación y las combinamos de manera
            artesanal. Cada ramo tiene su propia personalidad, porque creemos
            que no hay dos momentos iguales.
          </p>
        </section>

        <section className="flora-collection" id="coleccion">
          <div className="flora-section-heading">
            <div>
              <span className="flora-eyebrow">NUESTRA SELECCIÓN</span>
              <h2>Un poco de <em>naturaleza.</em></h2>
            </div>
            <p>
              Cada creación se prepara especialmente. Consultanos por las flores
              disponibles esta semana.
            </p>
          </div>

          <div className="flora-product-grid">
            {products.map((product, index) => (
              <article className="flora-product" key={product.name}>
                <a
                  className="flora-product-image"
                  href={whatsapp(`¡Hola! Me interesa consultar por ${product.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Consultar por ${product.name}`}
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="flora-product-index">0{index + 1}</span>
                  <span className="flora-product-arrow">↗</span>
                </a>
                <div className="flora-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a
                    href={whatsapp(`¡Hola! Quisiera consultar por ${product.name}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Consultar disponibilidad →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="flora-occasions">
          <div className="flora-occasions-heading">
            <span className="flora-eyebrow">PARA CADA MOMENTO</span>
            <h2>Siempre hay una razón <em>para regalar flores.</em></h2>
          </div>
          <div className="flora-occasion-list">
            {occasions.map(([number, title, description]) => (
              <a
                className="flora-occasion"
                href={whatsapp(`¡Hola! Quisiera consultar por arreglos florales para ${title.toLowerCase()}.`)}
                target="_blank"
                rel="noreferrer"
                key={number}
              >
                <span className="flora-occasion-number">{number}</span>
                <span className="flora-occasion-text">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <span className="flora-occasion-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="flora-gallery">
          <div className="flora-gallery-heading">
            <span className="flora-eyebrow">INSPIRACIÓN NATURAL</span>
            <h2>Un mundo de formas y colores.</h2>
          </div>
          <div className="flora-gallery-grid">
            <img
              src="https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=85"
              alt="Flores frescas en tonos naturales"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=900&q=85"
              alt="Detalle de flores y pétalos"
              loading="lazy"
            />
            <img
              src= {colores}
              alt="Arreglo floral de estación"
              loading="lazy"
            />
          </div>
        </section>

        <section className="flora-contact" id="contacto">
          <div>
            <span className="flora-eyebrow">HABLEMOS DE FLORES</span>
            <h2>¿Tenés una ocasión especial <em>en mente?</em></h2>
            <p>
              Contanos qué estás buscando. Podemos ayudarte a elegir el arreglo
              ideal o crear algo especialmente para vos.
            </p>
          </div>
          <a
            className="flora-button flora-button-light"
            href={whatsapp('¡Hola! Quisiera hacer una consulta sobre sus arreglos florales.')}
            target="_blank"
            rel="noreferrer"
          >
            Escribinos por WhatsApp <span>↗</span>
          </a>
        </section>
      </main>

      <footer className="flora-footer">
        <a className="flora-brand" href="#inicio">
          <span className="flora-brand-name">flora<span>.</span></span>
          <span className="flora-brand-caption">ESTUDIO FLORAL</span>
        </a>
        <span>Flores para hacer especial lo cotidiano.</span>
        <span>Proyecto demostrativo · Toniut Impulso Digital</span>
      </footer>
    </div>
  )
}

export default FloraEstudio
