import api from "../api";

// Fetch all exams
export const getExamens = async () => {
  const response = await api.get("examen/");
  return response.data;
};

// Fetch an exam by ID
export const getExamenById = async (id) => {
  const response = await api.get(`examen/${id}/`);
  return response.data;
};

// Create a new exam
export const createExamen = async (newExamen) => {
  const response = await api.post("examen/", newExamen);
  return response.data;
};

// Update an exam by ID
export const updateExamen = async (id, updatedExamen) => {
  const response = await api.put(`examen/${id}/`, updatedExamen);
  return response.data;
};

// Delete an exam by ID
export const deleteExamen = async (id) => {
  const response = await api.delete(`examen/${id}/`);
  return response.data;
};
