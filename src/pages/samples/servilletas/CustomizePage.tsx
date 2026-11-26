import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import NapkinEditor from './NapkinEditor'
import { savePersonalizationDraft } from './draft'

type CustomizationMode = 'complete' | 'partial'
const sizes = ['30 × 40 cm', '33 × 45 cm', '40 × 50 cm', '30 × 30 cm (cuadrada)', 'A definir']
const textures = ['Suave', 'Texturada', 'Doble hoja', 'A definir']
const papers = ['Papel tissue', 'Papel kraft', 'Papel reciclado', 'A definir']
const colors = ['Blanco', 'Natural', 'Personalizado', 'A definir']

function CustomizePage() {
  const [logoName, setLogoName] = useState('')
  const [logoPlacement, setLogoPlacement] = useState('')
  const [canvasJpg, setCanvasJpg] = useState('')
  const [mode, setMode] = useState<CustomizationMode>('complete')
  const [selectedElements, setSelectedElements] = useState<string[]>([
    'Tamaño', 'Textura', 'Logo', 'Color',
  ])
  const [size, setSize] = useState('')
  const [texture, setTexture] = useState('')
  const [paper, setPaper] = useState('')
  const [color, setColor] = useState('')
  const [logo, setLogo] = useState('')
  const updateLogoConfiguration = useCallback((name: string, placement: string, image: string) => {
    setLogoName(name)
    setLogoPlacement(placement)
    setCanvasJpg(image)
  }, [])

  const toggleElement = (element: string) => {
    setSelectedElements((current) =>
      current.includes(element)
        ? current.filter((item) => item !== element)
        : [...current, element],
    )
  }

  const navigate = useNavigate()

  function continueToContact() {
    savePersonalizationDraft({
      mode,
      selectedElements,
      size,
      texture,
      paper,
      color,
      logo,
      logoName,
      logoPlacement,
      canvasJpg,
    })

    navigate('/servilletas/contacto')
  }

  return (
    <section className="servilletas-personalize" id="personalizar">
      <div className="servilletas-form-intro">
        <span className="servilletas-eyebrow">HAGÁMOSLA TUYA</span>
        <h2>Vos elegís cuánto querés personalizar.</h2>
        <p>
          Podés partir de una idea completa o pedir ayuda con un solo
          detalle. Contanos qué necesita tu restaurante y te orientamos.
        </p>

        <div className="servilletas-benefit-list">
          <div>
            <span>01</span>
            <p><strong>Diseño a medida</strong>Elegí cada detalle de tu servilleta.</p>
          </div>
          <div>
            <span>02</span>
            <p><strong>Ayuda puntual</strong>Resolvé solo el tamaño, la textura o tu logo.</p>
          </div>
          <div>
            <span>03</span>
            <p><strong>Asesoramiento</strong>Si todavía no lo tenés claro, lo vemos juntos.</p>
          </div>
        </div>
      </div>

      <form
        className="servilletas-form"
        onSubmit={(event) => {
          event.preventDefault()
          continueToContact()
        }}
      >
        <div className="personalization-progress" aria-label="Paso 1 de 2">
          <strong>Diseño</strong>
        </div>

        <div className="servilletas-form-heading">
          <span>CONSULTA PERSONALIZADA</span>
          <strong>Contanos qué estás buscando.</strong>
        </div>

        <fieldset className="servilletas-mode-fieldset">
          <legend>¿Cómo querés empezar?</legend>
          <label className={`servilletas-mode-option ${mode === 'complete' ? 'is-selected' : ''}`}>
            <input
              type="radio"
              name="mode"
              value="complete"
              checked={mode === 'complete'}
              onChange={() => {
                setMode('complete')
                setSelectedElements(['Tamaño', 'Textura', 'Logo', 'Color'])
              }}
            />
            <span>
              <strong>Diseñarla completa</strong>
              <small>Elegimos juntos cada elemento.</small>
            </span>
          </label>
          <label className={`servilletas-mode-option ${mode === 'partial' ? 'is-selected' : ''}`}>
            <input
              type="radio"
              name="mode"
              value="partial"
              checked={mode === 'partial'}
              onChange={() => setMode('partial')}
            />
            <span>
              <strong>Resolver algunos detalles</strong>
              <small>Marcá solo lo que necesitás personalizar.</small>
            </span>
          </label>
        </fieldset>

        <fieldset className="servilletas-elements-fieldset">
          <legend>
            {mode === 'complete' ? '¿Qué elementos te interesan?' : '¿Qué querés personalizar?'}
          </legend>
          <div className="servilletas-checkbox-grid">
            {['Tamaño', 'Textura', 'Logo', 'Color'].map((element) => (
              <label className="servilletas-checkbox" key={element}>
                <input
                  type="checkbox"
                  checked={selectedElements.includes(element)}
                  onChange={() => toggleElement(element)}
                />
                <span>{element}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="servilletas-input-grid">
          <label>
            Tamaño
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              <option value="">Elegí una opción</option>
              {sizes.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Textura
            <select value={texture} onChange={(event) => setTexture(event.target.value)}>
              <option value="">Elegí una opción</option>
              {textures.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Tipo de papel
            <select value={paper} onChange={(event) => setPaper(event.target.value)}>
              <option value="">Elegí una opción</option>
              {papers.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Color
            <select value={color} onChange={(event) => setColor(event.target.value)}>
              <option value="">Elegí una opción</option>
              {colors.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Logo
            <select value={logo} onChange={(event) => setLogo(event.target.value)}>
              <option value="">Elegí una opción</option>
              <option value="Tengo el archivo listo">Tengo el archivo listo</option>
              <option value="Necesito ayuda para prepararlo">Necesito ayuda para prepararlo</option>
              <option value="Quiero consultar opciones">Quiero consultar opciones</option>
            </select>
          </label>
        </div>

        <NapkinEditor
          size={size}
          allowUpload={logo === 'Tengo el archivo listo'}
          onLogoChange={updateLogoConfiguration}
        />
        <button className="servilletas-submit" type="submit">
          Continuar <span aria-hidden="true">→</span>
        </button>
        <small className="servilletas-form-note">
          El contacto se completa en el siguiente paso.
        </small>
      </form>
    </section>
  )
}

export default CustomizePage
