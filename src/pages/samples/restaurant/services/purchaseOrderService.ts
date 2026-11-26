import type {
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderStatus,
} from '../types'
import { readStorage, writeStorage, storageKeys } from './storage'
import { ingredientService } from './ingredientService'

export const purchaseOrderService = {
  getAll(): PurchaseOrder[] {
    return readStorage<PurchaseOrder[]>(storageKeys.orders)
  },

  getById(id: string): PurchaseOrder | undefined {
    return this.getAll().find((order) => order.id === id)
  },

  create(data: {
    supplierId: string
    supplierName: string
    items: PurchaseOrderItem[]
    notes: string
  }): PurchaseOrder {
    if (data.items.length === 0) {
      throw new Error('La orden debe tener al menos un insumo.')
    }

    const order: PurchaseOrder = {
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    writeStorage(storageKeys.orders, [...this.getAll(), order])
    return order
  },

  updateStatus(id: string, status: PurchaseOrderStatus): PurchaseOrder {
    const orders = this.getAll()
    const index = orders.findIndex((order) => order.id === id)

    if (index === -1) {
      throw new Error('No se encontró la orden.')
    }

    const order = orders[index]

    if (order.status === 'received') {
      throw new Error('Una orden recibida no puede modificarse.')
    }

    if (status === 'received') {
      // Comprobamos todos los insumos antes de modificar el stock.
      for (const item of order.items) {
        if (!ingredientService.getById(item.ingredientId)) {
          throw new Error(`No se encontró el insumo ${item.ingredientName}.`)
        }
      }

      for (const item of order.items) {
        ingredientService.adjustStock(
          item.ingredientId,
          item.quantity,
          `Recepción de orden ${order.id}`,
          'entry',
        )
      }
    }

    const updated: PurchaseOrder = {
      ...order,
      status,
      ...(status === 'received'
        ? { receivedAt: new Date().toISOString() }
        : {}),
    }

    orders[index] = updated
    writeStorage(storageKeys.orders, orders)

    return updated
  },
}

export function getOrderTotal(order: PurchaseOrder): number {
  return order.items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  )
}