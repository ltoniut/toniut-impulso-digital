import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react'

type Props = {
  size: string
  allowUpload: boolean
  onLogoChange: (name: string, position: string, canvasJpg: string) => void
}

function napkinRatio(size: string) {
  const dimensions = size.match(/(\d+)\s*×\s*(\d+)/)
  if (!dimensions) return 0.75
  return Number(dimensions[1]) / Number(dimensions[2])
}

function NapkinEditor({ size, allowUpload, onLogoChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [imageLoaded, setImageLoaded] = useState(0)
  const [scale, setScale] = useState(30)
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const [angle, setAngle] = useState(0)
  const ratio = napkinRatio(size)
  const canvasHeight = Math.round(560 / ratio)

  useEffect(() => {
    if (!imageUrl) {
      imageRef.current = null
      return
    }

    const image = new Image()
    image.onload = () => {
      imageRef.current = image
      setImageLoaded((current) => current + 1)
    }
    image.onerror = () => {
      imageRef.current = null
    }
    image.src = imageUrl
  }, [imageUrl])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const { width, height } = canvas
    context.clearRect(0, 0, width, height)
    context.fillStyle = '#e9e5dc'
    context.fillRect(0, 0, width, height)

    const napkinWidth = width * 0.7
    const napkinHeight = napkinWidth / ratio
    const left = (width - napkinWidth) / 2
    const top = (height - napkinHeight) / 2
    context.save()
    context.shadowColor = 'rgba(44, 48, 40, 0.2)'
    context.shadowBlur = 22
    context.shadowOffsetY = 12
    context.fillStyle = '#f8f5ed'
    context.fillRect(left, top, napkinWidth, napkinHeight)
    context.shadowColor = 'transparent'
    context.strokeStyle = 'rgba(123, 119, 104, 0.32)'
    context.setLineDash([5, 5])
    context.strokeRect(left + 16, top + 16, napkinWidth - 32, napkinHeight - 32)
    context.setLineDash([])

    context.save()
    context.beginPath()
    context.rect(left + 16, top + 16, napkinWidth - 32, napkinHeight - 32)
    context.clip()
    for (let lineY = top; lineY < top + napkinHeight; lineY += 7) {
      context.strokeStyle = 'rgba(116, 112, 98, 0.045)'
      context.beginPath()
      context.moveTo(left, lineY)
      context.lineTo(left + napkinWidth, lineY)
      context.stroke()
    }

    const image = imageRef.current
    if (image) {
      const maxWidth = napkinWidth * (scale / 100)
      const factor = Math.min(maxWidth / image.width, napkinHeight * 0.32 / image.height)
      const logoWidth = image.width * factor
      const logoHeight = image.height * factor
      context.translate(left + napkinWidth * x / 100, top + napkinHeight * y / 100)
      context.rotate(angle * Math.PI / 180)
      context.globalAlpha = 0.86
      context.drawImage(image, -logoWidth / 2, -logoHeight / 2, logoWidth, logoHeight)
    }
    context.restore()
    context.restore()
  }, [angle, imageLoaded, imageUrl, ratio, scale, x, y])

  useEffect(() => () => {
    if (imageUrl.startsWith('blob:')) URL.revokeObjectURL(imageUrl)
  }, [imageUrl])

  useEffect(() => {
    if (fileName) {
      const canvasJpg = canvasRef.current?.toDataURL('image/jpeg', 0.88) ?? ''
      onLogoChange(
        fileName,
        `tamaño ${scale}%, ubicación ${Math.round(x)}% horizontal y ${Math.round(y)}% vertical, ángulo ${angle}°`,
        canvasJpg,
      )
    }
  }, [angle, fileName, imageLoaded, onLogoChange, scale, x, y])

  const uploadLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    setFileName(file.name)
    setImageUrl(URL.createObjectURL(file))
  }

  const reposition = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!imageUrl) return
    const canvas = event.currentTarget
    const bounds = canvas.getBoundingClientRect()
    const napkinWidth = canvas.width * 0.7
    const napkinHeight = napkinWidth / ratio
    const left = canvas.width * 0.15
    const top = (canvas.height - napkinHeight) / 2
    const canvasX = (event.clientX - bounds.left) / bounds.width * canvas.width
    const canvasY = (event.clientY - bounds.top) / bounds.height * canvas.height
    setX(Math.max(8, Math.min(92, (canvasX - left) / napkinWidth * 100)))
    setY(Math.max(8, Math.min(92, (canvasY - top) / napkinHeight * 100)))
  }

  return (
    <section className="napkin-editor" aria-labelledby="napkin-editor-title">
      <div className="napkin-editor-heading">
        <div><span>VISTA PREVIA INTERACTIVA</span><h3 id="napkin-editor-title">Ubicá tu logo en la servilleta.</h3></div>
        <small>Arrastralo sobre la tela para elegir su posición.</small>
      </div>
      {allowUpload ? <label className="napkin-upload">
        <span aria-hidden="true">＋</span>
        <span><strong>{fileName || 'Ya tengo un archivo de logo'}</strong><small>Opcional · PNG, JPG, SVG o WebP</small></span>
        <input type="file" accept="image/*" onChange={uploadLogo} />
      </label> : <p className="napkin-upload-prompt">La carga del logo es opcional. Marcá “Tengo el archivo listo” para agregarlo a la vista previa.</p>}
      <div className="napkin-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="napkin-editor-canvas"
          width={800}
          height={canvasHeight}
          onPointerDown={(event) => { if (imageUrl) { event.currentTarget.setPointerCapture(event.pointerId); reposition(event) } }}
          onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) reposition(event) }}
          aria-label={`Vista previa de servilleta ${size}. Arrastrá para posicionar el logo.`}
        />
        {!imageUrl && <span className="napkin-canvas-hint">Vista previa · {size || 'Formato rectangular'}</span>}
      </div>
      <div className="napkin-editor-controls">
        <label><span>Tamaño <output>{scale}%</output></span><input type="range" min="10" max="70" value={scale} onChange={(event) => setScale(Number(event.target.value))} /></label>
        <label><span>Ubicación horizontal <output>{Math.round(x)}%</output></span><input type="range" min="8" max="92" value={x} onChange={(event) => setX(Number(event.target.value))} /></label>
        <label><span>Ubicación vertical <output>{Math.round(y)}%</output></span><input type="range" min="8" max="92" value={y} onChange={(event) => setY(Number(event.target.value))} /></label>
        <label><span>Ángulo <output>{angle}°</output></span><input type="range" min="-180" max="180" value={angle} onChange={(event) => setAngle(Number(event.target.value))} /></label>
      </div>
    </section>
  )
}

export default NapkinEditor
