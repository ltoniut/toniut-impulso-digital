
import { NavLink, Routes, Route, Outlet, Link } from 'react-router'
import { useState, type FormEvent, type ReactNode } from 'react'
import DemoBar from '../../../components/DemoBar'

import './LegalApp.css'

const base = '/estudio-juridico'

const whatsapp = (message: string) =>
  `https://wa.me/?text=${encodeURIComponent(message)}`

const practiceAreas = [
  {
    number: '01',
    title: 'Derecho laboral',
    summary: 'Acompañamiento en conflictos y relaciones de trabajo.',
    detail:
      'Asesoramos a trabajadores y empleadores en consultas laborales, desvinculaciones, reclamos, acuerdos y conflictos derivados de la relación de trabajo.',
    topics: [
      'Despidos e indemnizaciones',
      'Diferencias salariales',
      'Registración laboral',
      'Acuerdos y conciliaciones',
      'Asesoramiento preventivo a empleadores',
    ],
  },
  {
    number: '02',
    title: 'Derecho civil y comercial',
    summary: 'Soluciones para acuerdos, contratos y conflictos.',
    detail:
      'Intervenimos en asuntos civiles y comerciales, buscando soluciones claras y estrategias adecuadas para cada situación.',
    topics: [
      'Contratos y obligaciones',
      'Daños y perjuicios',
      'Incumplimientos contractuales',
      'Conflictos entre particulares',
      'Reclamos comerciales',
    ],
  },
  {
    number: '03',
    title: 'Derecho de familia',
    summary: 'Asesoramiento cuidadoso en decisiones personales.',
    detail:
      'Acompañamos procesos familiares con atención personalizada, procurando que cada persona comprenda sus alternativas y las consecuencias de cada decisión.',
    topics: [
      'Divorcios',
      'Cuota alimentaria',
      'Cuidado personal y comunicación',
      'Compensaciones económicas',
      'Acuerdos familiares',
    ],
  },
  {
    number: '04',
    title: 'Asesoramiento a empresas',
    summary: 'Acompañamiento jurídico para emprendedores y PyMEs.',
    detail:
      'Trabajamos junto a pequeños negocios y emprendimientos para ordenar sus relaciones comerciales, prevenir conflictos y tomar decisiones con respaldo jurídico.',
    topics: [
      'Contratos comerciales',
      'Constitución y organización societaria',
      'Relaciones con proveedores',
      'Prevención de conflictos',
      'Consultoría jurídica recurrente',
    ],
  },
]

const team = [
  {
    name: 'Martina Ríos',
    role: 'Derecho laboral',
    description:
      'Interesada en las relaciones de trabajo y en acercar herramientas jurídicas a trabajadores y pequeños empleadores.',
    initials: 'MR',
    tone: 'sand',
  },
  {
    name: 'Tomás Ferrer',
    role: 'Derecho civil y comercial',
    description:
      'Enfocado en contratos, resolución de conflictos y asesoramiento a particulares y organizaciones.',
    initials: 'TF',
    tone: 'blue',
  },
  {
    name: 'Lucía Benítez',
    role: 'Familia y empresas',
    description:
      'Orientada al acompañamiento personalizado y a la prevención de conflictos en decisiones importantes.',
    initials: 'LB',
    tone: 'green',
  },
]

const faqs = [
  {
    question: '¿Cómo puedo solicitar una primera consulta?',
    answer:
      'Podés escribirnos desde el formulario de contacto o por WhatsApp. Nos contás brevemente qué necesitás y coordinamos el siguiente paso.',
  },
  {
    question: '¿La primera consulta tiene costo?',
    answer:
      'Las condiciones y honorarios se informan antes de coordinar la consulta, para que sepas de antemano qué esperar.',
  },
  {
    question: '¿Atienden a personas y empresas?',
    answer:
      'Sí. El estudio está pensado para acompañar tanto a particulares como a emprendedores y pequeñas empresas.',
  },
  {
    question: '¿Puedo hacer una consulta de manera remota?',
    answer:
      'Podemos coordinar reuniones virtuales cuando el tipo de consulta lo permita. También ofrecemos atención presencial con cita previa.',
  },
  {
    question: '¿Qué información debería llevar a la consulta?',
    answer:
      'Si tenés contratos, comunicaciones, documentación o fechas relevantes relacionadas con tu situación, es útil tenerlas disponibles. No hace falta que conozcas de antemano qué documentación es necesaria: podemos orientarte.',
  },
]

function LegalLayout() {
  return (
    <div className="legal-site">
      <DemoBar />
      <header className="legal-header">
        <Link className="legal-brand" to={base}>
          <span className="legal-brand-mark">U.</span>
          <span className="legal-brand-text">
            <strong>UMBRAL</strong>
            <small>ESTUDIO JURÍDICO</small>
          </span>
        </Link>

        <nav className="legal-nav" aria-label="Navegación principal">
          <NavLink to={base} end>Inicio</NavLink>
          <NavLink to={`${base}/areas`}>Áreas de práctica</NavLink>
          <NavLink to={`${base}/equipo`}>El equipo</NavLink>
          <NavLink to={`${base}/metodologia`}>Cómo trabajamos</NavLink>
          <NavLink to={`${base}/preguntas`}>Preguntas frecuentes</NavLink>
        </nav>

        <Link className="legal-header-cta" to={`${base}/contacto`}>
          Contactanos <span>↗</span>
        </Link>
      </header>

      <main className="legal-main">
        <Outlet />
      </main>

      <footer className="legal-footer">
        <div className="legal-footer-top">
          <Link className="legal-brand legal-brand-light" to={base}>
            <span className="legal-brand-mark">U.</span>
            <span className="legal-brand-text">
              <strong>UMBRAL</strong>
              <small>ESTUDIO JURÍDICO</small>
            </span>
          </Link>
          <p>El derecho cambia. La forma de ejercerlo también.</p>
          <Link to={`${base}/contacto`}>Hablemos de tu consulta ↗</Link>
        </div>
        <div className="legal-footer-bottom">
          <span>© 2026 Estudio Umbral</span>
          <span>Proyecto demostrativo · Toniut Impulso Digital</span>
        </div>
      </footer>
    </div>
  )
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: ReactNode
  description: string
}) {
  return (
    <section className="legal-page-intro">
      <span className="legal-eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

function LegalHome() {
  return (
    <>
      <section className="legal-hero">
        <div className="legal-hero-copy">
          <span className="legal-eyebrow">ESTUDIO JURÍDICO · MAR DEL PLATA</span>
          <h1>El derecho cambia. <em>La forma de ejercerlo también.</em></h1>
          <p>
            Asesoramiento jurídico claro y personalizado para acompañarte
            en las decisiones que importan.
          </p>
          <div className="legal-hero-actions">
            <Link className="legal-button" to={`${base}/contacto`}>
              Contanos qué necesitás <span>↗</span>
            </Link>
            <Link className="legal-text-link" to={`${base}/equipo`}>
              Conocé al equipo →
            </Link>
          </div>
          <div className="legal-hero-note">
            <span>01</span>
            <span>Atención personalizada · Comunicación directa</span>
          </div>
        </div>

        <div className="legal-hero-visual">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=85"
            alt="Espacio de trabajo moderno y luminoso"
          />
          <div className="legal-hero-stamp">
            <span>U.</span>
            <small>UNA NUEVA<br />PERSPECTIVA</small>
          </div>
          <span className="legal-visual-caption">Una práctica jurídica cercana y actual.</span>
        </div>
      </section>

      <section className="legal-home-statement">
        <span className="legal-eyebrow">UNA NUEVA GENERACIÓN DE ABOGADOS</span>
        <h2>
          Tu situación es única.
          <em> Tu asesoramiento también debería serlo.</em>
        </h2>
        <p>
          Somos un equipo de profesionales que entiende el derecho como una
          herramienta para resolver problemas, anticipar conflictos y tomar
          decisiones con mayor tranquilidad.
        </p>
      </section>

      <section className="legal-home-areas">
        <div className="legal-section-heading">
          <div>
            <span className="legal-eyebrow">EN QUÉ PODEMOS AYUDARTE</span>
            <h2>Áreas de práctica</h2>
          </div>
          <Link className="legal-text-link" to={`${base}/areas`}>
            Ver todas las áreas →
          </Link>
        </div>
        <div className="legal-area-grid">
          {practiceAreas.map((area) => (
            <Link
              className="legal-area-card"
              to={`${base}/areas#${area.number}`}
              key={area.number}
            >
              <span>{area.number}</span>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
              <span className="legal-card-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="legal-home-approach">
        <div>
          <span className="legal-eyebrow">NUESTRA FORMA DE TRABAJAR</span>
          <h2>Menos vueltas. <em>Más claridad.</em></h2>
          <p>
            Escuchamos, analizamos y te explicamos las alternativas antes de
            avanzar. Queremos que entiendas cada paso y puedas participar
            activamente de las decisiones.
          </p>
          <Link className="legal-button legal-button-outline" to={`${base}/metodologia`}>
            Conocé nuestra metodología <span>→</span>
          </Link>
        </div>
        <div className="legal-approach-quote">
          <span>“</span>
          <blockquote>
            La confianza empieza cuando sabés qué está pasando y por qué.
          </blockquote>
          <small>ESTUDIO UMBRAL</small>
        </div>
      </section>

      <section className="legal-home-contact">
        <div>
          <span className="legal-eyebrow">PRIMER PASO</span>
          <h2>Hablemos de lo que necesitás resolver.</h2>
        </div>
        <Link className="legal-button legal-button-light" to={`${base}/contacto`}>
          Contactar al estudio <span>↗</span>
        </Link>
      </section>
    </>
  )
}

function AreasPage() {
  return (
    <>
      <PageIntro
        eyebrow="ÁREAS DE PRÁCTICA"
        title={<>Asesoramiento para cada <em>decisión.</em></>}
        description="Trabajamos en distintas áreas del derecho para ofrecer respuestas concretas a personas, emprendedores y pequeñas empresas."
      />
      <section className="legal-detail-list">
        {practiceAreas.map((area) => (
          <article className="legal-detail-card" id={area.number} key={area.number}>
            <span className="legal-detail-number">{area.number}</span>
            <div className="legal-detail-main">
              <h2>{area.title}</h2>
              <p>{area.detail}</p>
              <ul>
                {area.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
            </div>
            <Link
              className="legal-detail-link"
              to={`${base}/contacto`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Consultar sobre esta área ↗
            </Link>
          </article>
        ))}
      </section>
      <section className="legal-page-cta">
        <h2>¿No sabés qué área corresponde a tu situación?</h2>
        <p>Contanos brevemente qué necesitás. Podemos orientarte sobre cómo continuar.</p>
        <Link className="legal-button" to={`${base}/contacto`}>Hacer una consulta ↗</Link>
      </section>
    </>
  )
}

function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="QUIÉNES SOMOS"
        title={<>Tres miradas. <em>Un mismo compromiso.</em></>}
        description="Un equipo joven que combina formación jurídica, nuevas herramientas y una manera cercana de trabajar."
      />
      <section className="legal-team-grid">
        {team.map((person) => (
          <article className="legal-team-card" key={person.initials}>
            <div className={`legal-team-portrait legal-team-portrait--${person.tone}`}>
              <span>{person.initials}</span>
              <small>PERFIL DEMOSTRATIVO</small>
            </div>
            <div className="legal-team-info">
              <span className="legal-eyebrow">{person.role}</span>
              <h2>{person.name}</h2>
              <p>{person.description}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="legal-team-statement">
        <span className="legal-eyebrow">UNA FORMA DISTINTA DE EJERCER</span>
        <h2>No creemos en las respuestas automáticas. <em>Creemos en escuchar primero.</em></h2>
        <p>
          Cada consulta merece atención. Nos tomamos el tiempo para comprender
          el contexto, explicar las opciones y construir una estrategia
          adecuada a cada caso.
        </p>
      </section>
    </>
  )
}

function MethodPage() {
  const steps = [
    ['01', 'Primera conversación', 'Nos contás qué está pasando y qué necesitás resolver. Escuchamos antes de proponer un camino.'],
    ['02', 'Análisis del caso', 'Revisamos la información y la documentación disponible para comprender el escenario.'],
    ['03', 'Alternativas y estrategia', 'Te explicamos las opciones posibles, sus alcances y los pasos que recomendamos.'],
    ['04', 'Acompañamiento', 'Si decidís avanzar, trabajamos con comunicación clara y seguimiento de cada etapa.'],
  ]

  return (
    <>
      <PageIntro
        eyebrow="CÓMO TRABAJAMOS"
        title={<>Un proceso claro. <em>De principio a fin.</em></>}
        description="Queremos que sepas qué estamos haciendo, cuáles son tus alternativas y qué podés esperar en cada etapa."
      />
      <section className="legal-process-list">
        {steps.map(([number, title, description]) => (
          <article className="legal-process-step" key={number}>
            <span>{number}</span>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="legal-method-note">
        <h2>La información también es parte del asesoramiento.</h2>
        <p>
          Antes de comenzar cualquier trabajo, conversamos sobre el alcance
          del servicio, los honorarios y las condiciones de intervención.
          Nada debería avanzar sin que sepas qué se está acordando.
        </p>
        <Link className="legal-button" to={`${base}/contacto`}>Coordinar una consulta ↗</Link>
      </section>
    </>
  )
}

function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="PREGUNTAS FRECUENTES"
        title={<>Empezar por tener <em>las cosas claras.</em></>}
        description="Algunas respuestas a las dudas que suelen aparecer antes de realizar una consulta."
      />
      <section className="legal-faq-list">
        {faqs.map((faq, index) => (
          <details className="legal-faq-item" key={faq.question}>
            <summary>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{faq.question}</strong>
              <span className="legal-faq-plus">+</span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
      <section className="legal-page-cta">
        <h2>¿Tu pregunta no está acá?</h2>
        <p>Escribinos y contanos qué necesitás saber.</p>
        <Link className="legal-button" to={`${base}/contacto`}>Contactanos ↗</Link>
      </section>
    </>
  )
}

function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [area, setArea] = useState('No estoy seguro/a')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const text = [
      'Hola, quisiera realizar una consulta al Estudio Umbral.',
      '',
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Área: ${area}`,
      '',
      `Consulta: ${message}`,
    ].join('\n')

    window.open(whatsapp(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageIntro
        eyebrow="CONTACTO"
        title={<>Empecemos por <em>conversar.</em></>}
        description="Contanos brevemente qué necesitás. Vamos a leer tu mensaje y orientarte sobre los próximos pasos."
      />
      <section className="legal-contact-layout">
        <div className="legal-contact-info">
          <span className="legal-eyebrow">ESTUDIO UMBRAL</span>
          <h2>Una consulta puede ser el primer paso.</h2>
          <p>
            La información que compartas nos permitirá comprender mejor
            tu situación y evaluar cómo podemos ayudarte.
          </p>
          <div className="legal-contact-detail">
            <small>ATENCIÓN</small>
            <strong>Con cita previa</strong>
          </div>
          <div className="legal-contact-detail">
            <small>MODALIDAD</small>
            <strong>Presencial y virtual</strong>
          </div>
          <div className="legal-contact-detail">
            <small>UBICACIÓN</small>
            <strong>Mar del Plata, Buenos Aires</strong>
          </div>
          <a
            className="legal-contact-whatsapp"
            href={whatsapp('Hola, quisiera realizar una consulta al Estudio Umbral.')}
            target="_blank"
            rel="noreferrer"
          >
            O escribinos directamente por WhatsApp ↗
          </a>
        </div>

        <form className="legal-contact-form" onSubmit={handleSubmit}>
          <label>
            Nombre y apellido
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Área de consulta
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              <option>No estoy seguro/a</option>
              {practiceAreas.map((item) => (
                <option key={item.number}>{item.title}</option>
              ))}
            </select>
          </label>
          <label>
            Contanos brevemente tu situación
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <p className="legal-form-note">
            Este formulario prepara un mensaje para WhatsApp. No envía
            documentación ni constituye una consulta jurídica formal.
          </p>
          <button className="legal-button" type="submit">
            Preparar consulta <span>↗</span>
          </button>
        </form>
      </section>
    </>
  )
}

function LegalApp() {
  return (
    <Routes>
      <Route element={<LegalLayout />}>
        <Route index element={<LegalHome />} />
        <Route path="areas" element={<AreasPage />} />
        <Route path="equipo" element={<TeamPage />} />
        <Route path="metodologia" element={<MethodPage />} />
        <Route path="preguntas" element={<FaqPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="*" element={<LegalHome />} />
      </Route>
    </Routes>
  )
}

export default LegalApp
