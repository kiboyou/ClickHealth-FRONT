// src/features/typeConsultationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTypeConsultations,
  addTypeConsultation,
  editTypeConsultation,
  removeTypeConsultation
} from './typeConsultationThunk';

const typeConsultationSlice = createSlice({
  name: 'typeConsultations',
  initialState: {
    typeConsultations: [],           // Liste de tous les types de consultation
    selectedTypeConsultation: null,  // Type de consultation sélectionné (si applicable)
    loading: false,                  // Indicateur de chargement pour toutes les requêtes
    error: null,                     // Message d'erreur
    success: null,                   // Message de succès pour les actions
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
      // Fetch all typeConsultations
      .addCase(fetchTypeConsultations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchTypeConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.typeConsultations = action.payload;
        state.success = 'Types de consultation récupérés avec succès';
      })
      .addCase(fetchTypeConsultations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la récupération des types de consultation';
      })

      // Add typeConsultation
      .addCase(addTypeConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTypeConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.typeConsultations.push(action.payload);
        state.success = 'Type de consultation ajouté avec succès';
      })
      .addCase(addTypeConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de l\'ajout du type de consultation';
      })

      // Edit typeConsultation
      .addCase(editTypeConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTypeConsultation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.typeConsultations.findIndex((type) => type.id === action.payload.id);
        if (index !== -1) {
          state.typeConsultations[index] = action.payload;
        }
        state.success = 'Type de consultation mis à jour avec succès';
      })
      .addCase(editTypeConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la mise à jour du type de consultation';
      })

      // Remove typeConsultation
      .addCase(removeTypeConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTypeConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.typeConsultations = state.typeConsultations.filter((type) => type.id !== action.payload);
        state.success = 'Type de consultation supprimé avec succès';
      })
      .addCase(removeTypeConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur lors de la suppression du type de consultation';
      });
  },
});

export const { clearError, clearSuccess } = typeConsultationSlice.actions;

export default typeConsultationSlice.reducer;
