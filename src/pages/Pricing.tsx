
import { Link } from 'react-router'
import './Pricing.css'

const MOST_CHOSEN_PLAN: string | null = null

const developmentServices = [
  {
    name: 'Página inicial',
    price: '$300.000',
    contactOption: 'Página web para mi emprendimiento',
    description:
      'Una página web personalizada para que tu emprendimiento comience a tener presencia profesional en internet.',
    features: [
      'Diseño visual personalizado',
      'Una página responsive',
      'Presentación del emprendimiento',
      'Productos o servicios',
      'Información de contacto y WhatsApp',
      'Configuración y publicación inicial',
      'Una ronda de correcciones',
    ],
    demo: { label: 'Flora Estudio', path: '/flora-estudio' },
    featured: true,
  },
  {
    name: 'Sitio profesional',
    price: 'Desde $500.000',
    contactOption: 'Sitio web profesional o comercial',
    description:
      'Una presencia web más completa para profesionales y negocios que necesitan desarrollar su propuesta.',
    features: [
      'Diseño personalizado',
      'Estructura adaptada al proyecto',
      'Secciones según las necesidades del negocio',
      'Diseño adaptable a dispositivos',
      'Configuración y publicación inicial',
    ],
    demo: { label: 'Estudio Umbral', path: '/estudio-juridico' },
  },
  {
    name: 'Sitio comercial avanzado',
    price: 'Desde $750.000',
    contactOption: 'Sitio web profesional o comercial',
    description:
      'Para negocios que necesitan presentar una oferta más amplia de productos o servicios y funcionalidades adicionales.',
    features: [
      'Diseño personalizado',
      'Estructura comercial ampliada',
      'Funcionalidades según el proyecto',
      'Solución adaptada al negocio',
      'Configuración y publicación inicial',
    ],
    demo: { label: 'Servilletas', path: '/servilletas' },
  },
  {
    name: 'Aplicaciones web',
    price: 'A medida',
    contactOption: 'Aplicación o sistema a medida',
    description:
      'Sistemas y aplicaciones desarrollados para resolver necesidades específicas de tu negocio.',
    features: [
      'Análisis de requerimientos',
      'Diseño de la solución',
      'Desarrollo personalizado',
      'Presupuesto según el alcance',
    ],
    demo: { label: 'La Mesa', path: '/restaurante' },
  },
]

const maintenancePlans = [
  {
    name: 'Esencial',
    price: '$30.000',
    contactOption: 'Mantenimiento o actualización',
    description: 'Para mantener tu página funcionando y protegida.',
    features: [
      'Hosting de la página',
      'Supervisión de disponibilidad',
      'Mantenimiento técnico',
      'Copias de seguridad',
      'Actualizaciones de seguridad',
      'Asistencia ante inconvenientes técnicos',
    ],
  },
  {
    name: 'Emprendedor',
    price: '$55.000',
    contactOption: 'Mantenimiento o actualización',
    description: 'Para mantener tu negocio actualizado en internet.',
    features: [
      'Todo lo incluido en Esencial',
      'Actualización de textos e imágenes',
      'Cambios de información comercial',
      'Actualización de horarios, precios y servicios',
      'Atención prioritaria',
    ],
  },
  {
    name: 'Integral',
    price: '$100.000',
    contactOption: 'Mantenimiento o actualización',
    description: 'Para negocios que necesitan acompañamiento continuo.',
    features: [
      'Todo lo incluido en Emprendedor',
      'Actualizaciones frecuentes de contenido',
      'Incorporación de nuevas secciones sencillas',
      'Revisión periódica del funcionamiento',
      'Acompañamiento técnico prioritario',
    ],
  },
]

function Pricing() {
  return (
    <main className="pricing-page">
      <title>Tarifas | Toniut Impulso Digital</title>
      <section className="pricing-hero">
        <span className="section-eyebrow">Tarifas</span>
        <h1>Una solución para cada etapa de tu negocio.</h1>
        <p>
          Cada proyecto es diferente. Por eso ofrecemos distintas
          alternativas, desde una primera página web hasta soluciones
          desarrolladas a medida.
        </p>
      </section>

      <section className="pricing-section" id="desarrollo">
        <div className="pricing-section-heading">
          <span className="section-eyebrow">Desarrollo web</span>
          <h2>Tu negocio, con su propio lugar en internet.</h2>
          <p>
            Elegí el punto de partida. Si necesitás algo diferente,
            podemos conversar sobre tu proyecto.
          </p>
        </div>

        <div className="development-grid">
          {developmentServices.map((service) => (
            <article
              className={`development-card ${
                service.featured ? 'development-card--featured' : ''
              }`}
              key={service.name}
            >
              {service.featured && (
                <span className="pricing-label">Para empezar</span>
              )}

              <h3>{service.name}</h3>
              <p className="development-description">
                {service.description}
              </p>

              <p className="development-price">{service.price}</p>

              <ul className="pricing-feature-list">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              {service.demo && (
                <Link to={service.demo.path} className="pricing-demo-link">
                  <span className="pricing-demo-tag">Ejemplo: </span>
                  <span>
                    Mirá <strong>{service.demo.label}</strong>
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              )}

              <Link
                to="/contacto"
                state={{ project: service.contactOption }}
                className="pricing-card-link"
                >
                Consultar por este servicio
                <span aria-hidden="true"> →</span>
              </Link>
            </article>
          ))}
        </div>

        <p className="pricing-note">
          Los precios de desarrollo son orientativos. El presupuesto
          definitivo depende de las características y el alcance de
          cada proyecto. El dominio se abona por separado.
        </p>
      </section>

      <section
        className="pricing-section maintenance-section"
        id="mantenimiento"
      >
        <div className="pricing-section-heading">
          <span className="section-eyebrow">Mantenimiento</span>
          <h2>Tu página también necesita atención.</h2>
          <p>
            Una vez publicada, puedo ocuparme de que tu página siga
            funcionando, esté protegida y se mantenga actualizada.
            Vos concentráte en tu negocio.
          </p>
        </div>

        <div className="maintenance-grid">
          {maintenancePlans.map((plan) => {
  const isMostChosen = plan.name === MOST_CHOSEN_PLAN

  return (
    <article
      className={`maintenance-card ${isMostChosen ? 'maintenance-card--featured' : ''}`}
      key={plan.name}
    >
      {isMostChosen && <span className="pricing-label">Más elegido</span>}

      <h3>{plan.name}</h3>
      <p className="maintenance-description">{plan.description}</p>

      <p className="maintenance-price">
        {plan.price}
        <span> / mes</span>
      </p>

      <ul className="pricing-feature-list">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <Link
        to="/contacto"
        state={{ project: plan.contactOption }}
        className="pricing-card-link"
      >
        Consultar plan <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
})}
        </div>

        <p className="pricing-note">
          Todos los planes incluyen el alojamiento de la página.
          El alcance del servicio se acuerda según las características
          del proyecto y la infraestructura necesaria.
        </p>
      </section>

      <section className="pricing-section pricing-extra">
        <div>
          <span className="section-eyebrow">Sin sorpresas</span>
          <h2>¿Necesitás algo diferente?</h2>
          <p>
            No todos los proyectos encajan en un paquete. Contame
            qué tenés en mente y podemos encontrar una solución
            adecuada para tu negocio.
          </p>
          <Link
            to="/contacto"
            state={{ project: 'Otra consulta'}}
            className="button button--primary"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </section>

      <section className="pricing-conditions">
        <h2>Algunas cosas que conviene saber</h2>
        <ul>
          <li>
            Cada proyecto se evalúa antes de confirmar un presupuesto.
          </li>
          <li>
            La configuración y publicación inicial están incluidas
            en el desarrollo.
          </li>
          <li>
            El dominio se registra a nombre del cliente y su costo
            no está incluido en el desarrollo ni en el mantenimiento.
          </li>
          <li>
            El alojamiento está incluido en los planes de mantenimiento.
          </li>
          <li>
            Las modificaciones de contenido están sujetas al alcance
            del plan contratado.
          </li>
          <li>
            Las nuevas funcionalidades y ampliaciones se presupuestan
            por separado.
          </li>
          <li>
            Todo trabajo adicional se acuerda antes de comenzar.
          </li>
        </ul>
      </section>
    </main>
  )
}

export default Pricing
