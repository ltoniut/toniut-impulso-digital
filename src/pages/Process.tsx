
import ProcessStep from '../components/ProcessStep'
import './Process.css'

const steps = [
  {
    number: '01',
    icon: 'conversation' as const,
    title: 'Nos conocemos',
    description:
      'Conversamos sobre tu negocio, tus ideas y qué necesitás conseguir. No hace falta que tengas todo resuelto: podemos empezar desde cero.',
  },
  {
    number: '02',
    icon: 'idea' as const,
    title: 'Damos forma a la idea',
    description:
      'Definimos juntos el alcance, el diseño y la solución adecuada para tu proyecto. Tendrás una propuesta clara antes de empezar.',
  },
  {
    number: '03',
    icon: 'development' as const,
    title: 'Lo hacemos realidad',
    description:
      'Desarrollo tu página o aplicación y te muestro los avances para que podamos revisar los detalles y hacer los ajustes necesarios.',
  },
  {
    number: '04',
    icon: 'launch' as const,
    title: 'Salimos al mundo',
    description:
      'Publicamos tu proyecto para que empiece a trabajar por tu negocio. Y si querés, puedo seguir acompañándote con hosting y mantenimiento.',
  },
]

function Process() {
  return (
    <main className="process-page">
      <section className="process-hero">
        <span className="section-eyebrow">
          UN CAMINO COMPARTIDO
        </span>

        <h1>
          De la idea a tu <span>página web.</span>
        </h1>

        <p>
          Un proceso sencillo, transparente y acompañado
          en cada etapa. Vos conocés tu negocio; yo te ayudo
          a llevarlo al mundo digital.
        </p>
      </section>

      <section className="process-section">
        <div className="process-steps">
          {steps.map((step) => (
            <ProcessStep
              key={step.number}
              {...step}
            />
          ))}
        </div>
      </section>

      <section className="process-closing">
        <div className="process-closing__decoration" aria-hidden="true">
          ✳
        </div>

        <div>
          <span>Y ESTO RECIÉN EMPIEZA</span>
          <h2>Tu negocio evoluciona. Tu presencia digital también.</h2>
          <p>
            Una página web no tiene por qué ser el final de un
            proyecto. Puede ser el comienzo de muchas cosas nuevas.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Process
