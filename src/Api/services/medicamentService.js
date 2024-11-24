import api from "../api";

// Récupérer tous les médicaments
export const getMedicaments = async () => {
  const response = await api.get("medicament/");
  return response.data;
};

// Récupérer un médicament par son ID
export const getMedicamentById = async (id) => {
  const response = await api.get(`medicament/${id}`);
  return response.data;
};

// Créer un nouveau médicament
export const createMedicament = async (medicament) => {
  const response = await api.post("medicament/", medicament);
  return response.data;
};

// Mettre à jour un médicament existant
export const updateMedicament = async (id, medicament) => {
  const response = await api.put(`medicament/${id}`, medicament);
  return response.data;
};

// Supprimer un médicament par son ID
export const deleteMedicament = async (id) => {
  await api.delete(`medicament/${id}`);
  return id;
};
