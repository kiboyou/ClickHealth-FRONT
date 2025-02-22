import api from "../api";

// Fonction pour récupérer tous les réceptionnistes
export const getReceptionnistes = async () => {
  const response = await api.get("personnel/receptionniste");
  return response.data;
};

// Fonction pour récupérer un réceptionniste par son ID
export const getReceptionnisteById = async (id) => {
  const response = await api.get(`personnel/receptionniste/${id}/`);
  return response.data;
};

// Fonction pour créer un réceptionniste
export const createReceptionniste = async (receptionniste) => {
  try {
    const response = await api.post("personnel/receptionniste/", receptionniste);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du réceptionniste:", error);
    if (error.response) {
      // Détails de l'erreur HTTP
      console.error("Détails de la réponse du serveur :", error.response.data);
      throw new Error(`Erreur ${error.response.status}: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      console.error("Aucune réponse du serveur.");
      throw new Error("Aucune réponse du serveur.");
    } else {
      console.error("Erreur lors de la demande:", error.message);
      throw new Error("Erreur lors de la demande: " + error.message);
    }
  }
};

// Fonction pour mettre à jour un réceptionniste
export const updateReceptionniste = async (id, receptionniste) => {
  const response = await api.put(`personnel/receptionniste/${id}/`, receptionniste);
  return response.data;
};

// Fonction pour supprimer un réceptionniste
export const deleteReceptionniste = async (id) => {
  await api.delete(`personnel/receptionniste/${id}/`);
  return id;
};
