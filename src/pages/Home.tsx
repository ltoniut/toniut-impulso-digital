
import { Link } from 'react-router'
import '../App.css'

function Home() {
  return (
    <main>
      <title>Toniut Impulso Digital | Desarrollo web a medida</title>
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">
            TECNOLOGÍA PARA TU NEGOCIO
          </span>

          <h1>
            Tu negocio merece
            <br />
            soluciones digitales <span>a medida.</span>
          </h1>

          <p className="hero-description">
            Desarrollo páginas web y aplicaciones pensadas para
            ayudarte a hacer crecer tu negocio y simplificar
            tu trabajo cotidiano.
          </p>

          <p className="hero-secondary">
            Cada negocio es diferente. Por eso, antes de pensar
            en tecnología, quiero conocer qué necesitás y qué
            podemos mejorar juntos.
          </p>

          <div className="hero-actions">
            <Link to="/contacto" className="button button--primary">
              Hablemos de tu proyecto
            </Link>

            <Link to="/servicios" className="button button--secondary">
              Conocé mis servicios
            </Link>
          </div>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <div className="decoration-circle decoration-circle--large" />
          <div className="decoration-circle decoration-circle--small" />

          <div className="decoration-card">
            <span className="decoration-card-icon">✳</span>
            <span>Una idea.</span>
            <strong>Una solución.</strong>
            <span>Un negocio que avanza.</span>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div>
          <span className="section-eyebrow">
            CADA NEGOCIO ES DIFERENTE
          </span>

          <h2>
            No necesitás saber qué tecnología necesitás.
            Necesitás saber qué querés mejorar.
          </h2>
        </div>

        <div>
          <p>
            Quizás necesitás una página web para mostrar tus productos.
            Quizás querés organizar mejor tus pedidos, controlar tu
            stock o dejar de hacer manualmente tareas que te quitan
            tiempo.
          </p>

          <p>
            Mi trabajo es escucharte, entender cómo funciona tu negocio
            y desarrollar una solución que se adapte a tus necesidades.
          </p>

          <Link to="/servicios" className="button button--secondary">
            Descubrí qué podemos hacer
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
