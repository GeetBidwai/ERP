import {
  bagSizeOptions,
  formatCurrency,
  formatNumber,
  productTypes,
  statusOptions,
} from "./inventoryUtils";

export default function InventoryModal({
  calculatedProfitPerBag,
  calculatedPurchasePricePerBag,
  calculatedSellingPricePerBag,
  calculatedTotalWeight,
  editingProductId,
  formData,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="grain-inventory__modal-backdrop" role="presentation">
      <div className="grain-inventory__modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <div className="grain-inventory__modal-header">
          <div>
            <h2 id="product-modal-title">{editingProductId ? "Edit Product" : "Add Product"}</h2>
            <p>Enter product details and opening stock.</p>
          </div>
          <button className="grain-inventory__close-button" type="button" onClick={onClose} aria-label="Close modal">x</button>
        </div>

        <form className="grain-inventory__form" onSubmit={onSubmit}>
          <label>Product Name<input name="productName" type="text" value={formData.productName} onChange={onChange} required /></label>
          <label>
            Product Type
            <select name="category" value={formData.category} onChange={onChange}>
              {productTypes.map((productType) => <option key={productType} value={productType}>{productType}</option>)}
            </select>
          </label>
          <label>
            Bag Size
            <select name="bagSize" value={formData.bagSize} onChange={onChange}>
              {bagSizeOptions.map((bagSize) => <option key={bagSize} value={bagSize}>{bagSize === "Custom" ? "Custom" : `${bagSize} kg`}</option>)}
            </select>
          </label>
          {formData.bagSize === "Custom" && <label>Custom Bag Size (kg)<input name="customBagSize" type="number" min="0" step="0.01" value={formData.customBagSize} onChange={onChange} required /></label>}
          <label>Purchase Price (/kg)<input name="purchasePrice" type="number" min="0" step="0.01" value={formData.purchasePrice} onChange={onChange} required /></label>
          <label>Selling Price (/kg)<input name="sellingPrice" type="number" min="0" step="0.01" value={formData.sellingPrice} onChange={onChange} required /></label>
          <label>Opening Stock (Bags)<input name="openingStock" type="number" min="0" step="1" value={formData.openingStock} onChange={onChange} required /></label>
          <label>
            Status
            <select name="status" value={formData.status} onChange={onChange}>
              {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <label className="grain-inventory__form-wide">Description (optional)<textarea name="description" rows="3" value={formData.description} onChange={onChange} /></label>
          <div className="grain-inventory__total grain-inventory__form-wide"><span>Total Weight</span><strong>{formatNumber(calculatedTotalWeight)} kg</strong></div>
          <label>Purchase Price / Bag<input type="text" value={formatCurrency(calculatedPurchasePricePerBag)} readOnly disabled /></label>
          <label>Selling Price / Bag<input type="text" value={formatCurrency(calculatedSellingPricePerBag)} readOnly disabled /></label>
          <label className="grain-inventory__form-wide">Profit / Bag<input type="text" value={formatCurrency(calculatedProfitPerBag)} readOnly disabled /></label>
          <div className="grain-inventory__form-actions grain-inventory__form-wide">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : editingProductId ? "Update Product" : "Save Product"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
