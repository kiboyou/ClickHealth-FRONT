// src/features/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../services/userService';


// Thunk pour obtenir tous les utilisateurs
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState, rejectWithValue }) => {
  const { auth } = getState();
  
  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  const response = await getUsers();
  return response;
});

// Thunk pour obtenir un utilisateur par ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  const response = await getUserById(id);
  return response;
});

// Thunk pour ajouter un nouvel utilisateur
export const addUser = createAsyncThunk('users/addUser', async (newUser, { getState, rejectWithValue }) => {
  const { auth } = getState();
  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  const response = await createUser(newUser);
  return response;
});

// Thunk pour mettre à jour un utilisateur
export const editUser = createAsyncThunk('users/editUser', async ({ id, user }, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  const response = await updateUser(id, user);
  return response;
});

// Thunk pour supprimer un utilisateur
export const removeUser = createAsyncThunk('users/removeUser', async (id, { getState, rejectWithValue }) => {
  const { auth } = getState();

  if (!auth.isAuthenticated) {
    return rejectWithValue("Utilisateur non authentifié");
  }

  await deleteUser(id);
  return id;
});
