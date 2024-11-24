import api from '../api';

// Fonction pour récupérer tous les types d'ordonnance
export const getTypeOrdonnances = async () => {
  try {
    const response = await api.get("ordonnance/type_ordonnance/");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des types d'ordonnance:", error);
    throw error;
  }
};

// Fonction pour récupérer un type d'ordonnance par son ID
export const getTypeOrdonnanceById = async (id) => {
  try {
    const response = await api.get(`ordonnance/type_ordonnance/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du type d'ordonnance avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer un nouveau type d'ordonnance
export const createTypeOrdonnance = async (typeOrdonnance) => {
  try {
    const response = await api.post("ordonnance/type_ordonnance/", typeOrdonnance);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du type d'ordonnance:", error);
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

// Fonction pour mettre à jour un type d'ordonnance
export const updateTypeOrdonnance = async (id, typeOrdonnance) => {
  try {
    const response = await api.put(`ordonnance/type_ordonnance/${id}`, typeOrdonnance);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du type d'ordonnance avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer un type d'ordonnance
export const deleteTypeOrdonnance = async (id) => {
  try {
    await api.delete(`ordonnance/type_ordonnance/${id}`);
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression du type d'ordonnance avec ID ${id}:`, error);
    throw error;
  }
};
