import api from "../api/api";

export async function getDashboard(businessId) {
  const response = await api.get("dashboard/", {
    params: {
      business: businessId,
    },
  });

  return response.data;
}