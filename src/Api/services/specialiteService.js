import api from '../api';

// Fonction pour récupérer toutes les spécialités
export const getSpecialites = async () => {
  try {
    const response = await api.get("personnel/medecin/specialite/");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des spécialités:", error);
    throw error;
  }
};

// Fonction pour récupérer une spécialité par son ID
export const getSpecialiteById = async (id) => {
  try {
    const response = await api.get(`personnel/medecin/specialite/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la spécialité avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer une nouvelle spécialité
export const createSpecialite = async (specialite) => {
  try {
    const response = await api.post("personnel/medecin/specialite/", specialite);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la spécialité:", error);
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

// Fonction pour mettre à jour une spécialité
export const updateSpecialite = async (id, specialite) => {
  try {
    const response = await api.put(`personnel/medecin/specialite/${id}/`, specialite);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la spécialité avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer une spécialité
export const deleteSpecialite = async (id) => {
  try {
    await api.delete(`personnel/medecin/specialite/${id}/`);
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la spécialité avec ID ${id}:`, error);
    throw error;
  }
};
