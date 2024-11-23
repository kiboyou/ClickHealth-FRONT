import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConsultations, getConsultationById, createConsultation, updateConsultation, deleteConsultation } from '../../services/consultationService';

// Fetch all consultations
export const fetchConsultations = createAsyncThunk('consultations/fetchConsultations', async () => {
  const response = await getConsultations();
  return response;
});

// Fetch consultation by ID
export const fetchConsultationById = createAsyncThunk('consultations/fetchConsultationById', async (id) => {
  const response = await getConsultationById(id);
  return response;
});

// Add consultation
export const addConsultation = createAsyncThunk('consultations/addConsultation', async (newConsultation) => {
  const response = await createConsultation(newConsultation);
  return response;
});

// Edit consultation
export const editConsultation = createAsyncThunk('consultations/editConsultation', async ({ id, consultation }) => {
  const response = await updateConsultation(id, consultation);
  return response;
});

// Remove consultation
export const removeConsultation = createAsyncThunk('consultations/removeConsultation', async (id) => {
  await deleteConsultation(id);
  return id;
});
