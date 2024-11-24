import api from '../api';

// Fonction pour récupérer toutes les fonctions
export const getFonctions = async () => {
  try {
    const response = await api.get("personnel/medecin/fonction/");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des fonctions:", error);
    throw error;
  }
};

// Fonction pour récupérer une fonction par son ID
export const getFonctionById = async (id) => {
  try {
    const response = await api.get(`personnel/medecin/fonction/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la fonction avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer une nouvelle fonction
export const createFonction = async (fonction) => {
  try {
    const response = await api.post("personnel/medecin/fonction/", fonction);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la fonction:", error);
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

// Fonction pour mettre à jour une fonction
export const updateFonction = async (id, fonction) => {
  try {
    const response = await api.put(`personnel/medecin/fonction/${id}`, fonction);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la fonction avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer une fonction
export const deleteFonction = async (id) => {
  try {
    await api.delete(`personnel/medecin/fonction/${id}`);
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la fonction avec ID ${id}:`, error);
    throw error;
  }
};
