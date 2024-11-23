// src/features/factureExamenSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFacturesExamen,
  fetchFactureExamenById,
  addFactureExamen,
  editFactureExamen,
  removeFactureExamen,
} from './factureExamenThunks';

const factureExamenSlice = createSlice({
  name: 'facturesExamen',
  initialState: {
    factures: [],
    selectedFacture: null,
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
      // Fetch all factures
      .addCase(fetchFacturesExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchFacturesExamen.fulfilled, (state, action) => {
        state.loading = false;
        state.factures = action.payload;
        state.success = 'Factures for exams fetched successfully';
      })
      .addCase(fetchFacturesExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch factures for exams';
      })

      // Fetch facture by ID
      .addCase(fetchFactureExamenById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchFactureExamenById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFacture = action.payload;
        state.success = 'Facture for exam fetched successfully';
      })
      .addCase(fetchFactureExamenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch facture for exam';
      })

      // Add facture
      .addCase(addFactureExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addFactureExamen.fulfilled, (state, action) => {
        state.loading = false;
        state.factures.push(action.payload);
        state.success = 'Facture for exam added successfully';
        state.selectedFacture = action.payload;
      })
      .addCase(addFactureExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add facture for exam';
      })

      // Edit facture
      .addCase(editFactureExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editFactureExamen.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.factures.findIndex((facture) => facture.id === action.payload.id);
        if (index !== -1) {
          state.factures[index] = action.payload;
          state.success = 'Facture for exam updated successfully';
        }
      })
      .addCase(editFactureExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update facture for exam';
      })

      // Remove facture
      .addCase(removeFactureExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeFactureExamen.fulfilled, (state, action) => {
        state.loading = false;
        state.factures = state.factures.filter((facture) => facture.id !== action.payload);
        state.success = 'Facture for exam deleted successfully';
      })
      .addCase(removeFactureExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete facture for exam';
      });
  },
});

export const { clearError, clearSuccess } = factureExamenSlice.actions;

export default factureExamenSlice.reducer;
