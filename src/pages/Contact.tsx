
import Button from '../components/Button'
import { useLocation } from 'react-router'
import { projectOptions } from '../data/projectOptions'
import './Contact.css'
import { type FormEvent } from 'react'

const WHATSAPP_NUMBER = '5492235475464'
const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`


function Contact() {
  const location = useLocation()
  const selectedProject = location.state?.project ?? ''

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const text = [
      'Hola, quisiera consultar por un proyecto.',
      '',
      `Nombre: ${data.get('name')}`,
      `Correo: ${data.get('email')}`,
      `Proyecto: ${data.get('project')}`,
      '',
      `Mensaje: ${data.get('message')}`,
    ].join('\n')

    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <span className="section-eyebrow">
          HABLEMOS DE TU PROYECTO
        </span>

        <h1>
          Toda gran idea
          <br />
          empieza con una <span>conversación.</span>
        </h1>

        <p>
          ¿Tenés una idea, un negocio que querés hacer crecer
          o simplemente querés saber qué posibilidades tenés?
          Me gustaría escucharte.
        </p>

        <p>
          No necesitás tener todo resuelto. Contame qué tenés
          en mente y vemos juntos cómo podemos hacerlo realidad.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-form-container">
          <h2>Contame sobre tu proyecto</h2>
          <p>
            Completá el formulario y me pondré en contacto
            con vos a la brevedad.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="¿Cómo te llamás?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="project">¿Qué tenés en mente?</label>
              <select id="project" name="project" defaultValue={selectedProject} required>
                <option value="" disabled>Seleccioná una opción</option>
                {projectOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Contame un poco sobre tu idea o lo que necesitás..."
                required
              />
            </div>

            <Button type="submit">
              Enviar consulta
            </Button>
          </form>
        </div>

        <aside className="contact-alternative">
          <h2>¿Preferís hablar directamente?</h2>
          <p>
            También podés escribirme por WhatsApp.
            A veces, una conversación es la mejor manera
            de empezar.
          </p>

          <a
            className="contact-whatsapp"
            href="https://wa.me/TU_NUMERO"
            target="_blank"
            rel="noreferrer"
          >
            Escribime por WhatsApp
          </a>

          <div className="contact-note">
            <span>✳</span>
            <p>
              Sin compromisos ni presupuestos automáticos.
              Primero escucho lo que necesitás; después
              vemos cuál es la mejor solución.
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Contact
