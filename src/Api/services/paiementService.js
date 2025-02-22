import api from "../api";

export const getPaiements = async () => {
  const response = await api.get("paiement/");
  return response.data;
};

export const getPaiementById = async (id) => {
  const response = await api.get(`paiement/${id}/`);
  return response.data;
};

export const createPaiement = async (paiement) => {
  const response = await api.post("paiement/", paiement);
  return response.data;
};

export const updatePaiement = async (id, paiement) => {
  const response = await api.put(`paiement/${id}/`, paiement);
  return response.data;
};

export const deletePaiement = async (id) => {
  await api.delete(`paiement/${id}/`);
  return id;
};