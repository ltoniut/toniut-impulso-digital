import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type {
  DashboardSummary,
  Ingredient,
  PurchaseOrder,
  Supplier,
} from "./types";
import { dashboardService } from "./services/dashboardService";
import { ingredientService } from "./services/ingredientService";
import { supplierService } from "./services/supplierService";
import {
  getOrderTotal,
  purchaseOrderService,
} from "./services/purchaseOrderService";
import "./RestaurantApp.css";
import DemoBar from '../../../components/DemoBar'

type Section = "dashboard" | "inventory" | "suppliers" | "orders";
const navigation: { id: Section; label: string; icon: string }[] = [
  { id: "dashboard", label: "Resumen", icon: "▦" },
  { id: "inventory", label: "Inventario", icon: "▤" },
  { id: "suppliers", label: "Proveedores", icon: "♧" },
  { id: "orders", label: "Órdenes de compra", icon: "▣" },
];
const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
const date = (value: string) =>
  new Date(value).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
  });

  function getPendingOrderForIngredient(
  orders: PurchaseOrder[],
  ingredientId: string,
): PurchaseOrder | undefined {
  return orders.find(
    (order) =>
      order.status === 'pending' &&
      order.items.some((item) => item.ingredientId === ingredientId),
  )
}

function Dashboard({
  dashboard,
  orders,
  onReorder,
}: {
  dashboard: DashboardSummary
  orders: PurchaseOrder[]
  onReorder: (ingredient: Ingredient) => void
}) {
  const stats = [
    ["Insumos registrados", dashboard.ingredientCount],
    ["Stock bajo", dashboard.lowStockCount],
    ["Pedidos pendientes", dashboard.pendingOrderCount],
    ["Proveedores", dashboard.supplierCount],
  ];
  return (
    <>
      <div className="restaurant-page-heading">
        <div>
          <span className="restaurant-eyebrow">GESTIÓN DIARIA</span>
          <h1>Resumen general</h1>
          <p>Esto es lo que está pasando en tu restaurante.</p>
        </div>
        <span className="restaurant-status">
          <span /> Sistema operativo
        </span>
      </div>
      <section className="restaurant-metrics">
        {stats.map(([label, value]) => (
          <div className="restaurant-metric" key={label as string}>
            <div className="restaurant-metric-top">{label}</div>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
      <div className="restaurant-dashboard-grid">
        <section className="restaurant-panel">
          <div className="restaurant-panel-heading">
            <div>
              <h2>Inventario que requiere atención</h2>
              <p>Insumos debajo de su stock mínimo.</p>
            </div>
            <span className="restaurant-count">
              {dashboard.lowStockCount} insumos
            </span>
          </div>
          <div className="restaurant-table-wrapper">
            <table className="restaurant-table">
              <thead>
                <tr>
                  <th>Insumo</th>
                  <th>Categoría</th>
                  <th>Disponible</th>
                  <th>Stock mínimo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.lowStockIngredients.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span className="stock-badge">
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td>
                      {item.minimumStock} {item.unit}
                    </td>
                    <td>
                      {getPendingOrderForIngredient(orders, item.id) ? (
                        <span className="status-badge">Pedido en camino</span>
                      ) : (
                        <button
                          className="button button-small"
                          onClick={() => onReorder(item)}
                        >
                          Reponer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="restaurant-panel">
          <div className="restaurant-panel-heading">
            <div>
              <h2>Actividad reciente</h2>
              <p>Últimos movimientos registrados.</p>
            </div>
          </div>
          <div className="restaurant-activity-list">
            {dashboard.recentActivity.map((item) => (
              <article key={item.id}>
                <span className="activity-dot" />
                <div>
                  <strong>{item.description}</strong>
                  <p>{item.detail}</p>
                  <small>{date(item.createdAt)}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function Inventory({
  ingredients,
  orders,
  onReplenish,
}: {
  ingredients: Ingredient[];
  orders: PurchaseOrder[];
  onReplenish: (item: Ingredient) => void;
}) {
  const lowStockCount = ingredients.filter(
    (item) => item.currentStock < item.minimumStock,
  ).length;

  return (
    <>
      <PageHeading
        eyebrow="CONTROL DE EXISTENCIAS"
        title="Inventario"
        subtitle="Todos los ingredientes y su disponibilidad actual."
      />

      <section className="restaurant-panel">
        <div className="restaurant-panel-heading">
          <div>
            <h2>Ingredientes</h2>
            <p>{ingredients.length} insumos registrados</p>
          </div>
          <span className="stock-badge">
            {lowStockCount} requieren atención
          </span>
        </div>

        <div className="restaurant-table-wrapper">
          <table className="restaurant-table">
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>Categoría</th>
                <th>Stock actual</th>
                <th>Stock mínimo</th>
                <th>Stock recomendado</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {ingredients.map((item) => {
                const low = item.currentStock <= item.minimumStock;
                const pendingOrder = getPendingOrderForIngredient(
                  orders,
                  item.id,
                );

                return (
                  <tr
                    className={low ? "low-stock-row" : ""}
                    key={item.id}
                  >
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      {item.currentStock} {item.unit}
                    </td>
                    <td>
                      {item.minimumStock} {item.unit}
                    </td>
                    <td>
                      {item.recommendedStock} {item.unit}
                    </td>

                    <td>
                      {pendingOrder ? (
                        <span className="status-badge">
                          Pedido en camino
                        </span>
                      ) : low ? (
                        <span className="stock-badge">Reponer</span>
                      ) : (
                        <span className="status-badge">En stock</span>
                      )}
                    </td>

                    <td>
                      {pendingOrder ? (
                        <span className="status-badge">
                          Orden #{pendingOrder.id.slice(0, 8)}
                        </span>
                      ) : low ? (
                        <button
                          className="button button-small"
                          onClick={() => onReplenish(item)}
                        >
                          Reponer stock
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function PageHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="restaurant-page-heading">
      <div>
        <span className="restaurant-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Suppliers({
  suppliers,
  ingredients,
  orders,
  onRefresh,
}: {
  suppliers: Supplier[];
  ingredients: Ingredient[];
  orders: PurchaseOrder[];
  onRefresh: () => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const updatePrice = (
    supplier: Supplier,
    ingredientId: string,
    price: number,
  ) => {
    if (!(price >= 0)) return;
    const products = supplier.products.map((product) =>
      product.ingredientId === ingredientId
        ? { ...product, unitPrice: price, updatedAt: new Date().toISOString() }
        : product,
    );
    supplierService.update(supplier.id, { products });
    onRefresh();
  };
  const toggleProduct = (
  supplier: Supplier,
  ingredientId: string,
  enabled: boolean,
) => {
  if (enabled) {
    const enteredPrice = window.prompt('Ingresá el precio por unidad')

    if (enteredPrice === null) return

    const unitPrice = Number(enteredPrice)
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      window.alert('Ingresá un precio mayor a cero.')
      return
    }

    const product = {
      ingredientId,
      unitPrice,
      updatedAt: new Date().toISOString(),
    }

    supplierService.update(supplier.id, {
      products: [...(supplier.products ?? []), product],
    })
  } else {
    supplierService.update(supplier.id, {
      products: (supplier.products ?? []).filter(
        (item) => item.ingredientId !== ingredientId,
      ),
    })
  }

  onRefresh()
}
  const pending = orders.filter((order) => order.status === "pending");
  return (
    <>
      <PageHeading
        eyebrow="RED DE ABASTECIMIENTO"
        title="Proveedores"
        subtitle="Gestioná el catálogo, disponibilidad y precios de compra."
      />
      <div className="supplier-grid">
        {suppliers.map((supplier) => (
          <section className="restaurant-panel supplier-card" key={supplier.id}>
            <div className="supplier-card-heading">
              <div>
                <span className="supplier-avatar">
                  {supplier.name.slice(0, 1)}
                </span>
                <div>
                  <h2>{supplier.name}</h2>
                  <p>
                    {supplier.contactName} · {supplier.phone}
                  </p>
                </div>
              </div>
              <button
                className="text-button"
                onClick={() =>
                  setEditing(editing === supplier.id ? null : supplier.id)
                }
              >
                {editing === supplier.id ? "Listo" : "Editar catálogo"}
              </button>
            </div>
            <p className="supplier-email">{supplier.email}</p>
            <div className="catalog-list">
              {ingredients.map((ingredient) => {
                const product = supplier.products.find(
                  (item) => item.ingredientId === ingredient.id,
                );
                return (
                  <div className="catalog-row" key={ingredient.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(product)}
                        onChange={(event) =>
                          toggleProduct(
                            supplier,
                            ingredient.id,
                            event.target.checked,
                          )
                        }
                      />
                      <span>
                        {ingredient.name}
                        <small>{ingredient.unit}</small>
                      </span>
                    </label>
                    {product &&
                      (editing === supplier.id ? (
                        <label className="price-editor">
                          ${" "}
                          <input
                            type="number"
                            min="0"
                            value={product.unitPrice}
                            onChange={(event) =>
                              updatePrice(
                                supplier,
                                ingredient.id,
                                Number(event.target.value),
                              )
                            }
                          />
                        </label>
                      ) : (
                        <strong>{money(product.unitPrice)}</strong>
                      ))}
                  </div>
                );
              })}
            </div>
            <p className="supplier-notes">{supplier.notes}</p>
          </section>
        ))}
      </div>
      <section className="restaurant-panel pending-panel">
        <div className="restaurant-panel-heading">
          <div>
            <h2>Pedidos pendientes</h2>
            <p>Órdenes enviadas a estos proveedores.</p>
          </div>
          <span className="restaurant-count">{pending.length} pendientes</span>
        </div>
        <OrdersTable orders={pending} />
      </section>
    </>
  );
}

function OrdersTable({
  orders,
  onReceive,
}: {
  orders: PurchaseOrder[];
  onReceive?: (id: string) => void;
}) {
  return (
    <div className="restaurant-table-wrapper">
      <table className="restaurant-table">
        <thead>
          <tr>
            <th>Orden</th>
            <th>Fecha</th>
            <th>Proveedor</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <strong>#{order.id.slice(0, 8)}</strong>
              </td>
              <td>{date(order.createdAt)}</td>
              <td>{order.supplierName}</td>
              <td>
                {order.items
                  .map((item) => `${item.ingredientName} × ${item.quantity}`)
                  .join(", ")}
              </td>
              <td>{money(getOrderTotal(order))}</td>
              <td>
                <span
                  className={
                    order.status === "pending" ? "stock-badge" : "status-badge"
                  }
                >
                  {order.status === "pending"
                    ? "Pendiente"
                    : order.status === "received"
                      ? "Recibida"
                      : order.status === "draft"
                        ? "Borrador"
                        : "Cancelada"}
                </span>
              </td>
              <td>
                {order.status === "pending" && onReceive && (
                  <button
                    className="button button-small"
                    onClick={() => onReceive(order.id)}
                  >
                    Marcar recibida
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <p className="empty-state">Todavía no hay órdenes para mostrar.</p>
      )}
    </div>
  );
}

function Orders({
  orders,
  suppliers,
  ingredients,
  onCreate,
  onReceive,
  initialPreset,
}: {
  orders: PurchaseOrder[];
  suppliers: Supplier[];
  ingredients: Ingredient[];
  onCreate: (
    supplierId: string,
    ingredientId: string,
    quantity: number,
  ) => void;
  onReceive: (id: string) => void;
  initialPreset: {
    ingredientId: string;
    supplierId: string;
    quantity: number;
  } | null;
}) {
  const [supplierId, setSupplierId] = useState(initialPreset?.supplierId ?? "");
  const [ingredientId, setIngredientId] = useState(
    initialPreset?.ingredientId ?? "",
  );
  const [quantity, setQuantity] = useState(initialPreset?.quantity ?? 1);
  const supplier = suppliers.find((item) => item.id === supplierId);
  const product = supplier?.products.find(
    (item) => item.ingredientId === ingredientId,
  );
  const ingredient = ingredients.find((item) => item.id === ingredientId);
  const options = suppliers.filter((item) =>
    item.products.some((entry) => entry.ingredientId === ingredientId),
  );
  const pending = orders.filter((order) => order.status === "pending");
  const total = (product?.unitPrice ?? 0) * quantity;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (supplierId && ingredientId && quantity > 0) {
      onCreate(supplierId, ingredientId, quantity);
      setQuantity(1);
    }
  };
  return (
    <>
      <PageHeading
        eyebrow="ABASTECIMIENTO"
        title="Órdenes de compra"
        subtitle="Prepará pedidos y seguí su recepción."
      />
      <div className="orders-layout">
        <section className="restaurant-panel order-form-panel">
          <div className="restaurant-panel-heading">
            <div>
              <h2>Crear pedido</h2>
              <p>Seleccioná proveedor e ingrediente disponible.</p>
            </div>
          </div>
          <form className="order-form" onSubmit={submit}>
            <label>
              Ingrediente
              <select
                required
                value={ingredientId}
                onChange={(event) => {
                  setIngredientId(event.target.value);
                  setSupplierId("");
                }}
              >
                <option value="">Seleccionar ingrediente</option>
                {ingredients.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Proveedor
              <select
                required
                value={supplierId}
                onChange={(event) => setSupplierId(event.target.value)}
              >
                <option value="">Seleccionar proveedor</option>
                {options.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ·{" "}
                    {money(
                      item.products.find((p) => p.ingredientId === ingredientId)
                        ?.unitPrice ?? 0,
                    )}
                    /{ingredient?.unit}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cantidad ({ingredient?.unit ?? "unidades"})
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
            </label>
            <div className="order-total">
              <span>Precio unitario</span>
              <strong>{money(product?.unitPrice ?? 0)}</strong>
              <span>Total estimado</span>
              <strong>{money(total)}</strong>
            </div>
            <button className="button" type="submit" disabled={!product}>
              Crear orden de compra
            </button>
          </form>
        </section>
        <section className="restaurant-panel pending-orders">
          <div className="restaurant-panel-heading">
            <div>
              <h2>Órdenes pendientes</h2>
              <p>Marcá cada pedido cuando llegue.</p>
            </div>
            <span className="restaurant-count">{pending.length}</span>
          </div>
          <div className="pending-order-list">
            {pending.length ? (
              pending.map((order) => (
                <article className="pending-order" key={order.id}>
                  <div>
                    <strong>{order.supplierName}</strong>
                    <small>
                      {order.items
                        .map(
                          (item) =>
                            `${item.ingredientName} × ${item.quantity} ${item.unit}`,
                        )
                        .join(" · ")}
                    </small>
                    <small>
                      {date(order.createdAt)} · {money(getOrderTotal(order))}
                    </small>
                  </div>
                  <button
                    className="button button-small"
                    onClick={() => onReceive(order.id)}
                  >
                    Marcar recibida
                  </button>
                </article>
              ))
            ) : (
              <p className="empty-state">No hay pedidos pendientes.</p>
            )}
          </div>
        </section>
      </div>
      <section className="restaurant-panel all-orders">
        <div className="restaurant-panel-heading">
          <div>
            <h2>Listado de órdenes</h2>
            <p>Historial completo de pedidos de compra.</p>
          </div>
        </div>
        <OrdersTable
          orders={[...orders].sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt),
          )}
          onReceive={onReceive}
        />
      </section>
    </>
  );
}

function RestaurantApp() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [ingredients, setIngredients] = useState(() => ingredientService.getAll());
  const [suppliers, setSuppliers] = useState(() => supplierService.getAll());
  const [orders, setOrders] = useState(() => purchaseOrderService.getAll());
  const [dashboard, setDashboard] = useState(() => dashboardService.getSummary());
  const [orderPreset, setOrderPreset] = useState<{
    ingredientId: string;
    supplierId: string;
    quantity: number;
  } | null>(null);
  const refresh = () => {
    setIngredients(ingredientService.getAll());
    setSuppliers(supplierService.getAll());
    setOrders(purchaseOrderService.getAll());
    setDashboard(dashboardService.getSummary());
  };
  const activeItem = navigation.find((item) => item.id === activeSection)!;
  const openReorder = (item: Ingredient) => {
    const offers = supplierService
      .getAll()
      .flatMap((supplier) =>
        supplier.products
          .filter((product) => product.ingredientId === item.id)
          .map((product) => ({ supplier, product })),
      )
      .sort((a, b) => a.product.unitPrice - b.product.unitPrice);
    setOrderPreset({
      ingredientId: item.id,
      supplierId: offers[0]?.supplier.id ?? "",
      quantity: Math.max(1, item.recommendedStock - item.currentStock),
    });
    setActiveSection("orders");
  };
  const createOrder = (
    supplierId: string,
    ingredientId: string,
    quantity: number,
  ) => {
    const supplier = suppliers.find((item) => item.id === supplierId)!;
    const ingredient = ingredients.find((item) => item.id === ingredientId)!;
    const price = supplier.products.find(
      (item) => item.ingredientId === ingredientId,
    )!.unitPrice;
    purchaseOrderService.create({
      supplierId,
      supplierName: supplier.name,
      items: [
        {
          ingredientId,
          ingredientName: ingredient.name,
          unit: ingredient.unit,
          quantity,
          unitPrice: price,
        },
      ],
      notes: "",
    });
    refresh();
    setOrderPreset(null);
  };
  const receiveOrder = (id: string) => {
    try {
      purchaseOrderService.updateStatus(id, 'received')
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'No se pudo recibir la orden.')
    }
    refresh()
  }
  const preset = orderPreset;
  return (
    <>

    <DemoBar />
    <div className="restaurant-app">
      <aside className="restaurant-sidebar">
        <div className="restaurant-brand">
          <span className="restaurant-brand-mark">M.</span>
          <div>
            <strong>La Mesa</strong>
            <small>GESTIÓN INTERNA</small>
          </div>
        </div>
        <div className="restaurant-sidebar-label">MENÚ PRINCIPAL</div>
        <nav className="restaurant-navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="restaurant-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="restaurant-sidebar-bottom">
          <div className="restaurant-user-avatar">AM</div>
          <div>
            <strong>Administración</strong>
            <small>La Mesa · Sucursal principal</small>
          </div>
        </div>
      </aside>
      <main className="restaurant-main">
        <header className="restaurant-topbar">
          <span>
            La Mesa <span>/</span> {activeItem.label}
          </span>
          <span className="restaurant-demo-label">ENTORNO DE DEMOSTRACIÓN</span>
        </header>
        <div className="restaurant-content">
          {activeSection === "dashboard" && dashboard && (
            <Dashboard
              dashboard={dashboard}
              orders={orders}
              onReorder={openReorder}
            />
          )}
          {activeSection === "inventory" && (
            <Inventory
              ingredients={ingredients}
              orders={orders}
              onReplenish={openReorder}
            />
          )}
          {activeSection === "suppliers" && (
            <Suppliers
              suppliers={suppliers}
              ingredients={ingredients}
              orders={orders}
              onRefresh={refresh}
            />
          )}
          {activeSection === "orders" && (
            <Orders
              key={`${preset?.ingredientId ?? "new"}-${preset?.supplierId ?? ""}`}
              orders={orders}
              suppliers={suppliers}
              ingredients={ingredients}
              onCreate={createOrder}
              onReceive={receiveOrder}
              initialPreset={preset}
            />
          )}
        </div>
      </main>
    </div>
    </>
  );
}

export default RestaurantApp;
