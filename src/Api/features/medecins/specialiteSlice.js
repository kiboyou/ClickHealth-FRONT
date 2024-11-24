import { createSlice } from '@reduxjs/toolkit';
import { fetchSpecialites, addSpecialite, editSpecialite, removeSpecialite } from './specialiteThunk';

const specialiteSlice = createSlice({
  name: 'specialites',
  initialState: {
    specialites: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all specialites
      .addCase(fetchSpecialites.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchSpecialites.fulfilled, (state, action) => {
        state.loading = false;
        state.specialites = action.payload;
        state.success = 'Spécialités récupérées avec succès';
      })
      .addCase(fetchSpecialites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la récupération des spécialités';
      })

      // Add specialite
      .addCase(addSpecialite.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addSpecialite.fulfilled, (state, action) => {
        state.loading = false;
        state.specialites.push(action.payload);
        state.success = 'Spécialité ajoutée avec succès';
      })
      .addCase(addSpecialite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de l\'ajout de la spécialité';
      })

      // Edit specialite
      .addCase(editSpecialite.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editSpecialite.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.specialites.findIndex((specialite) => specialite.id === action.payload.id);
        if (index !== -1) {
          state.specialites[index] = action.payload;
        }
        state.success = 'Spécialité mise à jour avec succès';
      })
      .addCase(editSpecialite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la mise à jour de la spécialité';
      })

      // Remove specialite
      .addCase(removeSpecialite.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeSpecialite.fulfilled, (state, action) => {
        state.loading = false;
        state.specialites = state.specialites.filter((specialite) => specialite.id !== action.payload);
        state.success = 'Spécialité supprimée avec succès';
      })
      .addCase(removeSpecialite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la suppression de la spécialité';
      });
  },
});

export const { clearError, clearSuccess } = specialiteSlice.actions;

export default specialiteSlice.reducer;
