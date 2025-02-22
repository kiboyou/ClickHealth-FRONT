import api from "../api";

export const getPatients = async () => {
  const response = await api.get("patient/");
  return response.data;
};

export const getPatientById = async (id) => {
  const response = await api.get(`patient/${id}/`);
  return response.data;
};

export const createPatient = async (patient) => {
  const response = await api.post("patient/", patient);
  return response.data;
};

export const updatePatient = async (id, patient) => {
  const response = await api.put(`patient/${id}/`, patient);
  return response.data;
};

export const deletePatient = async (id) => {
  await api.delete(`patient/${id}/`);
  return id;
};