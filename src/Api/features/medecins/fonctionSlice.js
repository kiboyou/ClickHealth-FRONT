 import { createSlice } from '@reduxjs/toolkit';
import { fetchFonctions, addFonction, editFonction, removeFonction } from './fonctionThunk';

const fonctionSlice = createSlice({
  name: 'fonctions',
  initialState: {
    fonctions: [],
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
      // Fetch all fonctions
      .addCase(fetchFonctions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchFonctions.fulfilled, (state, action) => {
        state.loading = false;
        state.fonctions = action.payload;
        state.success = 'Fonctions récupérées avec succès';
      })
      .addCase(fetchFonctions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la récupération des fonctions';
      })

      // Add fonction
      .addCase(addFonction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addFonction.fulfilled, (state, action) => {
        state.loading = false;
        state.fonctions.push(action.payload);
        state.success = 'Fonction ajoutée avec succès';
      })
      .addCase(addFonction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de l\'ajout de la fonction';
      })

      // Edit fonction
      .addCase(editFonction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editFonction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fonctions.findIndex((fonction) => fonction.id === action.payload.id);
        if (index !== -1) {
          state.fonctions[index] = action.payload;
        }
        state.success = 'Fonction mise à jour avec succès';
      })
      .addCase(editFonction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la mise à jour de la fonction';
      })

      // Remove fonction
      .addCase(removeFonction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeFonction.fulfilled, (state, action) => {
        state.loading = false;
        state.fonctions = state.fonctions.filter((fonction) => fonction.id !== action.payload);
        state.success = 'Fonction supprimée avec succès';
      })
      .addCase(removeFonction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la suppression de la fonction';
      });
  },
});

export const { clearError, clearSuccess } = fonctionSlice.actions;

export default fonctionSlice.reducer;
