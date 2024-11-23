import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdonnances, getOrdonnanceById, createOrdonnance, updateOrdonnance, deleteOrdonnance } from '../../services/ordonnanceService';

// Fetch all ordonnances
export const fetchOrdonnances = createAsyncThunk('ordonnances/fetchOrdonnances', async () => {
  const response = await getOrdonnances();
  return response;
});

// Fetch ordonnance by ID
export const fetchOrdonnanceById = createAsyncThunk('ordonnances/fetchOrdonnanceById', async (id) => {
  const response = await getOrdonnanceById(id);
  return response;
});

// Add ordonnance
export const addOrdonnance = createAsyncThunk('ordonnances/addOrdonnance', async (newOrdonnance) => {
  const response = await createOrdonnance(newOrdonnance);
  return response;
});

// Edit ordonnance
export const editOrdonnance = createAsyncThunk('ordonnances/editOrdonnance', async ({ id, ordonnance }) => {
  const response = await updateOrdonnance(id, ordonnance);
  return response;
});

// Remove ordonnance
export const removeOrdonnance = createAsyncThunk('ordonnances/removeOrdonnance', async (id) => {
  await deleteOrdonnance(id);
  return id;
});
