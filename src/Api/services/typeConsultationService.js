import api from '../api';

// Fonction pour récupérer tous les types de consultation
export const getTypeConsultations = async () => {
  try {
    const response = await api.get("consultation/type_consultation/");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des types de consultation:", error);
    throw error;
  }
};

// Fonction pour récupérer un type de consultation par son ID
export const getTypeConsultationById = async (id) => {
  try {
    const response = await api.get(`consultation/type_consultation/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du type de consultation avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer un nouveau type de consultation
export const createTypeConsultation = async (typeConsultation) => {
  try {
    const response = await api.post("consultation/type_consultation/", typeConsultation);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du type de consultation:", error);
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

// Fonction pour mettre à jour un type de consultation
export const updateTypeConsultation = async (id, typeConsultation) => {
  try {
    const response = await api.put(`consultation/type_consultation/${id}/`, typeConsultation);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du type de consultation avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer un type de consultation
export const deleteTypeConsultation = async (id) => {
  try {
    await api.delete(`consultation/type_consultation/${id}/`);
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression du type de consultation avec ID ${id}:`, error);
    throw error;
  }
};
