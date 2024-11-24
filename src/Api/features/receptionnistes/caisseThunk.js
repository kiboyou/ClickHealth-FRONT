import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCaisses, createCaisse, updateCaisse, deleteCaisse } from '../../services/caisseService';

// Thunk pour obtenir toutes les caisses
export const fetchCaisses = createAsyncThunk('caisses/fetchCaisses', async (_, { getState, rejectWithValue }) => {
  try {
    const response = await getCaisses(); // Récupère toutes les caisses
    return response; // Retourne les caisses récupérées
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la récupération des caisses");
  }
});

// Thunk pour ajouter une caisse
export const addCaisse = createAsyncThunk('caisses/addCaisse', async (newCaisse, { rejectWithValue }) => {
  try {
    const response = await createCaisse(newCaisse); // Crée une nouvelle caisse
    return response; // Retourne la caisse ajoutée
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de l'ajout de la caisse");
  }
});

// Thunk pour mettre à jour une caisse
export const editCaisse = createAsyncThunk('caisses/editCaisse', async ({ id, caisse }, { rejectWithValue }) => {
  try {
    const response = await updateCaisse(id, caisse); // Met à jour la caisse en utilisant son ID
    return response; // Retourne la caisse mise à jour
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la mise à jour de la caisse");
  }
});

// Thunk pour supprimer une caisse
export const removeCaisse = createAsyncThunk('caisses/removeCaisse', async (id, { rejectWithValue }) => {
  try {
    await deleteCaisse(id); // Supprime la caisse en utilisant son ID
    return id; // Retourne l'ID de la caisse supprimée
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la suppression de la caisse");
  }
});
