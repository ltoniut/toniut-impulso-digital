import type { Ingredient, StockMovement } from '../types'
import { readStorage, writeStorage, storageKeys } from './storage'

function getIngredients(): Ingredient[] {
  return readStorage<Ingredient[]>(storageKeys.ingredients)
}

function saveIngredients(ingredients: Ingredient[]) {
  writeStorage(storageKeys.ingredients, ingredients)
}

function getMovements(): StockMovement[] {
  return readStorage<StockMovement[]>(storageKeys.movements)
}

function saveMovements(movements: StockMovement[]) {
  writeStorage(storageKeys.movements, movements)
}

export const ingredientService = {
  getAll(): Ingredient[] {
    return getIngredients()
  },

  getById(id: string): Ingredient | undefined {
    return getIngredients().find((ingredient) => ingredient.id === id)
  },

  getLowStock(): Ingredient[] {
    return getIngredients().filter(
      (ingredient) => ingredient.currentStock <= ingredient.minimumStock,
    )
  },

  create(data: Omit<Ingredient, 'id' | 'updatedAt'>): Ingredient {
    const ingredients = getIngredients()

    const ingredient: Ingredient = {
      ...data,
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    }

    saveIngredients([...ingredients, ingredient])
    return ingredient
  },

  update(id: string, changes: Partial<Omit<Ingredient, 'id'>>): Ingredient {
    const ingredients = getIngredients()
    const index = ingredients.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('No se encontró el insumo.')
    }

    const updated: Ingredient = {
      ...ingredients[index],
      ...changes,
      id,
      updatedAt: new Date().toISOString(),
    }

    ingredients[index] = updated
    saveIngredients(ingredients)

    return updated
  },

  delete(id: string): void {
    const ingredients = getIngredients()
    saveIngredients(ingredients.filter((item) => item.id !== id))
  },

  adjustStock(
    id: string,
    quantity: number,
    reason: string,
    type?: StockMovement['type'],
  ): Ingredient {
    if (quantity === 0) {
      throw new Error('La cantidad del movimiento no puede ser cero.')
    }

    const ingredient = this.getById(id)

    if (!ingredient) {
      throw new Error('No se encontró el insumo.')
    }

    const newStock = ingredient.currentStock + quantity

    if (newStock < 0) {
      throw new Error('El stock no puede quedar por debajo de cero.')
    }

    const updated = this.update(id, { currentStock: newStock })

    const movement: StockMovement = {
      id: crypto.randomUUID(),
      ingredientId: id,
      type: type ?? (quantity > 0 ? 'entry' : 'exit'),
      quantity,
      reason,
      createdAt: new Date().toISOString(),
    }

    saveMovements([...getMovements(), movement])

    return updated
  },

  getMovements(): StockMovement[] {
    return getMovements()
  },
}