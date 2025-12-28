import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/*  Attach JWT automatically */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ⛔ Do NOT attach token for auth routes
  if (
    token &&
    !config.url.includes("/auth") &&
    !config.url.includes("/candidate/login") &&
    !config.url.includes("/candidate/register") &&
    !config.url.includes("/employer/login") &&
    !config.url.includes("/employer/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
