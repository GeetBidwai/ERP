import { useCallback, useEffect, useMemo, useState } from "react";

import useBusiness from "../../hooks/useBusiness";
import { getInventory } from "../../services/inventoryService";
import { createSale, getSale, getSales } from "../../services/salesService";
import SaleDetailsModal from "./SaleDetailsModal";
import "./Sales.css";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function getErrorMessage(error, fallbackMessage) {
  const data = error.response?.data;

  if (typeof data?.detail === "string") {
    return data.detail;
  }

  if (data && typeof data === "object") {
    const messages = Object.values(data).flat().filter(Boolean);
    if (messages.length) {
      return messages.join(" ");
    }
  }

  return error.message || fallbackMessage;
}

function normalizeInventory(product) {
  const bagSize = Number(product.bag_size ?? product.bagSize) || 0;
  const remainingBags = Number(product.remaining_bags ?? product.remainingBags) || 0;
  const looseStockKg = Number(product.loose_stock_kg ?? product.looseStockKg) || 0;

  return {
    id: product.id,
    name: product.product_name ?? product.productName,
    price: Number(product.selling_price ?? product.sellingPrice) || 0,
    bagSize,
    remainingBags,
    looseStockKg,
    totalWeight: (remainingBags * bagSize) + looseStockKg,
  };
}

function matchesDateFilter(sale, dateFilter) {
  if (!dateFilter) {
    return true;
  }

  const saleDate = new Date(`${sale.sale_date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateFilter === "today") {
    return saleDate.getTime() === today.getTime();
  }

  const startDate = new Date(today);
  if (dateFilter === "week") {
    startDate.setDate(today.getDate() - today.getDay());
  }
  if (dateFilter === "month") {
    startDate.setDate(1);
  }

  return saleDate >= startDate && saleDate <= today;
}

function formatDateTime(sale) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(`${sale.sale_date}T${sale.sale_time}`));
}

export default function GrainSales() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [saleItems, setSaleItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [customerName, setCustomerName] = useState("Walk-in Customer");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { currentBusiness } = useBusiness();
  const businessId = currentBusiness?.id;

  const fetchSales = useCallback(async () => {
    if (!businessId) {
      setSales([]);
      return;
    }

    try {
      setSales(await getSales(businessId));
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to load sales. Please try again."));
      setMessageType("error");
    }
  }, [businessId]);

  const fetchProducts = useCallback(async () => {
    if (!businessId) {
      setProducts([]);
      return;
    }

    try {
      const inventory = await getInventory(businessId);
      const businessProducts = inventory
        .filter((product) => String(product.business) === String(businessId))
        .map(normalizeInventory);
      setProducts(businessProducts);
      setSelectedProductId((currentId) => currentId || String(businessProducts[0]?.id ?? ""));
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to load inventory products. Please try again."));
      setMessageType("error");
    }
  }, [businessId]);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchSales();
      fetchProducts();
    });
  }, [fetchProducts, fetchSales]);

  const grandTotal = useMemo(
    () => saleItems.reduce((total, item) => total + item.subtotal, 0),
    [saleItems],
  );

  const filteredSales = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return sales.filter((sale) => (
      (!normalizedSearch || sale.invoice_number.toLowerCase().includes(normalizedSearch) || sale.customer_name.toLowerCase().includes(normalizedSearch))
      && (!paymentFilter || sale.payment_mode === paymentFilter)
      && matchesDateFilter(sale, dateFilter)
    ));
  }, [dateFilter, paymentFilter, sales, searchTerm]);

  function showMessage(type, text) {
    setMessageType(type);
    setMessage(text);
  }

  function resetSaleForm() {
    const firstProduct = products[0];
    setPaymentMode("Cash");
    setCustomerName("Walk-in Customer");
    setSelectedProductId(String(firstProduct?.id ?? ""));
    setQuantity(1);
    setSaleItems([]);
  }

  function openSaleModal() {
    setMessage("");
    setIsModalOpen(true);
  }

  function closeSaleModal() {
    setIsModalOpen(false);
    resetSaleForm();
  }

  function handleProductChange(event) {
    const product = products.find((item) => String(item.id) === event.target.value);
    setSelectedProductId(event.target.value);
  }

  function addProduct() {
    const product = products.find(
      (item) => String(item.id) === selectedProductId
    );

    const itemQuantity = Number(quantity);

    if (!product || !Number.isFinite(itemQuantity) || itemQuantity <= 0) {
      showMessage("error", "Select a product and enter a valid quantity in kg.");
      return;
    }

    if (itemQuantity > product.totalWeight) {
      showMessage(
        "error",
        `Only ${product.totalWeight.toFixed(2)} kg of ${product.name} remain in stock.`
      );
      return;
    }

    setSaleItems((items) => [
      ...items,
      {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: itemQuantity,
        subtotal: product.price * itemQuantity,
      },
    ]);

    setQuantity("");
    setMessage("");
  }

  function removeProduct(itemId) {
    setSaleItems((items) => items.filter((item) => item.id !== itemId));
  }

  async function openSaleDetails(saleId) {
    setIsDetailsOpen(true);
    setIsDetailsLoading(true);
    setSelectedSale(null);

    try {
      setSelectedSale(await getSale(saleId));
    } catch (error) {
      setIsDetailsOpen(false);
      showMessage("error", getErrorMessage(error, "Unable to load sale details. Please try again."));
    } finally {
      setIsDetailsLoading(false);
    }
  }

  function closeSaleDetails() {
    setIsDetailsOpen(false);
    setSelectedSale(null);
  }

  async function handleGenerateInvoice() {
    if (!businessId) {
      showMessage("error", "No business is selected. Please select a business again.");
      return;
    }

    if (saleItems.length === 0) {
      showMessage("error", "Add at least one product before generating an invoice.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    try {
      const sale = await createSale({
        business: businessId,
        customer_name: customerName.trim() || "Walk-in Customer",
        payment_mode: paymentMode,
        items: saleItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      });
      await Promise.all([fetchSales(), fetchProducts()]);
      closeSaleModal();
      showMessage("success", `Invoice ${sale.invoice_number} created successfully.`);
    } catch (error) {
      showMessage("error", getErrorMessage(error, "Unable to create the sale. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="grain-sales">
      <header className="grain-sales__header">
        <div><h1>Sales</h1><p>Record and review customer sales.</p></div>
        <button className="grain-sales__new-button" type="button" onClick={openSaleModal}>+ New Sale</button>
      </header>

      {message && <p className={`grain-sales__message grain-sales__message--${messageType}`} role="alert">{message}</p>}

      <div className="grain-sales__history-filters">
        <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search invoice or customer" aria-label="Search sales" />
        <select value={paymentFilter} onChange={(event) => setPaymentFilter(event.target.value)} aria-label="Filter by payment mode"><option value="">All payment modes</option><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select>
        <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} aria-label="Filter by date"><option value="">All dates</option><option value="today">Today</option><option value="week">This Week</option><option value="month">This Month</option></select>
      </div>

      {sales.length === 0 ? (
        <section className="grain-sales__empty-card" aria-label="Sales overview">
          <span className="grain-sales__empty-icon" aria-hidden="true">₹</span>
          <h2>No sales recorded yet</h2><p>Create a new sale to add products and prepare an invoice.</p>
          <button type="button" onClick={openSaleModal}>Create first sale</button>
        </section>
      ) : (
        <section className="grain-sales__sales-list" aria-label="Recent sales">
          {filteredSales.length === 0 ? <p className="grain-sales__no-items">No sales match these filters.</p> : filteredSales.map((sale) => <button className="grain-sales__sale" type="button" key={sale.id} onClick={() => openSaleDetails(sale.id)}><div><strong>{sale.invoice_number}</strong><span>{sale.customer_name} · {formatDateTime(sale)}</span><span>{sale.payment_mode}</span></div><strong>{formatCurrency(sale.total_amount)}</strong></button>)}
        </section>
      )}

      {isModalOpen && (
        <div className="grain-sales__backdrop" role="presentation">
          <section
            className="grain-sales__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-sale-title"
          >
            <header className="grain-sales__modal-header">
              <div>
                <p className="grain-sales__eyebrow">New transaction</p>
                <h2 id="new-sale-title">Create Sale</h2>
              </div>

              <button
                className="grain-sales__close-button"
                type="button"
                onClick={closeSaleModal}
                aria-label="Close sale form"
              >
                ×
              </button>
            </header>

            <div className="grain-sales__modal-body">
              <div className="grain-sales__details-grid">
                <label>
                  Customer
                  <select
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                  >
                    <option>Walk-in Customer</option>
                  </select>
                </label>

                <label>
                  Payment Mode
                  <select
                    value={paymentMode}
                    onChange={(event) => setPaymentMode(event.target.value)}
                  >
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                  </select>
                </label>
              </div>

              <section
                className="grain-sales__product-picker"
                aria-labelledby="add-product-title"
              >
                <h3 id="add-product-title">Add products</h3>

                <div className="grain-sales__product-controls">
                  <label>
                    Product
                    <select
                      value={selectedProductId}
                      onChange={handleProductChange}
                      disabled={products.length === 0}
                    >
                      {products.length === 0 ? (
                        <option>No inventory products available</option>
                      ) : (
                        products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))
                      )}
                    </select>
                  </label>

                  <label>
                    Available Stock
                    <input
                      type="text"
                      value={
                        products
                          .find(
                            (product) =>
                              String(product.id) === String(selectedProductId),
                          )
                          ?.totalWeight.toFixed(2) ?? "0.00"
                      }
                      readOnly
                    />
                  </label>

                  <label>
                    Quantity (kg)
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      placeholder="Enter kg"
                    />
                  </label>

                  <div className="grain-sales__price-display">
                    Price:{" "}
                    {formatCurrency(
                      products.find(
                        (product) =>
                          String(product.id) === String(selectedProductId),
                      )?.price ?? 0,
                    )}
                    /kg
                  </div>

                  <button
                    type="button"
                    onClick={addProduct}
                    disabled={products.length === 0}
                  >
                    Add Product
                  </button>
                </div>
              </section>

              <section
                className="grain-sales__items"
                aria-labelledby="sale-items-title"
              >
                <div className="grain-sales__section-heading">
                  <h3 id="sale-items-title">Selected products</h3>
                  <span>
                    {saleItems.length} item{saleItems.length === 1 ? "" : "s"}
                  </span>
                </div>

                {saleItems.length === 0 ? (
                  <p className="grain-sales__no-items">
                    Add a product to start this sale.
                  </p>
                ) : (
                  <div className="grain-sales__items-list">
                    {saleItems.map((item) => (
                      <article className="grain-sales__item" key={item.id}>
                        <div className="grain-sales__item-name">
                          <strong>{item.name}</strong>

                          <span>
                            {item.quantity.toFixed(2)} kg ×{" "}
                            {formatCurrency(item.price)}/kg
                          </span>
                        </div>

                        <div className="grain-sales__item-total">
                          <strong>{formatCurrency(item.subtotal)}</strong>

                          <button
                            type="button"
                            onClick={() => removeProduct(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <footer className="grain-sales__modal-footer">
              <div className="grain-sales__grand-total">
                <span>Grand Total</span>
                <strong>{formatCurrency(grandTotal)}</strong>
              </div>

              <div className="grain-sales__form-actions">
                <button type="button" onClick={closeSaleModal}>
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleGenerateInvoice}
                  disabled={saleItems.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Generate Invoice"}
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}
      {isDetailsOpen && <SaleDetailsModal isLoading={isDetailsLoading} onClose={closeSaleDetails} sale={selectedSale} />}
    </section>
  );
}