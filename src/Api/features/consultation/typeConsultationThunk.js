 import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getTypeConsultations, 
  createTypeConsultation, 
  updateTypeConsultation, 
  deleteTypeConsultation 
} from '../../services/typeConsultationService';

// Thunk pour obtenir tous les types de consultation
export const fetchTypeConsultations = createAsyncThunk(
  'typeConsultations/fetchTypeConsultations', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTypeConsultations();
      return response; // Retourne les types de consultation récupérés
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la récupération des types de consultation");
    }
  }
);

// Thunk pour ajouter un type de consultation
export const addTypeConsultation = createAsyncThunk(
  'typeConsultations/addTypeConsultation', 
  async (newTypeConsultation, { rejectWithValue }) => {
    try {
      const response = await createTypeConsultation(newTypeConsultation);
      return response; // Retourne le type de consultation ajouté
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de l'ajout du type de consultation");
    }
  }
);

// Thunk pour mettre à jour un type de consultation
export const editTypeConsultation = createAsyncThunk(
  'typeConsultations/editTypeConsultation', 
  async ({ id, typeConsultation }, { rejectWithValue }) => {
    try {
      const response = await updateTypeConsultation(id, typeConsultation);
      return response; // Retourne le type de consultation mis à jour
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la mise à jour du type de consultation");
    }
  }
);

// Thunk pour supprimer un type de consultation
export const removeTypeConsultation = createAsyncThunk(
  'typeConsultations/removeTypeConsultation', 
  async (id, { rejectWithValue }) => {
    try {
      await deleteTypeConsultation(id);
      return id; // Retourne l'ID du type de consultation supprimé
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la suppression du type de consultation");
    }
  }
);
