import { useState } from "react";

import { formatCurrency, formatNumber, getPricePerBag } from "./inventoryUtils";

export default function InventoryTable({ products, onDelete, onEdit }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  function openProductDetails(product) {
    setSelectedProduct(product);
  }

  function closeProductDetails() {
    setSelectedProduct(null);
  }

  function handleEdit(product) {
    setSelectedProduct(null);
    onEdit(product);
  }

  function handleDelete(product) {
    setSelectedProduct(null);
    onDelete(product.id);
  }

  return (
    <>
      <div className="grain-inventory__card">
        {/* ================================
            DESKTOP TABLE
            ================================ */}
        <div className="grain-inventory__table-wrap">
          <table className="grain-inventory__table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Bag Size (kg)</th>
                <th>Purchase (/kg)</th>
                <th>Selling (/kg)</th>
                <th>Purchase / Bag</th>
                <th>Selling / Bag</th>
                <th>Profit / Bag</th>
                <th>Opening Stock (Bags)</th>
                <th>Unopened Bags</th>
                <th>Loose Stock (kg)</th>
                <th>Total Stock (kg)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const purchasePricePerBag = getPricePerBag(
                  product.purchasePrice,
                  product.bagSize,
                );

                const sellingPricePerBag = getPricePerBag(
                  product.sellingPrice,
                  product.bagSize,
                );

                return (
                  <tr key={product.id}>
                    <td>
                      <strong>{product.productName}</strong>
                      {product.description && (
                        <span>{product.description}</span>
                      )}
                    </td>

                    <td>{product.category}</td>

                    <td className="grain-inventory__number">
                      {formatNumber(product.bagSize)} kg
                    </td>

                    <td className="grain-inventory__number">
                      {formatCurrency(product.purchasePrice)}
                    </td>

                    <td className="grain-inventory__number">
                      {formatCurrency(product.sellingPrice)}
                    </td>

                    <td className="grain-inventory__number">
                      {formatCurrency(purchasePricePerBag)}
                    </td>

                    <td className="grain-inventory__number">
                      {formatCurrency(sellingPricePerBag)}
                    </td>

                    <td className="grain-inventory__number">
                      {formatCurrency(
                        sellingPricePerBag - purchasePricePerBag,
                      )}
                    </td>

                    <td className="grain-inventory__number">
                      {formatNumber(product.openingStock)}
                    </td>

                    <td className="grain-inventory__number">
                      {formatNumber(product.remainingBags)}
                    </td>

                    <td className="grain-inventory__number">
                      {formatNumber(product.looseStockKg)} kg
                    </td>

                    <td className="grain-inventory__number">
                      {formatNumber(product.totalWeight)} kg
                    </td>

                    <td>
                      <span
                        className={`grain-inventory__status grain-inventory__status--${product.status.toLowerCase()}`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td>
                      <div className="grain-inventory__actions">
                        <button
                          type="button"
                          onClick={() => onEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================================
            MOBILE PRODUCT CARDS
            ================================ */}
        <div className="grain-inventory__mobile-grid">
          {products.map((product) => {
            const purchasePricePerBag = getPricePerBag(
              product.purchasePrice,
              product.bagSize,
            );

            const sellingPricePerBag = getPricePerBag(
              product.sellingPrice,
              product.bagSize,
            );

            return (
              <article
                className="grain-inventory__mobile-card"
                key={product.id}
                onClick={() => openProductDetails(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProductDetails(product);
                  }
                }}
              >
                <div className="grain-inventory__mobile-card-header">
                  <div>
                    <h2>{product.productName}</h2>

                    <p>
                      {product.category} ·{" "}
                      {formatNumber(product.bagSize)} kg
                    </p>
                  </div>

                  <span
                    className={`grain-inventory__status grain-inventory__status--${product.status.toLowerCase()}`}
                  >
                    {product.status}
                  </span>
                </div>

                <div className="grain-inventory__mobile-details">
                  <div>
                    <span>Purchase / kg</span>
                    <strong>
                      {formatCurrency(product.purchasePrice)}
                    </strong>
                  </div>

                  <div>
                    <span>Selling / kg</span>
                    <strong>
                      {formatCurrency(product.sellingPrice)}
                    </strong>
                  </div>

                  <div>
                    <span>Purchase / Bag</span>
                    <strong>
                      {formatCurrency(purchasePricePerBag)}
                    </strong>
                  </div>

                  <div>
                    <span>Selling / Bag</span>
                    <strong>
                      {formatCurrency(sellingPricePerBag)}
                    </strong>
                  </div>
                </div>

                <div className="grain-inventory__mobile-card-hint">
                  View product details →
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ================================
          PRODUCT DETAILS MODAL
          ================================ */}
      {selectedProduct && (
        <div
          className="grain-inventory__details-backdrop"
          onMouseDown={closeProductDetails}
        >
          <section
            className="grain-inventory__details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inventory-product-details-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="grain-inventory__details-header">
              <div>
                <p>Product details</p>

                <h2 id="inventory-product-details-title">
                  {selectedProduct.productName}
                </h2>

                <span>
                  {selectedProduct.category} ·{" "}
                  {formatNumber(selectedProduct.bagSize)} kg
                </span>
              </div>

              <button
                type="button"
                className="grain-inventory__details-close"
                onClick={closeProductDetails}
                aria-label="Close product details"
              >
                ×
              </button>
            </header>

            <div className="grain-inventory__details-body">
              <div className="grain-inventory__details-status-row">
                <span
                  className={`grain-inventory__status grain-inventory__status--${selectedProduct.status.toLowerCase()}`}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <div className="grain-inventory__details-price-grid">
                <div>
                  <span>Purchase / kg</span>
                  <strong>
                    {formatCurrency(selectedProduct.purchasePrice)}
                  </strong>
                </div>

                <div>
                  <span>Selling / kg</span>
                  <strong>
                    {formatCurrency(selectedProduct.sellingPrice)}
                  </strong>
                </div>

                <div>
                  <span>Purchase / Bag</span>
                  <strong>
                    {formatCurrency(
                      getPricePerBag(
                        selectedProduct.purchasePrice,
                        selectedProduct.bagSize,
                      ),
                    )}
                  </strong>
                </div>

                <div>
                  <span>Selling / Bag</span>
                  <strong>
                    {formatCurrency(
                      getPricePerBag(
                        selectedProduct.sellingPrice,
                        selectedProduct.bagSize,
                      ),
                    )}
                  </strong>
                </div>
              </div>

              <div className="grain-inventory__details-section">
                <h3>Stock information</h3>

                <div className="grain-inventory__details-list">
                  <div>
                    <span>Opening Stock</span>
                    <strong>
                      {formatNumber(selectedProduct.openingStock)} bags
                    </strong>
                  </div>

                  <div>
                    <span>Unopened Bags</span>
                    <strong>
                      {formatNumber(selectedProduct.remainingBags)} bags
                    </strong>
                  </div>

                  <div>
                    <span>Loose Stock</span>
                    <strong>
                      {formatNumber(selectedProduct.looseStockKg)} kg
                    </strong>
                  </div>

                  <div>
                    <span>Total Stock</span>
                    <strong>
                      {formatNumber(selectedProduct.totalWeight)} kg
                    </strong>
                  </div>

                  <div>
                    <span>Profit / Bag</span>
                    <strong>
                      {formatCurrency(
                        getPricePerBag(
                          selectedProduct.sellingPrice,
                          selectedProduct.bagSize,
                        ) -
                          getPricePerBag(
                            selectedProduct.purchasePrice,
                            selectedProduct.bagSize,
                          ),
                      )}
                    </strong>
                  </div>
                </div>
              </div>

              {selectedProduct.description && (
                <div className="grain-inventory__details-section">
                  <h3>Description</h3>

                  <p className="grain-inventory__details-description">
                    {selectedProduct.description}
                  </p>
                </div>
              )}
            </div>

            <footer className="grain-inventory__details-footer">
              <button
                type="button"
                className="grain-inventory__details-delete"
                onClick={() => handleDelete(selectedProduct)}
              >
                Delete Product
              </button>

              <button
                type="button"
                className="grain-inventory__details-edit"
                onClick={() => handleEdit(selectedProduct)}
              >
                Edit Product
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}