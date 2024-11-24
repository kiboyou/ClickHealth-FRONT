import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getTypeOrdonnances, 
  createTypeOrdonnance, 
  updateTypeOrdonnance, 
  deleteTypeOrdonnance 
} from '../../services/typeOrdonnanceService';

// Thunk pour obtenir tous les types d'ordonnance
export const fetchTypeOrdonnances = createAsyncThunk(
  'typeOrdonnances/fetchTypeOrdonnances', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTypeOrdonnances();
      return response; // Retourne les types d'ordonnance récupérés
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la récupération des types d'ordonnance");
    }
  }
);

// Thunk pour ajouter un type d'ordonnance
export const addTypeOrdonnance = createAsyncThunk(
  'typeOrdonnances/addTypeOrdonnance', 
  async (newTypeOrdonnance, { rejectWithValue }) => {
    try {
      const response = await createTypeOrdonnance(newTypeOrdonnance);
      return response; // Retourne le type d'ordonnance ajouté
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de l'ajout du type d'ordonnance");
    }
  }
);

// Thunk pour mettre à jour un type d'ordonnance
export const editTypeOrdonnance = createAsyncThunk(
  'typeOrdonnances/editTypeOrdonnance', 
  async ({ id, typeOrdonnance }, { rejectWithValue }) => {
    try {
      const response = await updateTypeOrdonnance(id, typeOrdonnance);
      return response; // Retourne le type d'ordonnance mis à jour
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la mise à jour du type d'ordonnance");
    }
  }
);

// Thunk pour supprimer un type d'ordonnance
export const removeTypeOrdonnance = createAsyncThunk(
  'typeOrdonnances/removeTypeOrdonnance', 
  async (id, { rejectWithValue }) => {
    try {
      await deleteTypeOrdonnance(id);
      return id; // Retourne l'ID du type d'ordonnance supprimé
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la suppression du type d'ordonnance");
    }
  }
);
