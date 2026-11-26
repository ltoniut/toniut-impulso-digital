
import { Link } from 'react-router'
import './Services.css'

const services = [
  {
    number: '01',
    title: 'Presencia digital',
    introduction:
      'Tu negocio también merece tener un lugar propio en internet.',
    description:
      'Desarrollo sitios web que representan tu negocio, muestran lo que ofrecés y facilitan que tus clientes encuentren la información que necesitan.',
    examples: [
      'Páginas institucionales y comerciales',
      'Catálogos digitales de productos o servicios',
      'Landing pages para emprendimientos y campañas',
      'Sitios con formularios y canales de contacto',
    ],
    audience:
      'Para emprendimientos, profesionales y comercios que quieren mostrar su propuesta de manera clara y profesional.',
  },
  {
    number: '02',
    title: 'Organización de tu negocio',
    introduction:
      'Menos tiempo buscando información. Más tiempo haciendo funcionar tu negocio.',
    description:
      'Podemos desarrollar herramientas para organizar la información y simplificar tareas que hoy resolvés con planillas, anotaciones o procesos manuales.',
    examples: [
      'Control de stock y movimientos de inventario',
      'Gestión y seguimiento de pedidos',
      'Registro de productos, clientes y proveedores',
      'Consultas e informes sobre la actividad del negocio',
    ],
    audience:
      'Para comercios y pequeñas empresas que necesitan ordenar sus operaciones y tener la información más accesible.',
  },
  {
    number: '03',
    title: 'Atención a tus clientes',
    introduction:
      'Hacé más sencilla la experiencia de quienes eligen tu negocio.',
    description:
      'Las herramientas digitales también pueden ayudarte a organizar consultas, recibir solicitudes y facilitar la interacción con tus clientes.',
    examples: [
      'Sistemas de reservas y turnos',
      'Formularios de consultas y solicitudes',
      'Gestión de pedidos y solicitudes de clientes',
      'Catálogos digitales para facilitar la elección',
    ],
    audience:
      'Para profesionales, comercios y negocios gastronómicos o de servicios que reciben consultas y solicitudes a diario.',
  },
  {
    number: '04',
    title: 'Automatización de tareas',
    introduction:
      '¿Hay algo que hacés todos los días y te gustaría dejar de hacer manualmente?',
    description:
      'Podemos identificar tareas repetitivas y desarrollar herramientas que automaticen procesos, organicen datos o conecten distintas partes de tu trabajo.',
    examples: [
      'Generación de reportes',
      'Procesamiento y organización de información',
      'Automatización de tareas administrativas',
      'Aplicaciones y herramientas específicas para tu actividad',
    ],
    audience:
      'Para negocios que quieren ahorrar tiempo, reducir tareas repetitivas y trabajar con procesos más ordenados.',
  },
]

function Services() {
  return (
    <main className="services-page">
      <title>Servicios | Toniut Impulso Digital</title>
      <section className="services-hero">
        <span className="section-eyebrow">
          SOLUCIONES DIGITALES A MEDIDA
        </span>

        <h1>
          La tecnología tiene que adaptarse a tu negocio,
          <span> no al revés.</span>
        </h1>

        <p>
          Cada negocio tiene sus propios desafíos. Desarrollo páginas
          web y aplicaciones pensadas para resolver necesidades reales,
          simplificar tareas y ayudarte a trabajar mejor.
        </p>
      </section>

      <section className="services-list">
        {services.map((service) => (
          <article
            className="service-detail"
            id={`servicio-${service.number}`}
            key={service.number}
          >
            <div className="service-detail-heading">
              <span className="service-number">{service.number}</span>
              <h2>{service.title}</h2>
              <h3>{service.introduction}</h3>
            </div>

            <div className="service-detail-content">
              <p className="service-description">
                {service.description}
              </p>

              <div className="service-examples">
                <h4>¿Qué podemos desarrollar?</h4>
                <ul>
                  {service.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>

              <p className="service-audience">
                <strong>¿Para quién?</strong> {service.audience}
              </p>

              <Link
                to="/contacto"
                state={{ project: 'Aplicación o sistema a medida' }}
                className="service-contact-link"
              >
                Consultar por este tipo de solución
                <span aria-hidden="true"> ↗</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="services-custom">
        <span className="section-eyebrow">
          TU NEGOCIO NO TIENE QUE ENCAJAR EN UN MOLDE
        </span>

        <h2>
          ¿Tenés una necesidad que no aparece acá?
        </h2>

        <p>
          No hace falta que sepas exactamente qué sistema necesitás
          ni cómo debería funcionar. Contame qué te gustaría mejorar,
          qué tarea te complica o qué problema querés resolver.
          Podemos pensar juntos una solución.
        </p>

        <Link to="/contacto" className="button button--primary">
          Hablemos de tu negocio
        </Link>
      </section>
    </main>
  )
}

export default Services
