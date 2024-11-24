// src/features/typeExamenThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getTypeExamens, 
  createTypeExamen, 
  updateTypeExamen, 
  deleteTypeExamen 
} from '../../services/typeExamenService';

// Thunk pour obtenir tous les types d'examen
export const fetchTypeExamens = createAsyncThunk(
  'typeExamens/fetchTypeExamens', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTypeExamens();
      return response; // Retourne les types d'examen récupérés
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la récupération des types d'examen");
    }
  }
);

// Thunk pour ajouter un type d'examen
export const addTypeExamen = createAsyncThunk(
  'typeExamens/addTypeExamen', 
  async (newTypeExamen, { rejectWithValue }) => {
    try {
      const response = await createTypeExamen(newTypeExamen);
      return response; // Retourne le type d'examen ajouté
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de l'ajout du type d'examen");
    }
  }
);

// Thunk pour mettre à jour un type d'examen
export const editTypeExamen = createAsyncThunk(
  'typeExamens/editTypeExamen', 
  async ({ id, typeExamen }, { rejectWithValue }) => {
    try {
      const response = await updateTypeExamen(id, typeExamen);
      return response; // Retourne le type d'examen mis à jour
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la mise à jour du type d'examen");
    }
  }
);

// Thunk pour supprimer un type d'examen
export const removeTypeExamen = createAsyncThunk(
  'typeExamens/removeTypeExamen', 
  async (id, { rejectWithValue }) => {
    try {
      await deleteTypeExamen(id);
      return id; // Retourne l'ID du type d'examen supprimé
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la suppression du type d'examen");
    }
  }
);
