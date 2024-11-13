// planningThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/planningService';

export const fetchPlannings = createAsyncThunk('planning/fetchPlannings', async () => {
  const data = await api.getPlannig();
  return data;
});

export const fetchPlanningById = createAsyncThunk('planning/fetchPlanningById', async (id) => {
  const data = await api.getPlannigById(id);
  return data;
});

export const createPlanning = createAsyncThunk('planning/createPlanning', async (planning) => {
  const data = await api.createPlannig(planning);
  return data;
});

export const updatePlanning = createAsyncThunk('planning/updatePlanning', async ({ id, planning }) => {
  const data = await api.updatePlannig(id, planning);
  return data;
});

export const deletePlanning = createAsyncThunk('planning/deletePlanning', async (id) => {
  await api.deletePlannig(id);
  return id;
});
