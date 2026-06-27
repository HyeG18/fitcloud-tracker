import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getActividades = async () => {
  const response = await api.get("/actividades");
  return response.data;
};

export const createActividad = async (actividad) => {
  const response = await api.post("/actividades", actividad);
  return response.data;
};

export const getUsuario = async (id = 1) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};