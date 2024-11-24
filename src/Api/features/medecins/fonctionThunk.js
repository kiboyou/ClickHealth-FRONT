import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFonctions, createFonction, updateFonction, deleteFonction } from '../../services/fonctionService';

// Thunk pour obtenir toutes les fonctions
export const fetchFonctions = createAsyncThunk('fonctions/fetchFonctions', async (_, { getState, rejectWithValue }) => {
  try {
    const response = await getFonctions();
    return response; // Retourne les fonctions récupérées
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la récupération des fonctions");
  }
});

// Thunk pour ajouter une fonction
export const addFonction = createAsyncThunk('fonctions/addFonction', async (newFonction, { rejectWithValue }) => {
  try {
    const response = await createFonction(newFonction);
    return response; // Retourne la fonction ajoutée
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de l'ajout de la fonction");
  }
});

// Thunk pour mettre à jour une fonction
export const editFonction = createAsyncThunk('fonctions/editFonction', async ({ id, fonction }, { rejectWithValue }) => {
  try {
    const response = await updateFonction(id, fonction);
    return response; // Retourne la fonction mise à jour
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la mise à jour de la fonction");
  }
});

// Thunk pour supprimer une fonction
export const removeFonction = createAsyncThunk('fonctions/removeFonction', async (id, { rejectWithValue }) => {
  try {
    await deleteFonction(id);
    return id; // Retourne l'ID de la fonction supprimée
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la suppression de la fonction");
  }
});
