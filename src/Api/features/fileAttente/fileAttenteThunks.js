import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getQueue,
  getPatientById,
  addPatientTofile_attente,
  updatePatientInfile_attente,
  removePatientFromfile_attente,
} from '../../services/fileAttenteService';

// Fetch all patients in the queue
export const fetchQueue = createAsyncThunk('queue/fetchQueue', async () => {
  const response = await getQueue();
  return response;
});

// Fetch a specific patient by ID
export const fetchPatientById = createAsyncThunk('queue/fetchPatientById', async (id) => {
  const response = await getPatientById(id);
  return response;
});

// Add a new patient to the queue
export const addPatient = createAsyncThunk('queue/addPatient', async (newPatient) => {
  const response = await addPatientTofile_attente(newPatient);
  return response;
});

// Edit a patient's details in the queue
export const editPatient = createAsyncThunk(
  'queue/editPatient',
  async ({ id, patient }) => {
    console.log('====================================');
    console.log(patient);
    console.log('====================================');
    const response = await updatePatientInfile_attente(id, patient);
    return response;
  }
);

// Remove a patient from the queue
export const removePatient = createAsyncThunk('queue/removePatient', async (id) => {
  await removePatientFromfile_attente(id);
  return id;
});
