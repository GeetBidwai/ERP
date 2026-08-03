import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return "";
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");

  console.log("CSRF TOKEN:", csrfToken);

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

export async function initializeCSRF() {
  await api.get("csrf/");
}

export default api;