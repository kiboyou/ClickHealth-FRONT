// src/api/factureExamenApi.js
import api from "../api";

// Fetch all factures with associated examens
export const getFactureExamens = async () => {
  const response = await api.get("facturation/examen/");
  return response.data;
};

// Fetch a specific facture with examens by ID
export const getFactureExamenById = async (id) => {
  const response = await api.get(`facturation/examen/${id}`);
  return response.data;
};

// Create a new facture with examens
export const createFactureExamen = async (newFactureExamen) => {
  const response = await api.post("facturation/examen/", newFactureExamen);
  return response.data;
};

// Update a facture with examens by ID
export const updateFactureExamen = async (id, updatedFactureExamen) => {
  const response = await api.put(`facturation/examen/${id}/`, updatedFactureExamen);
  return response.data;
};

// Delete a facture with examens by ID
export const deleteFactureExamen = async (id) => {
  const response = await api.delete(`facturation/examen/${id}/`);
  return response.data;
};
