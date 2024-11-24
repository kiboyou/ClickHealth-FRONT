// src/features/typeExamenSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTypeExamens,
  addTypeExamen,
  editTypeExamen,
  removeTypeExamen
} from './typeExamenThunk';

const typeExamenSlice = createSlice({
  name: 'typeExamens',
  initialState: {
    typeExamens: [],            // Liste de tous les types d'examen
    selectedTypeExamen: null,   // Type d'examen sélectionné (si applicable)
    loading: false,             // Indicateur de chargement pour toutes les requêtes
    error: null,                // Message d'erreur
    success: null,              // Message de succès pour les actions
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
      // Fetch all typeExamens
      .addCase(fetchTypeExamens.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchTypeExamens.fulfilled, (state, action) => {
        state.loading = false;
        state.typeExamens = action.payload;
        state.success = 'Types d\'examen récupérés avec succès';
      })
      .addCase(fetchTypeExamens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la récupération des types d\'examen';
      })

      // Add typeExamen
      .addCase(addTypeExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTypeExamen.fulfilled, (state, action) => {
        state.loading = false;
        state.typeExamens.push(action.payload);
        state.success = 'Type d\'examen ajouté avec succès';
      })
      .addCase(addTypeExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de l\'ajout du type d\'examen';
      })

      // Edit typeExamen
      .addCase(editTypeExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTypeExamen.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.typeExamens.findIndex((type) => type.id === action.payload.id);
        if (index !== -1) {
          state.typeExamens[index] = action.payload;
        }
        state.success = 'Type d\'examen mis à jour avec succès';
      })
      .addCase(editTypeExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la mise à jour du type d\'examen';
      })

      // Remove typeExamen
      .addCase(removeTypeExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTypeExamen.fulfilled, (state, action) => {
        state.loading = false;
        state.typeExamens = state.typeExamens.filter((type) => type.id !== action.payload);
        state.success = 'Type d\'examen supprimé avec succès';
      })
      .addCase(removeTypeExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la suppression du type d\'examen';
      });
  },
});

export const { clearError, clearSuccess } = typeExamenSlice.actions;

export default typeExamenSlice.reducer;
