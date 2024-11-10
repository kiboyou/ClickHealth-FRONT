// src/features/groupThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGroups, getGroupById, createGroup, updateGroup, deleteGroup } from '../../services/groupeService';

// Fetch all groups
export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const response = await getGroups();
  return response;
});

// Fetch group by ID
export const fetchGroupById = createAsyncThunk('groups/fetchGroupById', async (id) => {
  const response = await getGroupById(id);
  return response;
});

// Add group
export const addGroup = createAsyncThunk('groups/addGroup', async (newGroup) => {
  const response = await createGroup(newGroup);
  return response;
});

// Edit group
export const editGroup = createAsyncThunk('groups/editGroup', async ({ id, group }) => {
  const response = await updateGroup(id, group);
  return response;
});

// Remove group
export const removeGroup = createAsyncThunk('groups/removeGroup', async (id) => {
  await deleteGroup(id);
  return id;
});
