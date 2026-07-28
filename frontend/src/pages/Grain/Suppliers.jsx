import { useCallback, useEffect, useMemo, useState } from "react";

import useBusiness from "../../hooks/useBusiness";
import { createSupplier, deleteSupplier, getSuppliers, updateSupplier } from "../../services/supplierService";
import "./Inventory.css";
import "./Suppliers.css";
import SupplierModal from "./SupplierModal";
import SupplierTable from "./SupplierTable";

const initialForm = { supplier_name: "", contact_person: "", phone: "", email: "", address: "", city: "", state: "", gst_number: "", opening_balance: "0", payment_terms: "", status: "Active", notes: "" };

function getErrorMessage(error, fallbackMessage) {
  const data = error.response?.data;
  if (typeof data?.detail === "string") return data.detail;
  if (data && typeof data === "object") {
    const messages = Object.entries(data).flatMap(([field, errors]) => (Array.isArray(errors) ? errors : [errors]).map((message) => `${field.replaceAll("_", " ")}: ${message}`));
    if (messages.length) return messages.join(" ");
  }
  return error.message || fallbackMessage;
}

export default function GrainSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierId, setSupplierId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentBusiness } = useBusiness();
  const businessId = currentBusiness?.id;

  const fetchSuppliers = useCallback(async () => {
    if (!businessId) { setSuppliers([]); setIsLoading(false); return; }
    setIsLoading(true); setErrorMessage("");
    try { setSuppliers(await getSuppliers(businessId)); } catch (error) { setErrorMessage(getErrorMessage(error, "Unable to load suppliers. Please try again.")); } finally { setIsLoading(false); }
  }, [businessId]);

  useEffect(() => { Promise.resolve().then(fetchSuppliers); }, [fetchSuppliers]);

  const filteredSuppliers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return suppliers.filter((supplier) => !search || [supplier.supplier_name, supplier.phone, supplier.gst_number].some((value) => value?.toLowerCase().includes(search)));
  }, [searchTerm, suppliers]);

  function openModal() { setErrorMessage(""); setSupplierId(null); setFormData(initialForm); setIsModalOpen(true); }
  function openEditModal(supplier) { setErrorMessage(""); setSupplierId(supplier.id); setFormData({ ...initialForm, ...supplier, opening_balance: String(supplier.opening_balance) }); setIsModalOpen(true); }
  function closeModal() { setIsModalOpen(false); setSupplierId(null); }
  function handleChange(event) { const { name, value } = event.target; setFormData((current) => ({ ...current, [name]: value })); }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!businessId) { setErrorMessage("No business is selected. Please select a business again."); return; }
    setIsSubmitting(true); setErrorMessage("");
    try {
      const payload = { ...formData, business: businessId, supplier_name: formData.supplier_name.trim(), opening_balance: Number(formData.opening_balance) || 0 };
      if (supplierId) await updateSupplier(supplierId, payload); else await createSupplier(payload);
      await fetchSuppliers(); closeModal();
    } catch (error) { setErrorMessage(getErrorMessage(error, "Unable to save the supplier. Please try again.")); } finally { setIsSubmitting(false); }
  }

  async function handleDelete(supplierIdToDelete) {
    setErrorMessage("");
    try { await deleteSupplier(supplierIdToDelete); await fetchSuppliers(); } catch (error) { setErrorMessage(getErrorMessage(error, "Unable to delete the supplier. Please try again.")); }
  }

  return <section className="grain-inventory"><header className="grain-inventory__header"><div><h1>Suppliers</h1><p>Manage supplier contacts and opening balances.</p></div><button className="grain-inventory__add-button" type="button" onClick={openModal}>+ Add Supplier</button></header>{errorMessage && <p className="grain-inventory__message" role="alert">{errorMessage}</p>}<input className="supplier-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by supplier, phone, or GST" aria-label="Search suppliers" />{isLoading ? <div className="grain-inventory__card"><p className="grain-inventory__loading">Loading suppliers...</p></div> : <SupplierTable suppliers={filteredSuppliers} onDelete={handleDelete} onEdit={openEditModal} />}{isModalOpen && <SupplierModal formData={formData} isSubmitting={isSubmitting} onChange={handleChange} onClose={closeModal} onSubmit={handleSubmit} supplierId={supplierId} />}</section>;
}
