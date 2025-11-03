// export const API_URL = "http://localhost:4000/api";

// export async function fetchProducts() {
//   const res = await fetch(`${API_URL}/products`);
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// }

// export async function fetchProductById(id: string) {
//   const res = await fetch(`${API_URL}/products/${id}`);
//   if (!res.ok) throw new Error("Product not found");
//   return res.json();
// }
import axios from "axios";

export const API_URL = "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
