import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPrescriptions, getPrescriptionById, createPrescription, updatePrescription, deletePrescription } from '../../services/prescriptionService';

// Fetch all prescriptions
export const fetchPrescriptions = createAsyncThunk('prescriptions/fetchPrescriptions', async () => {
  const response = await getPrescriptions();
  return response;
});

// Fetch prescription by ID
export const fetchPrescriptionById = createAsyncThunk('prescriptions/fetchPrescriptionById', async (id) => {
  const response = await getPrescriptionById(id);
  return response;
});

// Add prescription
export const addPrescription = createAsyncThunk('prescriptions/addPrescription', async (newPrescription) => {
  const response = await createPrescription(newPrescription);
  return response;
});

// Edit prescription
export const editPrescription = createAsyncThunk('prescriptions/editPrescription', async ({ id, prescription }) => {
  const response = await updatePrescription(id, prescription);
  return response;
});

// Remove prescription
export const removePrescription = createAsyncThunk('prescriptions/removePrescription', async (id) => {
  await deletePrescription(id);
  return id;
});
