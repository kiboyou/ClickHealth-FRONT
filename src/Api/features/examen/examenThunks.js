import { createAsyncThunk } from '@reduxjs/toolkit';
import { getExamens, getExamenById, createExamen, updateExamen, deleteExamen } from '../../services/examenService';

// Fetch all exams
export const fetchExamens = createAsyncThunk('examens/fetchExamens', async () => {
  const response = await getExamens();
  return response;
});

// Fetch exam by ID
export const fetchExamenById = createAsyncThunk('examens/fetchExamenById', async (id) => {
  const response = await getExamenById(id);
  return response;
});

// Add exam
export const addExamen = createAsyncThunk('examens/addExamen', async (newExamen) => {
  const response = await createExamen(newExamen);
  return response;
});

// Edit exam
export const editExamen = createAsyncThunk('examens/editExamen', async ({ id, examen }) => {
  const response = await updateExamen(id, examen);
  return response;
});

// Remove exam
export const removeExamen = createAsyncThunk('examens/removeExamen', async (id) => {
  await deleteExamen(id);
  return id;
});
