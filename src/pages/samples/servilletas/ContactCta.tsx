import { Link } from 'react-router'

function ContactCta({ to }: { to: string }) {
  return (
    <section className="servilletas-contact" id="contacto">
      <div>
        <span className="servilletas-eyebrow">DE LA IDEA A LA MESA</span>
        <h2>¿Tenés un restaurante en mente?</h2>
        <p>
          Contanos qué estilo buscás. Podemos ayudarte a elegir una base o
          pensar una servilleta que se sienta propia.
        </p>
      </div>
      <Link className="servilletas-button servilletas-button--light" to={to}>
        Empezar mi consulta <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

export default ContactCta