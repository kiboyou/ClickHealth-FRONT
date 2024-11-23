import api from "../api";

// Fetch all prescriptions
export const getPrescriptions = async () => {
  const response = await api.get("ordonnance/prescription/");
  return response.data;
};

// Fetch a prescription by ID
export const getPrescriptionById = async (id) => {
  const response = await api.get(`ordonnance/prescription/${id}`);
  return response.data;
};

// Create a new prescription
export const createPrescription = async (newPrescription) => {
  const response = await api.post("ordonnance/prescription/", newPrescription);
  return response.data;
};

// Update a prescription by ID
export const updatePrescription = async (id, updatedPrescription) => {
  const response = await api.put(`ordonnance/prescription/${id}/`, updatedPrescription);
  return response.data;
};

// Delete a prescription by ID
export const deletePrescription = async (id) => {
  const response = await api.delete(`ordonnance/prescription/${id}/`);
  return response.data;
};
