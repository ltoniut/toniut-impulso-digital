import {
  initialIngredients,
  initialPurchaseOrders,
  initialStockMovements,
  initialSuppliers,
} from '../data/initialData'

const STORAGE_KEYS = {
  ingredients: 'la-mesa-ingredients',
  suppliers: 'la-mesa-suppliers',
  movements: 'la-mesa-stock-movements',
  orders: 'la-mesa-purchase-orders',
} as const

let initialized = false

function initializeStorage() {
  if (initialized) return
  const initialValues = [
    [STORAGE_KEYS.ingredients, initialIngredients],
    [STORAGE_KEYS.suppliers, initialSuppliers],
    [STORAGE_KEYS.movements, initialStockMovements],
    [STORAGE_KEYS.orders, initialPurchaseOrders],
  ] as const

  initialValues.forEach(([key, value]) => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  })
  initialized = true
}

export function readStorage<T>(key: string): T {
  initializeStorage()

  const value = localStorage.getItem(key)

  if (value === null) {
    throw new Error(`No se encontró información para ${key}`)
  }

  return JSON.parse(value) as T
}

export function writeStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export const storageKeys = STORAGE_KEYS