import type { Supplier } from '../types'
import { readStorage, writeStorage, storageKeys } from './storage'

export const supplierService = {
  getAll(): Supplier[] {
    const suppliers = readStorage<Supplier[]>(storageKeys.suppliers)

    return suppliers.map((supplier) => ({
      ...supplier,
      products: Array.isArray(supplier.products)
        ? supplier.products
        : [],
    }))
  },

  getById(id: string): Supplier | undefined {
    return this.getAll().find((supplier) => supplier.id === id)
  },

  create(data: Omit<Supplier, 'id'>): Supplier {
    const suppliers = this.getAll()

    const supplier: Supplier = {
      ...data,
      id: crypto.randomUUID(),
    }

    writeStorage(storageKeys.suppliers, [...suppliers, supplier])
    return supplier
  },

  update(id: string, changes: Partial<Omit<Supplier, 'id'>>): Supplier {
    const suppliers = this.getAll()
    const index = suppliers.findIndex((supplier) => supplier.id === id)

    if (index === -1) {
      throw new Error('No se encontró el proveedor.')
    }

    const updated = { ...suppliers[index], ...changes, id }
    suppliers[index] = updated

    writeStorage(storageKeys.suppliers, suppliers)
    return updated
  },

  delete(id: string): void {
    const suppliers = this.getAll()
    writeStorage(
      storageKeys.suppliers,
      suppliers.filter((supplier) => supplier.id !== id),
    )
  },
}