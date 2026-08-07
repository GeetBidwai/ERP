import api from "../api/api";

export async function getSales(businessId) {
  const response = await api.get("sales/history/", { params: { business: businessId } });
  return response.data;
}

export async function createSale(sale) {
  const response = await api.post("sales/", sale);
  return response.data;
}

export async function getSale(saleId) {
  const response = await api.get(`sales/${saleId}/`);
  return response.data;
}

export function updateSale(saleId, sale) {
  return api.put(`sales/${saleId}/`, sale);
}

export function deleteSale(saleId) {
  return api.delete(`sales/${saleId}/`);
}
