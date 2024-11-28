import { createSlice } from '@reduxjs/toolkit';
import { changePasseWordUser, fetchCurrentUser, loginUser, logoutUser } from './authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: !!localStorage.getItem('token'), // Initialisation en fonction du token
    loading: false,
    error: null,
    success: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.isAuthenticated = true;
      }
    }
  },
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

      // Changer le mot de passe
      .addCase(changePasseWordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasseWordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
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

export const { initializeAuth, clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
