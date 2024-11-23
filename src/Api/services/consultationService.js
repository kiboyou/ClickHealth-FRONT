import api from "../api";

// Fetch all consultations
export const getConsultations = async () => {
  const response = await api.get("consultation/");
  return response.data;
};

// Fetch a consultation by ID
export const getConsultationById = async (id) => {
  const response = await api.get(`consultation/${id}`);
  return response.data;
};

// Create a new consultation
export const createConsultation = async (newConsultation) => {
  const response = await api.post("consultation/", newConsultation);
  return response.data;
};

// Update a consultation by ID
export const updateConsultation = async (id, updatedConsultation) => {
  const response = await api.put(`consultation/${id}/`, updatedConsultation);
  return response.data;
};

// Delete a consultation by ID
export const deleteConsultation = async (id) => {
  const response = await api.delete(`consultation/${id}/`);
  return response.data;
};
