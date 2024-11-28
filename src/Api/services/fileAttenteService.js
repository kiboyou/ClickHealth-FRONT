import api from "../api";

// Fetch all patients in the queue
export const getQueue = async () => {
  const response = await api.get("file_attente/");
  return response.data;
};

// Fetch a specific patient in the file_attente by ID
export const getPatientById = async (id) => {
  const response = await api.get(`file_attente/${id}/`);
  return response.data;
};

// Add a new patient to the file_attente
export const addPatientTofile_attente = async (newPatient) => {
  const response = await api.post("file_attente/", newPatient);
  return response.data;
};

// Update a specific patient in the file_attente
export const updatePatientInfile_attente = async (id, updatedPatient) => {
  const response = await api.put(`file_attente/${id}/`, updatedPatient);
  return response.data;
};

// Remove a patient from the file_attente
export const removePatientFromfile_attente = async (id) => {
  const response = await api.delete(`file_attente/${id}/`);
  return response.data;
};
