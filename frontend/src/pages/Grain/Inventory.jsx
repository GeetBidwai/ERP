import { useMemo, useState } from "react";

import "./Inventory.css";

const productTypes = ["Gehu", "Bajra", "Jowar", "Rice", "Raire"];
const bagSizeOptions = ["5", "10", "20", "25", "30", "40", "50", "Custom"];
const statusOptions = ["Active", "Inactive"];

const initialProduct = {
  id: 1,
  productName: "Wheat",
  category: "Gehu",
  bagSize: 30,
  purchasePrice: 30,
  sellingPrice: 37,
  openingStock: 150,
  remainingBags: 150,
  totalWeight: 4500,
  description: "Demo grain product",
  status: "Active",
};

const initialForm = {
  productName: "",
  category: "Gehu",
  bagSize: "30",
  customBagSize: "",
  purchasePrice: "",
  sellingPrice: "",
  openingStock: "",
  description: "",
  status: "Active",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getBagSizeFormValue(bagSize) {
  const nextBagSize = String(bagSize);

  return bagSizeOptions.includes(nextBagSize) ? nextBagSize : "Custom";
}

function createFormDataFromProduct(product) {
  const bagSize = getBagSizeFormValue(product.bagSize);

  return {
    productName: product.productName,
    category: product.category,
    bagSize,
    customBagSize: bagSize === "Custom" ? String(product.bagSize) : "",
    purchasePrice: String(product.purchasePrice),
    sellingPrice: String(product.sellingPrice),
    openingStock: String(product.openingStock),
    description: product.description,
    status: product.status,
  };
}

function getPricePerBag(pricePerKg, bagSize) {
  return (Number(pricePerKg) || 0) * (Number(bagSize) || 0);
}

export default function GrainInventory() {
  const [products, setProducts] = useState([initialProduct]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const selectedBagSize = useMemo(() => {
    const size =
      formData.bagSize === "Custom" ? formData.customBagSize : formData.bagSize;

    return Number(size) || 0;
  }, [formData.bagSize, formData.customBagSize]);

  const calculatedTotalWeight = useMemo(() => {
    return (Number(formData.openingStock) || 0) * selectedBagSize;
  }, [formData.openingStock, selectedBagSize]);

  const calculatedPurchasePricePerBag = useMemo(() => {
    return getPricePerBag(formData.purchasePrice, selectedBagSize);
  }, [formData.purchasePrice, selectedBagSize]);

  const calculatedSellingPricePerBag = useMemo(() => {
    return getPricePerBag(formData.sellingPrice, selectedBagSize);
  }, [formData.sellingPrice, selectedBagSize]);

  const calculatedProfitPerBag = useMemo(() => {
    return calculatedSellingPricePerBag - calculatedPurchasePricePerBag;
  }, [calculatedPurchasePricePerBag, calculatedSellingPricePerBag]);

  function openModal() {
    setEditingProductId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProductId(product.id);
    setFormData(createFormDataFromProduct(product));
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingProductId(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const openingStock = Number(formData.openingStock) || 0;
    const bagSize = selectedBagSize;

    const nextProductData = {
      productName: formData.productName.trim(),
      category: formData.category,
      bagSize,
      purchasePrice: Number(formData.purchasePrice) || 0,
      sellingPrice: Number(formData.sellingPrice) || 0,
      openingStock,
      remainingBags: openingStock,
      totalWeight: openingStock * bagSize,
      description: formData.description.trim(),
      status: formData.status,
    };

    setProducts((currentProducts) => {
      if (editingProductId) {
        return currentProducts.map((product) =>
          product.id === editingProductId
            ? { ...product, ...nextProductData }
            : product,
        );
      }

      return [{ id: Date.now(), ...nextProductData }, ...currentProducts];
    });

    closeModal();
  }

  function handleDeleteProduct(productId) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  }

  return (
    <section className="grain-inventory">
      <header className="grain-inventory__header">
        <div>
          <h1>Inventory</h1>
          <p>Manage grain products and opening stock.</p>
        </div>

        <button
          className="grain-inventory__add-button"
          type="button"
          onClick={openModal}
        >
          + Add Product
        </button>
      </header>

      <div className="grain-inventory__card">
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
                <th>Remaining Bags</th>
                <th>Total Weight (kg)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.productName}</strong>
                    {product.description && <span>{product.description}</span>}
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
                    {formatCurrency(
                      getPricePerBag(product.purchasePrice, product.bagSize),
                    )}
                  </td>
                  <td className="grain-inventory__number">
                    {formatCurrency(
                      getPricePerBag(product.sellingPrice, product.bagSize),
                    )}
                  </td>
                  <td className="grain-inventory__number">
                    {formatCurrency(
                      getPricePerBag(product.sellingPrice, product.bagSize) -
                        getPricePerBag(product.purchasePrice, product.bagSize),
                    )}
                  </td>
                  <td className="grain-inventory__number">
                    {formatNumber(product.openingStock)}
                  </td>
                  <td className="grain-inventory__number">
                    {formatNumber(product.remainingBags)}
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
                      <button type="button" onClick={() => openEditModal(product)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="grain-inventory__modal-backdrop" role="presentation">
          <div
            className="grain-inventory__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <div className="grain-inventory__modal-header">
              <div>
                <h2 id="product-modal-title">
                  {editingProductId ? "Edit Product" : "Add Product"}
                </h2>
                <p>Enter product details and opening stock.</p>
              </div>

              <button
                className="grain-inventory__close-button"
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
              >
                x
              </button>
            </div>

            <form className="grain-inventory__form" onSubmit={handleSubmit}>
              <label>
                Product Name
                <input
                  name="productName"
                  type="text"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Product Type
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {productTypes.map((productType) => (
                    <option key={productType} value={productType}>
                      {productType}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Bag Size
                <select
                  name="bagSize"
                  value={formData.bagSize}
                  onChange={handleChange}
                >
                  {bagSizeOptions.map((bagSize) => (
                    <option key={bagSize} value={bagSize}>
                      {bagSize === "Custom" ? "Custom" : `${bagSize} kg`}
                    </option>
                  ))}
                </select>
              </label>

              {formData.bagSize === "Custom" && (
                <label>
                  Custom Bag Size (kg)
                  <input
                    name="customBagSize"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.customBagSize}
                    onChange={handleChange}
                    required
                  />
                </label>
              )}

              <label>
                Purchase Price (/kg)
                <input
                  name="purchasePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Selling Price (/kg)
                <input
                  name="sellingPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Opening Stock (Bags)
                <input
                  name="openingStock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.openingStock}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grain-inventory__form-wide">
                Description (optional)
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>

              <div className="grain-inventory__total grain-inventory__form-wide">
                <span>Total Weight</span>
                <strong>{formatNumber(calculatedTotalWeight)} kg</strong>
              </div>

              <label>
                Purchase Price / Bag
                <input
                  type="text"
                  value={formatCurrency(calculatedPurchasePricePerBag)}
                  readOnly
                  disabled
                />
              </label>

              <label>
                Selling Price / Bag
                <input
                  type="text"
                  value={formatCurrency(calculatedSellingPricePerBag)}
                  readOnly
                  disabled
                />
              </label>

              <label className="grain-inventory__form-wide">
                Profit / Bag
                <input
                  type="text"
                  value={formatCurrency(calculatedProfitPerBag)}
                  readOnly
                  disabled
                />
              </label>

              <div className="grain-inventory__form-actions grain-inventory__form-wide">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit">
                  {editingProductId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
