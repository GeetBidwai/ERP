import api from "./api";

export async function getInventory(businessId) {
  const response = await api.get("inventory/", {
    params: { business: businessId },
  });
  return response.data;
}

export function createInventory(inventory) {
  return api.post("inventory/", inventory);
}

export function updateInventory(inventoryId, inventory) {
  return api.put(`inventory/${inventoryId}/`, inventory);
}

export function deleteInventory(inventoryId) {
  return api.delete(`inventory/${inventoryId}/`);
}
