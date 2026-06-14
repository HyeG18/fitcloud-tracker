import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
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
  // Using a default ID of 1 for now, as auth is not specified
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};
