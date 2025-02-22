import api from '../api';

// Fonction pour récupérer tous les types d'examen
export const getTypeExamens = async () => {
  try {
    const response = await api.get("examen/type_examen/");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des types d'examen:", error);
    throw error;
  }
};

// Fonction pour récupérer un type d'examen par son ID
export const getTypeExamenById = async (id) => {
  try {
    const response = await api.get(`examen/type_examen/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du type d'examen avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour créer un nouveau type d'examen
export const createTypeExamen = async (typeExamen) => {
  try {
    const response = await api.post("examen/type_examen/", typeExamen);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du type d'examen:", error);
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

// Fonction pour mettre à jour un type d'examen
export const updateTypeExamen = async (id, typeExamen) => {
  try {
    const response = await api.put(`examen/type_examen/${id}/`, typeExamen);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du type d'examen avec ID ${id}:`, error);
    throw error;
  }
};

// Fonction pour supprimer un type d'examen
export const deleteTypeExamen = async (id) => {
  try {
    await api.delete(`examen/type_examen/${id}/`);
    return id;
  } catch (error) {
    console.error(`Erreur lors de la suppression du type d'examen avec ID ${id}:`, error);
    throw error;
  }
};
