// src/api/factureRdvApi.js
import api from "../api";

// Fetch all factures with associated rdvs
export const getFactureRdvs = async () => {
  const response = await api.get("facturation/rendezvous/");
  return response.data;
};

// Fetch a specific facture with rdvs by ID
export const getFactureRdvById = async (id) => {
  const response = await api.get(`facturation/rendezvous/${id}/`);
  return response.data;
};

// Create a new facture with rdvs
export const createFactureRdv = async (newFactureRdv) => {
  const response = await api.post("facturation/rendezvous/", newFactureRdv);
  return response.data;
};

// Update a facture with rdvs by ID
export const updateFactureRdv = async (id, updatedFactureRdv) => {
  const response = await api.put(`facturation/rendezvous/${id}/`, updatedFactureRdv);
  return response.data;
};

// Delete a facture with rdvs by ID
export const deleteFactureRdv = async (id) => {
  const response = await api.delete(`facturation/rendezvous/${id}/`);
  return response.data;
};
