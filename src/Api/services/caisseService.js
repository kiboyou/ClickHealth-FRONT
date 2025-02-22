import api from '../api';

// Fonction pour récupérer toutes les caisses
export const getCaisses = async () => {
  try {
    const response = await api.get('personnel/receptionniste/caisse/');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des caisses:", error);
    throw error;
  }
};

// Fonction pour récupérer une caisse par son ID
export const getCaisseById = async (id) => {
  try {
    const response = await api.get(`personnel/receptionniste/caisse/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la caisse avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer une nouvelle caisse
export const createCaisse = async (caisse) => {
  try {
    const response = await api.post('personnel/receptionniste/caisse/', caisse);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la caisse:", error);
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

// Fonction pour mettre à jour une caisse
export const updateCaisse = async (id, caisse) => {
  try {
    const response = await api.put(`personnel/receptionniste/caisse/${id}/`, caisse);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la caisse avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer une caisse
export const deleteCaisse = async (id) => {
  try {
    await api.delete(`personnel/receptionniste/caisse/${id}/`);
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la caisse avec ID ${id}:`, error);
    throw error;
  }
};
