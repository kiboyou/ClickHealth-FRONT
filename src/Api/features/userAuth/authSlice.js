// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, loginUser, logoutUser, changePasseWordUser } from './authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {fisrst_name: '', last_name: '', email: '', groups: [], isPasswordChanged: true},
    isAuthenticated: false,
    isPasswordChanged: false,
    loading: false,
    error: null,
    success: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isPasswordChanged= false;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.access); // Stocke le token
        localStorage.setItem('refresh', action.payload.refresh); // Stocke le refresh
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;

      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('token'); // Supprime le token
        localStorage.removeItem('refresh'); // Supprime le refresh
      })

      // .addCase pour changePasseWordUser
      .addCase(changePasseWordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(changePasseWordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          isPasswordChanged: true,
        };
        state.success = action.payload.message;
      })

      .addCase(changePasseWordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur lors du changement de mot de passe.";
      })

      
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isPasswordChanged= false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('token'); // Supprime le token en cas d'erreur
        localStorage.removeItem('refresh'); // Supprime le refresh en cas d'erreur
      });
  },
});

export default authSlice.reducer;