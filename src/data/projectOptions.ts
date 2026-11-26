export const projectOptions = [
  'Página web para mi emprendimiento',
  'Sitio web profesional o comercial',
  'Aplicación o sistema a medida',
  'Mantenimiento o actualización',
  'Otra consulta',
] as const

export type ProjectOption = (typeof projectOptions)[number]