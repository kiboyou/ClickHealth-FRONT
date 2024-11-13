// rendezVousThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/rendezVousService';

export const fetchRendezVous = createAsyncThunk('rendezVous/fetchRendezVous', async () => {
  const data = await api.getRendezVous();
  return data;
});

export const fetchRendezVousById = createAsyncThunk('rendezVous/fetchRendezVousById', async (id) => {
  const data = await api.getRendezVousById(id);
  return data;
});

export const fetchRendezVousByCode = createAsyncThunk('rendezVous/fetchRendezVousByCode', async (codeRendezVous) => {
  const data = await api.getRendezVousByCode(codeRendezVous);
  return data;
});

export const createRendezVous = createAsyncThunk('rendezVous/createRendezVous', async (rendezVous) => {
  const data = await api.createRendezVous(rendezVous);
  return data;
});

export const updateRendezVous = createAsyncThunk('rendezVous/updateRendezVous', async ({ id, rendezVous }) => {
  const data = await api.updateRendezVous(id, rendezVous);
  return data;
});

export const deleteRendezVous = createAsyncThunk('rendezVous/deleteRendezVous', async (id) => {
  await api.deleteRendezVous(id);
  return id;
});
