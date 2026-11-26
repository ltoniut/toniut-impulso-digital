import { Link } from 'react-router'
import { base } from './routes'

const products = [
  { n: '01', tone: 'ivory', category: 'CLÁSICA', name: 'Blanco esencial',
    text: 'Una opción versátil para acompañar cualquier estilo de mesa.' },
  { n: '02', tone: 'natural', category: 'TEXTURA NATURAL', name: 'Trama orgánica',
    text: 'Una textura sutil para espacios cálidos y relajados.' },
  { n: '03', tone: 'sage', category: 'A TU ESTILO', name: 'Color de autor',
    text: 'Personalizá el color para que converse con tu identidad.' },
]

function ProductPage() {
  return (
    <section className="servilletas-products">
      <div className="servilletas-section-heading">
        <div>
          <span className="servilletas-eyebrow">NUESTRAS OPCIONES</span>
          <h2>Una base para empezar.</h2>
        </div>
        <p>
          Elegí una alternativa de nuestro catálogo o usala como punto de
          partida para diseñar algo propio.
        </p>
      </div>

      <div className="servilletas-product-grid">
        {products.map((p) => (
          <article className="servilletas-product" key={p.n}>
            <div className={`product-swatch product-swatch--${p.tone}`}>
              <span className="product-swatch-fold" />
              <span className="product-swatch-label">{p.n}</span>
            </div>
            <div className="servilletas-product-info">
              <span className="product-category">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              <Link to={`${base}/personalizar`}>
                Consultar esta opción <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductPage