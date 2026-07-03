import axios from "axios";

const DEFAULT_USER_ID = 1;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getActividades = async (usuarioId = DEFAULT_USER_ID) => {
  const response = await api.get(`/actividades/usuario/${usuarioId}`);
  return response.data;
};

export const createActividad = async (actividad) => {
  const fechaNormalizada =
    actividad.fecha && actividad.fecha.length === 16
      ? `${actividad.fecha}:00`
      : actividad.fecha;

  const payload = {
    tipo: actividad.tipo,
    distanciaKm: actividad.distanciaKm,
    duracionMin: actividad.duracionMin,
    fecha: fechaNormalizada,
    usuario: {
      id: actividad.usuarioId || DEFAULT_USER_ID,
    },
  };

  console.log("Payload enviado al backend:", payload);

  const response = await api.post("/actividades", payload);
  return response.data;
};

export const getUsuario = async (id = DEFAULT_USER_ID) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};