import api from "../api";

// Fonction pour récupérer tous les médecins
export const getMedecins = async () => {
  const response = await api.get("personnel/medecin");
  return response.data;
};

// Fonction pour récupérer un médecin par son ID
export const getMedecinById = async (id) => {
  const response = await api.get(`personnel/medecin/${id}`);
  return response.data;
};

// Fonction pour créer un médecin
 export const createMedecin = async (medecin) => {
  try {
    const response = await api.post("personnel/medecin/", medecin);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du médecin:", error);
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


// Fonction pour mettre à jour un médecin
export const updateMedecin = async (id, medecin) => {
  const response = await api.put(`personnel/medecin/${id}`, medecin);
  return response.data;
};

// Fonction pour supprimer un médecin
export const deleteMedecin = async (id) => {
  await api.delete(`personnel/medecin/${id}`);
  return id;
};
