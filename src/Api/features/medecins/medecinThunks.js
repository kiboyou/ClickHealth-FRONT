import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMedecins, getMedecinById, createMedecin, updateMedecin, deleteMedecin } from '../../services/medecinService';

// Thunk pour obtenir tous les médecins
export const fetchMedecins = createAsyncThunk('medecins/fetchMedecins', async (_, { getState, rejectWithValue }) => {
  const { auth } = getState();
  
  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await getMedecins();
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la récupération des médecins");
  }
});

// Thunk pour obtenir un médecin par ID
export const fetchMedecinById = createAsyncThunk('medecins/fetchMedecinById', async (id, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await getMedecinById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la récupération du médecin");
  }
});

// Thunk pour ajouter un nouveau médecin
export const addMedecin = createAsyncThunk('medecins/addMedecin', async (newMedecin, { getState, rejectWithValue }) => {
  const { auth } = getState();
  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await createMedecin(newMedecin);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de l'ajout du médecin");
  }
});

// Thunk pour mettre à jour un médecin
export const editMedecin = createAsyncThunk('medecins/editMedecin', async ({ id, medecin }, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await updateMedecin(id, medecin);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la mise à jour du médecin");
  }
});

// Thunk pour supprimer un médecin
export const removeMedecin = createAsyncThunk('medecins/removeMedecin', async (id, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    await deleteMedecin(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la suppression du médecin");
  }
});
