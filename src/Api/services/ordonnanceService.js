import api from "../api";

// Fetch all ordonnances
export const getOrdonnances = async () => {
  const response = await api.get("ordonnance/");
  return response.data;
};

// Fetch an ordonnance by ID
export const getOrdonnanceById = async (id) => {
  const response = await api.get(`ordonnance/${id}/`);
  return response.data;
};

// Create a new ordonnance
export const createOrdonnance = async (newOrdonnance) => {
  const response = await api.post("ordonnance/", newOrdonnance);
  return response.data;
};

// Update an ordonnance by ID
export const updateOrdonnance = async (id, updatedOrdonnance) => {
  const response = await api.put(`ordonnance/${id}/`, updatedOrdonnance);
  return response.data;
};

// Delete an ordonnance by ID
export const deleteOrdonnance = async (id) => {
  const response = await api.delete(`ordonnance/${id}/`);
  return response.data;
};
