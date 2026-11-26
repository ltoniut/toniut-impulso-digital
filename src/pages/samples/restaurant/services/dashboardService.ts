import type { DashboardActivity, DashboardSummary, PurchaseOrder } from '../types'
import { ingredientService } from './ingredientService'
import { supplierService } from './supplierService'
import { purchaseOrderService } from './purchaseOrderService'

const statusLabels: Record<PurchaseOrder['status'], string> = {
  draft: 'Borrador',
  pending: 'Pendiente',
  received: 'Recibida',
  cancelled: 'Cancelada',
}

export const dashboardService = {
  getSummary(): DashboardSummary {
    const ingredients = ingredientService.getAll()
    const lowStockIngredients = ingredientService.getLowStock()
    const suppliers = supplierService.getAll()
    const orders = purchaseOrderService.getAll()
    const movements = ingredientService.getMovements()

    const ingredientNames = new Map(
      ingredients.map((ingredient) => [ingredient.id, ingredient.name]),
    )

    const stockActivities: DashboardActivity[] = movements.map((movement) => {
      const name = ingredientNames.get(movement.ingredientId) ?? 'Insumo'

      return {
        id: movement.id,
        description:
          movement.quantity > 0
            ? `Ingreso de ${name}`
            : `Salida de ${name}`,
        detail: `${Math.abs(movement.quantity)} unidades · ${movement.reason}`,
        createdAt: movement.createdAt,
        type: 'stock',
      }
    })

    const orderActivities: DashboardActivity[] = orders.map((order) => ({
      id: order.id,
      description: `Orden ${order.id.slice(0, 8)}`,
      detail: `${order.supplierName} · ${statusLabels[order.status]}`,
      createdAt: order.receivedAt ?? order.createdAt,
      type: 'order',
    }))

    const recentActivity = [...stockActivities, ...orderActivities]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      )
      .slice(0, 5)

    return {
      ingredientCount: ingredients.length,
      lowStockCount: lowStockIngredients.length,
      pendingOrderCount: orders.filter(
        (order) => order.status === 'pending',
      ).length,
      supplierCount: suppliers.length,
      lowStockIngredients,
      recentActivity,
    }
  },
}