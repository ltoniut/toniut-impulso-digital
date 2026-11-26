import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import ContactFields from './ContactFields'
import { clearPersonalizationDraft, readPersonalizationDraft } from './draft'

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function ContactPage() {
  const draft = readPersonalizationDraft()
  const [quantity, setQuantity] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [contact, setContact] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [feedback, setFeedback] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSending) return

    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      setFeedback('El formulario todavía no está conectado al servicio de correo. Por favor, probá más tarde.')
      return
    }

    const message = [
      'Consulta por servilletas para restaurante',
      draft && `Modalidad: ${draft.mode === 'complete' ? 'Diseño completo' : 'Personalización parcial'}.`,
      draft && `Elementos: ${draft.selectedElements.join(', ') || 'A conversar'}.`,
      draft?.size && `Tamaño: ${draft.size}.`,
      draft?.texture && `Textura: ${draft.texture}.`,
      draft?.paper && `Tipo de papel: ${draft.paper}.`,
      draft?.color && `Color: ${draft.color}.`,
      draft?.logo && `Logo: ${draft.logo}.`,
      draft?.logoName && `Archivo de logo: ${draft.logoName}.`,
      draft?.logoPlacement && `Vista previa: ${draft.logoPlacement}.`,
      quantity && `Cantidad aproximada: ${quantity}.`,
      businessName && `Restaurante: ${businessName}.`,
      `Email de contacto: ${contact}.`,
    ]
      .filter(Boolean)
      .join('\n')

    setIsSending(true)
    setFeedback('Enviando consulta…')

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: emailServiceId,
          template_id: emailTemplateId,
          user_id: emailPublicKey,
          template_params: {
            to_email: 'ltoniut@gmail.com',
            reply_to: contact,
            from_name: businessName || 'Consulta de servilletas',
            subject: `Consulta de servilletas${businessName ? ` · ${businessName}` : ''}`,
            message,
            has_canvas: Boolean(draft?.canvasJpg),
            ...(draft?.canvasJpg ? { napkin_canvas: draft.canvasJpg } : {}),
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Email service rejected the request')
      }

      clearPersonalizationDraft()
      setFeedback('¡Listo! Recibimos tu consulta y nos pondremos en contacto pronto.')
    } catch {
      setFeedback('No pudimos enviar la consulta. Revisá tu conexión e intentá de nuevo.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="servilletas-personalize">
      <div className="servilletas-form-intro">
        <span className="servilletas-eyebrow">PASO 2 · CONTACTO</span>
        <h1>Ya tenemos una idea. Hablemos de tu pedido.</h1>
        <p>Dejanos estos datos y te responderemos por email.</p>

        {draft && (
          <div className="personalization-summary">
            <strong>Tu selección</strong>
            <p>
              {[draft.size, draft.paper, draft.texture, draft.color]
                .filter(Boolean)
                .join(' · ') || 'Detalles a conversar'}
            </p>
            {draft.logoName && <small>Logo cargado: {draft.logoName}</small>}
          </div>
        )}
      </div>

      <form className="servilletas-form" onSubmit={handleSubmit}>
        <div className="servilletas-form-heading">
          <span>DATOS DEL PEDIDO</span>
          <strong>¿A quién contactamos?</strong>
        </div>

        <ContactFields
          quantity={quantity}
          businessName={businessName}
          contact={contact}
          onQuantityChange={setQuantity}
          onBusinessNameChange={setBusinessName}
          onContactChange={setContact}
        />

        <button className="servilletas-submit" type="submit" disabled={isSending}>
          {isSending ? 'Enviando…' : 'Enviar consulta por email'} <span aria-hidden="true">↗</span>
        </button>
        <small className="servilletas-form-note">
          La consulta llegará a ltoniut@gmail.com.
        </small>

        {feedback && <p className="servilletas-submit-feedback" role="status">{feedback}</p>}

        <Link className="back-to-customize" to="/servilletas/personalizar">
          ← Volver al diseño
        </Link>
      </form>
    </section>
  )
}

export default ContactPage
