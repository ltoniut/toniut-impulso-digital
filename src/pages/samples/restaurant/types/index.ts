export type Ingredient = {
  id: string
  name: string
  category: string
  unit: string
  currentStock: number
  minimumStock: number
  recommendedStock: number
  updatedAt: string
}

export type StockMovement = {
  id: string
  ingredientId: string
  type: 'entry' | 'exit' | 'adjustment'
  quantity: number
  reason: string
  createdAt: string
}

export type SupplierProduct = {
  ingredientId: string
  unitPrice: number
  updatedAt: string
}

export type Supplier = {
  id: string
  name: string
  contactName: string
  phone: string
  email: string
  products: SupplierProduct[]
  notes: string
}

export type PurchaseOrderItem = {
  ingredientId: string
  ingredientName: string
  unit: string
  quantity: number
  unitPrice: number
}

export type PurchaseOrderStatus =
  | 'draft'
  | 'pending'
  | 'received'
  | 'cancelled'

export type PurchaseOrder = {
  id: string
  supplierId: string
  supplierName: string
  items: PurchaseOrderItem[]
  status: PurchaseOrderStatus
  createdAt: string
  receivedAt?: string
  notes: string
}

export type DashboardActivity = {
  id: string
  description: string
  detail: string
  createdAt: string
  type: 'stock' | 'order'
}

export type DashboardSummary = {
  ingredientCount: number
  lowStockCount: number
  pendingOrderCount: number
  supplierCount: number
  lowStockIngredients: Ingredient[]
  recentActivity: DashboardActivity[]
}
