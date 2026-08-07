import api from "../api/api";

export async function getSuppliers(businessId) {
  const response = await api.get("suppliers/", { params: { business: businessId } });
  return response.data;
}

export async function createSupplier(supplier) {
  const response = await api.post("suppliers/", supplier);
  return response.data;
}

export async function updateSupplier(supplierId, supplier) {
  const response = await api.put(`suppliers/${supplierId}/`, supplier);
  return response.data;
}

export function deleteSupplier(supplierId) {
  return api.delete(`suppliers/${supplierId}/`);
}
