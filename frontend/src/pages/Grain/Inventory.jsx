import { useCallback, useEffect, useMemo, useState } from "react";

import "./Inventory.css";
import useBusiness from "../../hooks/useBusiness";
import {
  createInventory,
  deleteInventory,
  getInventory,
  updateInventory,
} from "../../services/inventoryService";
import InventoryModal from "./InventoryModal";
import InventoryTable from "./InventoryTable";
import {
  createFormDataFromProduct,
  getErrorMessage,
  getPricePerBag,
  initialForm,
  normalizeProduct,
} from "./inventoryUtils";

export default function GrainInventory() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentBusiness } = useBusiness();
  const businessId = currentBusiness?.id;

  const fetchProducts = useCallback(async (selectedBusinessId = businessId) => {
    if (!selectedBusinessId) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const inventory = await getInventory(selectedBusinessId);
      const businessInventory = inventory.filter(
        (product) => String(product.business) === String(selectedBusinessId),
      );

      setProducts(businessInventory.map(normalizeProduct));
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to load inventory. Please try again."));
    } finally {
      setIsLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    Promise.resolve().then(() => fetchProducts(businessId));
  }, [businessId, fetchProducts]);

  const selectedBagSize = useMemo(() => Number(formData.bagSize === "Custom" ? formData.customBagSize : formData.bagSize) || 0, [formData.bagSize, formData.customBagSize]);
  const calculatedTotalWeight = useMemo(() => (Number(formData.openingStock) || 0) * selectedBagSize, [formData.openingStock, selectedBagSize]);
  const calculatedPurchasePricePerBag = useMemo(() => getPricePerBag(formData.purchasePrice, selectedBagSize), [formData.purchasePrice, selectedBagSize]);
  const calculatedSellingPricePerBag = useMemo(() => getPricePerBag(formData.sellingPrice, selectedBagSize), [formData.sellingPrice, selectedBagSize]);
  const calculatedProfitPerBag = useMemo(() => calculatedSellingPricePerBag - calculatedPurchasePricePerBag, [calculatedPurchasePricePerBag, calculatedSellingPricePerBag]);

  function openModal() {
    setErrorMessage("");
    setEditingProductId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  }

  function openEditModal(product) {
    setErrorMessage("");
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
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!currentBusiness) {
      setErrorMessage("No business is selected. Please select a business again.");
      return;
    }

    const openingStock = Number(formData.openingStock) || 0;
    const existingProduct = products.find((product) => String(product.id) === String(editingProductId));
    const payload = {
      business: currentBusiness.id,
      product_name: formData.productName.trim(),
      product_type: formData.category,
      bag_size: Number(selectedBagSize),
      purchase_price: Number(formData.purchasePrice) || 0,
      selling_price: Number(formData.sellingPrice) || 0,
      opening_stock: editingProductId ? (existingProduct?.openingStock ?? openingStock) : openingStock,
      remaining_bags: editingProductId ? (existingProduct?.remainingBags ?? openingStock) : openingStock,
      loose_stock_kg: editingProductId ? (existingProduct?.looseStockKg ?? 0) : 0,
      description: formData.description.trim(),
      status: formData.status,
    };

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      if (editingProductId) {
        await updateInventory(editingProductId, payload);
      } else {
        await createInventory(payload);
      }
      await fetchProducts();
      closeModal();
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to save the product. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteProduct(productId) {
    setErrorMessage("");
    try {
      await deleteInventory(productId);
      await fetchProducts();
      closeModal();
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to delete the product. Please try again."));
    }
  }

  return (
    <section className="grain-inventory">
      <header className="grain-inventory__header"><div><h1>Inventory</h1><p>Manage grain products and opening stock.</p></div><button className="grain-inventory__add-button" type="button" onClick={openModal}>+ Add Product</button></header>
      {errorMessage && <p className="grain-inventory__message" role="alert">{errorMessage}</p>}
      {isLoading ? <div className="grain-inventory__card"><p className="grain-inventory__loading">Loading inventory...</p></div> : <InventoryTable products={products} onDelete={handleDeleteProduct} onEdit={openEditModal} />}
      {isModalOpen && <InventoryModal calculatedProfitPerBag={calculatedProfitPerBag} calculatedPurchasePricePerBag={calculatedPurchasePricePerBag} calculatedSellingPricePerBag={calculatedSellingPricePerBag} calculatedTotalWeight={calculatedTotalWeight} editingProductId={editingProductId} formData={formData} isSubmitting={isSubmitting} onChange={handleChange} onClose={closeModal} onSubmit={handleSubmit} />}
    </section>
  );
}
