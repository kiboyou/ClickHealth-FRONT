// src/features/factureRdvThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFactureRdvs, getFactureRdvById, createFactureRdv, updateFactureRdv, deleteFactureRdv } from '../../services/factureRDVService';

// Fetch all factures for appointments
export const fetchFacturesRdv = createAsyncThunk('facturesRdv/fetchFacturesRdv', async () => {
  const response = await getFactureRdvs();
  return response;
});

// Fetch a facture by ID
export const fetchFactureRdvById = createAsyncThunk('facturesRdv/fetchFactureRdvById', async (id) => {
  const response = await getFactureRdvById(id);
  return response;
});

// Add a new facture for an appointment
export const addFactureRdv = createAsyncThunk('facturesRdv/addFactureRdv', async (newFactureRdv) => {
  const response = await createFactureRdv(newFactureRdv);
  return response;
});

// Edit an existing facture for an appointment
export const editFactureRdv = createAsyncThunk('facturesRdv/editFactureRdv', async ({ id, factureRdv }) => {
  const response = await updateFactureRdv(id, factureRdv);
  return response;
});

// Remove a facture for an appointment
export const removeFactureRdv = createAsyncThunk('facturesRdv/removeFactureRdv', async (id) => {
  await deleteFactureRdv(id);
  return id;
});
