import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReceptionnistes, getReceptionnisteById, createReceptionniste, updateReceptionniste, deleteReceptionniste } from '../../services/receptionnisteService';

// Thunk pour obtenir tous les réceptionnistes
export const fetchReceptionnistes = createAsyncThunk('receptionnistes/fetchReceptionnistes', async (_, { getState, rejectWithValue }) => {
  const { auth } = getState();
  
  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await getReceptionnistes();
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la récupération des réceptionnistes");
  }
});

// Thunk pour obtenir un réceptionniste par ID
export const fetchReceptionnisteById = createAsyncThunk('receptionnistes/fetchReceptionnisteById', async (id, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await getReceptionnisteById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la récupération du réceptionniste");
  }
});

// Thunk pour ajouter un nouveau réceptionniste
export const addReceptionniste = createAsyncThunk('receptionnistes/addReceptionniste', async (newReceptionniste, { getState, rejectWithValue }) => {
  const { auth } = getState();
  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await createReceptionniste(newReceptionniste);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de l'ajout du réceptionniste");
  }
});

// Thunk pour mettre à jour un réceptionniste
export const editReceptionniste = createAsyncThunk('receptionnistes/editReceptionniste', async ({ id, receptionniste }, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    const response = await updateReceptionniste(id, receptionniste);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la mise à jour du réceptionniste");
  }
});

// Thunk pour supprimer un réceptionniste
export const removeReceptionniste = createAsyncThunk('receptionnistes/removeReceptionniste', async (id, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  try {
    await deleteReceptionniste(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || "Erreur lors de la suppression du réceptionniste");
  }
});
