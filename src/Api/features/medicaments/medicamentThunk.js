import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/medicamentService';

// Récupérer tous les médicaments
export const fetchMedicaments = createAsyncThunk('medicament/fetchMedicaments', async () => {
  const data = await api.getMedicaments();
  return data;
});

// Récupérer un médicament par son ID
export const fetchMedicamentById = createAsyncThunk('medicament/fetchMedicamentById', async (id) => {
  const data = await api.getMedicamentById(id);
  return data;
});

// Créer un nouveau médicament
export const createMedicament = createAsyncThunk('medicament/createMedicament', async (medicament) => {
  const data = await api.createMedicament(medicament);
  return data;
});

// Mettre à jour un médicament existant
export const updateMedicament = createAsyncThunk('medicament/updateMedicament', async ({ id, medicament }) => {
  const data = await api.updateMedicament(id, medicament);
  return data;
});

// Supprimer un médicament
export const deleteMedicament = createAsyncThunk('medicament/deleteMedicament', async (id) => {
  await api.deleteMedicament(id);
  return id;
});
