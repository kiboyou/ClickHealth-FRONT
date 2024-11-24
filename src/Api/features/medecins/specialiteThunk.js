 import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSpecialites, createSpecialite, updateSpecialite, deleteSpecialite } from '../../services/specialiteService';

// Thunk pour obtenir toutes les spécialités
export const fetchSpecialites = createAsyncThunk('specialites/fetchSpecialites', async (_, { rejectWithValue }) => {
  try {
    const response = await getSpecialites();
    return response; // Retourne les spécialités récupérées
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la récupération des spécialités");
  }
});

// Thunk pour ajouter une spécialité
export const addSpecialite = createAsyncThunk('specialites/addSpecialite', async (newSpecialite, { rejectWithValue }) => {
  try {
    const response = await createSpecialite(newSpecialite);
    return response; // Retourne la spécialité ajoutée
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de l'ajout de la spécialité");
  }
});

// Thunk pour mettre à jour une spécialité
export const editSpecialite = createAsyncThunk('specialites/editSpecialite', async ({ id, specialite }, { rejectWithValue }) => {
  try {
    const response = await updateSpecialite(id, specialite);
    return response; // Retourne la spécialité mise à jour
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la mise à jour de la spécialité");
  }
});

// Thunk pour supprimer une spécialité
export const removeSpecialite = createAsyncThunk('specialites/removeSpecialite', async (id, { rejectWithValue }) => {
  try {
    await deleteSpecialite(id);
    return id; // Retourne l'ID de la spécialité supprimée
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la suppression de la spécialité");
  }
});
