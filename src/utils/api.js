import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Trip APIs ──
export const tripAPI = {
  create: (data) => api.post("/api/trips", data),
  getAll: () => api.get("/api/trips"),
  getById: (id) => api.get(`/api/trips/${id}`),
  update: (id, data) => api.put(`/api/trips/${id}`, data),
  delete: (id) => api.delete(`/api/trips/${id}`),
  updateStatus: (id, status) =>
    api.patch(`/api/trips/${id}/status?status=${status}`),
};

// ── Itinerary APIs ──
export const itineraryAPI = {
  generate: (tripId) => api.post(`/api/trips/${tripId}/itineraries/generate`),
  getByTrip: (tripId) => api.get(`/api/trips/${tripId}/itineraries`),
  update: (id, data) => api.put(`/api/itineraries/${id}`, data),
  delete: (id) => api.delete(`/api/itineraries/${id}`),
};

// ── Activity APIs ──
export const activityAPI = {
  create: (itineraryId, data) =>
    api.post(`/api/itineraries/${itineraryId}/activities`, data),
  getByItinerary: (itineraryId) =>
    api.get(`/api/itineraries/${itineraryId}/activities`),
  update: (id, data) => api.put(`/api/activities/${id}`, data),
  delete: (id) => api.delete(`/api/activities/${id}`),
};

// ── Destination APIs ──
export const destinationAPI = {
  getAll: () => api.get("/api/destinations"),
  getById: (id) => api.get(`/api/destinations/${id}`),
  getPopular: () => api.get("/api/destinations/popular"),
  search: (query) => api.get(`/api/destinations/search?query=${query}`),
};

export default api;
