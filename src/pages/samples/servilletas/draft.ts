export type PersonalizationDraft = {
  mode: 'complete' | 'partial'
  selectedElements: string[]
  size: string
  texture: string
  paper: string
  color: string
  logo: string
  logoName: string
  logoPlacement: string
  canvasJpg: string
}

const storageKey = 'servilletas-personalization'

export function savePersonalizationDraft(draft: PersonalizationDraft) {
  sessionStorage.setItem(storageKey, JSON.stringify(draft))
}

export function readPersonalizationDraft(): PersonalizationDraft | null {
  const savedDraft = sessionStorage.getItem(storageKey)
  if (!savedDraft) return null

  try {
    return JSON.parse(savedDraft) as PersonalizationDraft
  } catch {
    sessionStorage.removeItem(storageKey)
    return null
  }
}

export function clearPersonalizationDraft() {
  sessionStorage.removeItem(storageKey)
}
