// src/features/factureExamenThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFactureExamenById, getFactureExamens, createFactureExamen, deleteFactureExamen, updateFactureExamen } from '../../services/factureExamenService';

// Fetch all factures for exams
export const fetchFacturesExamen = createAsyncThunk('facturesExamen/fetchFacturesExamen', async () => {
  const response = await getFactureExamens();
  return response;
});

// Fetch a facture by ID
export const fetchFactureExamenById = createAsyncThunk('facturesExamen/fetchFactureExamenById', async (id) => {
  const response = await getFactureExamenById(id);
  return response;
});

// Add a new facture for an exam
export const addFactureExamen = createAsyncThunk('facturesExamen/addFactureExamen', async (newFactureExamen) => {
  const response = await createFactureExamen(newFactureExamen);
  return response;
});

// Edit an existing facture for an exam
export const editFactureExamen = createAsyncThunk('facturesExamen/editFactureExamen', async ({ id, factureExamen }) => {
  const response = await updateFactureExamen(id, factureExamen);
  return response;
});

// Remove a facture for an exam
export const removeFactureExamen = createAsyncThunk('facturesExamen/removeFactureExamen', async (id) => {
  await deleteFactureExamen(id);
  return id;
});
