// patientThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/patientService';

export const fetchPatients = createAsyncThunk('patient/fetchPatients', async () => {
  const data = await api.getPatients();
  return data;
});

export const fetchPatientById = createAsyncThunk('patient/fetchPatientById', async (id) => {
  const data = await api.getPatientById(id);
  return data;
});

export const createPatient = createAsyncThunk('patient/createPatient', async (patient) => {
  const data = await api.createPatient(patient);
  return data;
});

export const updatePatient = createAsyncThunk('patient/updatePatient', async ({ id, patient }) => {
  const data = await api.updatePatient(id, patient);
  return data;
});

export const deletePatient = createAsyncThunk('patient/deletePatient', async (id) => {
  await api.deletePatient(id);
  return id;
});
