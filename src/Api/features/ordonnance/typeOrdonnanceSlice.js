 // src/features/typeOrdonnanceSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTypeOrdonnances,
  addTypeOrdonnance,
  editTypeOrdonnance,
  removeTypeOrdonnance
} from './typeOrdonnanceThunk';

const typeOrdonnanceSlice = createSlice({
  name: 'typeOrdonnances',
  initialState: {
    typeOrdonnances: [],       // Liste de tous les types d'ordonnances
    selectedTypeOrdonnance: null, // Type d'ordonnance sélectionné (si applicable)
    loading: false,            // Indicateur de chargement pour toutes les requêtes
    error: null,               // Message d'erreur
    success: null,             // Message de succès pour les actions
  },
  reducers: {
    // Actions pour vider les erreurs et les messages de succès
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all typeOrdonnances
      .addCase(fetchTypeOrdonnances.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchTypeOrdonnances.fulfilled, (state, action) => {
        state.loading = false;
        state.typeOrdonnances = action.payload;
        state.success = 'Types d\'ordonnances récupérés avec succès';
      })
      .addCase(fetchTypeOrdonnances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la récupération des types d\'ordonnances';
      })

      // Add typeOrdonnance
      .addCase(addTypeOrdonnance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTypeOrdonnance.fulfilled, (state, action) => {
        state.loading = false;
        state.typeOrdonnances.push(action.payload);
        state.success = 'Type d\'ordonnance ajouté avec succès';
      })
      .addCase(addTypeOrdonnance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de l\'ajout du type d\'ordonnance';
      })

      // Edit typeOrdonnance
      .addCase(editTypeOrdonnance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTypeOrdonnance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.typeOrdonnances.findIndex((type) => type.id === action.payload.id);
        if (index !== -1) {
          state.typeOrdonnances[index] = action.payload;
        }
        state.success = 'Type d\'ordonnance mis à jour avec succès';
      })
      .addCase(editTypeOrdonnance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la mise à jour du type d\'ordonnance';
      })

      // Remove typeOrdonnance
      .addCase(removeTypeOrdonnance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTypeOrdonnance.fulfilled, (state, action) => {
        state.loading = false;
        state.typeOrdonnances = state.typeOrdonnances.filter((type) => type.id !== action.payload);
        state.success = 'Type d\'ordonnance supprimé avec succès';
      })
      .addCase(removeTypeOrdonnance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la suppression du type d\'ordonnance';
      });
  },
});

export const { clearError, clearSuccess } = typeOrdonnanceSlice.actions;

export default typeOrdonnanceSlice.reducer;
