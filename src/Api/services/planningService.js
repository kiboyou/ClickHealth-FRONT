import api from "../api";

export const getPlannig = async () => {
  const response = await api.get("rendez_vous/plannig/");
  return response.data;
};

export const getPlannigById = async (id) => {
  const response = await api.get(`rendez_vous/plannig/${id}/`);
  return response.data;
};


export const createPlannig = async (plannig) => {
  const response = await api.post("rendez_vous/plannig/", plannig);
  return response.data;
};

export const updatePlannig = async (id, plannig) => {
  const response = await api.put(`rendez_vous/plannig/${id}/`, plannig);
  return response.data;
};

export const deletePlannig = async (id) => {
  await api.delete(`rendez_vous/plannig/${id}/`);
  return id;
};