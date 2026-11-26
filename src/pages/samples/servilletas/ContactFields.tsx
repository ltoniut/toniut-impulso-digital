type Props = {
  quantity: string
  businessName: string
  contact: string
  onQuantityChange: (value: string) => void
  onBusinessNameChange: (value: string) => void
  onContactChange: (value: string) => void
}

function ContactFields({ quantity, businessName, contact, onQuantityChange, onBusinessNameChange, onContactChange }: Props) {
  return (
    <>
      <div className="servilletas-input-grid servilletas-input-grid--contact">
        <label>Cantidad aproximada<input type="text" value={quantity} onChange={(event) => onQuantityChange(event.target.value)} placeholder="Ej.: 500 unidades" /></label>
        <label>Nombre del restaurante<input type="text" value={businessName} onChange={(event) => onBusinessNameChange(event.target.value)} placeholder="Tu restaurante" /></label>
      </div>
      <label className="servilletas-contact-input">Tu email<input type="email" value={contact} onChange={(event) => onContactChange(event.target.value)} placeholder="nombre@restaurante.com" required /></label>
    </>
  )
}

export default ContactFields
