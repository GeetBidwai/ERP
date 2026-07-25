import { useMemo, useState } from "react";

import "./Sales.css";

const mockProducts = [
  { id: "gehu-30", name: "Gehu Premium - 30 kg", price: 1140 },
  { id: "bajra-25", name: "Bajra Select - 25 kg", price: 750 },
  { id: "jowar-30", name: "Jowar Classic - 30 kg", price: 1020 },
  { id: "rice-25", name: "Rice Standard - 25 kg", price: 1350 },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function GrainSales() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [selectedProductId, setSelectedProductId] = useState(mockProducts[0].id);
  const [sellingPrice, setSellingPrice] = useState(mockProducts[0].price);
  const [quantity, setQuantity] = useState(1);
  const [saleItems, setSaleItems] = useState([]);

  const grandTotal = useMemo(
    () => saleItems.reduce((total, item) => total + item.subtotal, 0),
    [saleItems],
  );

  function openSaleModal() {
    setIsModalOpen(true);
  }

  function closeSaleModal() {
    setIsModalOpen(false);
    setPaymentMode("Cash");
    setSelectedProductId(mockProducts[0].id);
    setSellingPrice(mockProducts[0].price);
    setQuantity(1);
    setSaleItems([]);
  }

  function handleProductChange(event) {
    const productId = event.target.value;
    const product = mockProducts.find((item) => item.id === productId);

    setSelectedProductId(productId);
    setSellingPrice(product?.price ?? "");
  }

  function addProduct() {
    const product = mockProducts.find((item) => item.id === selectedProductId);
    const itemQuantity = Number(quantity);
    const itemPrice = Number(sellingPrice);

    if (!product || itemQuantity < 1 || itemPrice < 0) {
      return;
    }

    setSaleItems((items) => [
      ...items,
      {
        id: `${product.id}-${Date.now()}`,
        name: product.name,
        price: itemPrice,
        quantity: itemQuantity,
        subtotal: itemPrice * itemQuantity,
      },
    ]);
    setQuantity(1);
  }

  function removeProduct(itemId) {
    setSaleItems((items) => items.filter((item) => item.id !== itemId));
  }

  return (
    <section className="grain-sales">
      <header className="grain-sales__header">
        <div>
          <h1>Sales</h1>
          <p>Record and review customer sales.</p>
        </div>
        <button className="grain-sales__new-button" type="button" onClick={openSaleModal}>
          + New Sale
        </button>
      </header>

      <section className="grain-sales__empty-card" aria-label="Sales overview">
        <span className="grain-sales__empty-icon" aria-hidden="true">₹</span>
        <h2>No sales recorded yet</h2>
        <p>Create a new sale to add products and prepare an invoice.</p>
        <button type="button" onClick={openSaleModal}>Create first sale</button>
      </section>

      {isModalOpen && (
        <div className="grain-sales__backdrop" role="presentation">
          <section className="grain-sales__modal" role="dialog" aria-modal="true" aria-labelledby="new-sale-title">
            <header className="grain-sales__modal-header">
              <div>
                <p className="grain-sales__eyebrow">New transaction</p>
                <h2 id="new-sale-title">Create Sale</h2>
              </div>
              <button className="grain-sales__close-button" type="button" onClick={closeSaleModal} aria-label="Close sale form">
                ×
              </button>
            </header>

            <div className="grain-sales__modal-body">
              <div className="grain-sales__details-grid">
                <label>
                  Customer
                  <select defaultValue="Walk-in Customer">
                    <option>Walk-in Customer</option>
                  </select>
                </label>
                <label>
                  Payment Mode
                  <select value={paymentMode} onChange={(event) => setPaymentMode(event.target.value)}>
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                  </select>
                </label>
              </div>

              <section className="grain-sales__product-picker" aria-labelledby="add-product-title">
                <h3 id="add-product-title">Add products</h3>
                <div className="grain-sales__product-controls">
                  <label>
                    Product
                    <select value={selectedProductId} onChange={handleProductChange}>
                      {mockProducts.map((product) => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Selling Price
                    <input type="number" min="0" step="0.01" value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} />
                  </label>
                  <label>
                    Quantity
                    <input type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                  </label>
                  <button type="button" onClick={addProduct}>Add Product</button>
                </div>
              </section>

              <section className="grain-sales__items" aria-labelledby="sale-items-title">
                <div className="grain-sales__section-heading">
                  <h3 id="sale-items-title">Selected products</h3>
                  <span>{saleItems.length} item{saleItems.length === 1 ? "" : "s"}</span>
                </div>

                {saleItems.length === 0 ? (
                  <p className="grain-sales__no-items">Add a product to start this sale.</p>
                ) : (
                  <div className="grain-sales__items-list">
                    {saleItems.map((item) => (
                      <article className="grain-sales__item" key={item.id}>
                        <div className="grain-sales__item-name"><strong>{item.name}</strong><span>{item.quantity} × {formatCurrency(item.price)}</span></div>
                        <div className="grain-sales__item-total"><strong>{formatCurrency(item.subtotal)}</strong><button type="button" onClick={() => removeProduct(item.id)}>Remove</button></div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <footer className="grain-sales__modal-footer">
              <div className="grain-sales__grand-total"><span>Grand Total</span><strong>{formatCurrency(grandTotal)}</strong></div>
              <div className="grain-sales__form-actions"><button type="button" onClick={closeSaleModal}>Cancel</button><button type="button" onClick={closeSaleModal} disabled={saleItems.length === 0}>Generate Invoice</button></div>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}
