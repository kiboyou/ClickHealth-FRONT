import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPaiements,
  getPaiementById,
  createPaiement,
  updatePaiement,
  deletePaiement,
} from '../../services/paiementService'; // Chemin vers vos fonctions API

// Thunks asynchrones
export const fetchPaiements = createAsyncThunk('paiements/fetchPaiements', async (_, thunkAPI) => {
  try {
    const data = await getPaiements();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchPaiementById = createAsyncThunk('paiements/fetchPaiementById', async (id, thunkAPI) => {
  try {
    const data = await getPaiementById(id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addPaiement = createAsyncThunk('paiements/addPaiement', async (paiement, thunkAPI) => {
  try {
    const data = await createPaiement(paiement);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editPaiement = createAsyncThunk('paiements/editPaiement', async ({ id, paiement }, thunkAPI) => {
  try {
    const data = await updatePaiement(id, paiement);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removePaiement = createAsyncThunk('paiements/removePaiement', async (id, thunkAPI) => {
  try {
    await deletePaiement(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});