import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, getCurrentUser, changePasseWord } from '../../services/authApiService';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const userData = await login(credentials);
    return userData;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logout();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const changePasseWordUser = createAsyncThunk('auth/changePassword', async (infoPassword, { rejectWithValue }) => {
  try {
    const userData = await changePasseWord(infoPassword);
    return userData;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
