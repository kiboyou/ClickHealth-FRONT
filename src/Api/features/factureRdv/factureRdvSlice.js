// src/features/factureRdvSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addFactureRdv,
  editFactureRdv,
  fetchFactureRdvById,
  fetchFacturesRdv,
  removeFactureRdv,
} from './factureRdvThunks';

const factureRdvSlice = createSlice({
  name: 'facturesRdv',
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
      .addCase(fetchFacturesRdv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchFacturesRdv.fulfilled, (state, action) => {
        state.loading = false;
        state.factures = action.payload;
        state.success = 'Factures for appointments fetched successfully';
      })
      .addCase(fetchFacturesRdv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch factures for appointments';
      })

      // Fetch facture by ID
      .addCase(fetchFactureRdvById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchFactureRdvById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFacture = action.payload;
        state.success = 'Facture for appointment fetched successfully';
      })
      .addCase(fetchFactureRdvById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch facture for appointment';
      })

      // Add facture
      .addCase(addFactureRdv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addFactureRdv.fulfilled, (state, action) => {
        state.loading = false;
        state.factures.push(action.payload);
        state.success = 'Facture for appointment added successfully';
        state.selectedFacture = action.payload;
      })
      .addCase(addFactureRdv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add facture for appointment';
      })

      // Edit facture
      .addCase(editFactureRdv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editFactureRdv.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.factures.findIndex((facture) => facture.id === action.payload.id);
        if (index !== -1) {
          state.factures[index] = action.payload;
          state.success = 'Facture for appointment updated successfully';
        }
      })
      .addCase(editFactureRdv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update facture for appointment';
      })

      // Remove facture
      .addCase(removeFactureRdv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeFactureRdv.fulfilled, (state, action) => {
        state.loading = false;
        state.factures = state.factures.filter((facture) => facture.id !== action.payload);
        state.success = 'Facture for appointment deleted successfully';
      })
      .addCase(removeFactureRdv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete facture for appointment';
      });
  },
});

export const { clearError, clearSuccess } = factureRdvSlice.actions;

export default factureRdvSlice.reducer;
