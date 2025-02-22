import api from "../api";

export const getRendezVous = async () => {
  const response = await api.get("rendez_vous/");
  return response.data;
};

export const getRendezVousById = async (id) => {
  const response = await api.get(`rendez_vous/${id}/`);
  return response.data;
};

export const getRendezVousByCode = async (codeRendezVous) => {
    const response = await api.get(`rendez_vous/${codeRendezVous}/`);
    return response.data;
  };

export const createRendezVous = async (rendezVous) => {
  const response = await api.post("rendez_vous/", rendezVous);
  return response.data;
};

export const updateRendezVous = async (id, rendezVous) => {
  const response = await api.put(`rendez_vous/${id}/`, rendezVous);
  return response.data;
};

export const deleteRendezVous = async (id) => {
  await api.delete(`rendez_vous/${id}/`);
  return id;
};