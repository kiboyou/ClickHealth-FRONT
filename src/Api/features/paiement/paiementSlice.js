import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPaiements,
  fetchPaiementById,
  addPaiement,
  editPaiement,
  removePaiement,
} from './paiementThunks';

const initialState = {
  paiements: [],
  currentPaiement: null,
  loading: false,
  error: null,
  success: null,
};

const paiementSlice = createSlice({
  name: 'paiements',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    resetCurrentPaiement: (state) => {
      state.currentPaiement = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all paiements
      .addCase(fetchPaiements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaiements.fulfilled, (state, action) => {
        state.loading = false;
        state.paiements = action.payload;
        state.success = 'Paiements fetched successfully';
      })
      .addCase(fetchPaiements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch paiements';
      })

      // Fetch paiement by ID
      .addCase(fetchPaiementById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaiementById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPaiement = action.payload;
        state.success = 'Paiement fetched successfully';
      })
      .addCase(fetchPaiementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch paiement';
      })

      // Add paiement
      .addCase(addPaiement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaiement.fulfilled, (state, action) => {
        state.loading = false;
        state.paiements.push(action.payload);
        state.success = 'Paiement added successfully';
      })
      .addCase(addPaiement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add paiement';
      })

      // Edit paiement
      .addCase(editPaiement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPaiement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.paiements.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.paiements[index] = action.payload;
        }
        state.success = 'Paiement updated successfully';
      })
      .addCase(editPaiement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update paiement';
      })

      // Remove paiement
      .addCase(removePaiement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePaiement.fulfilled, (state, action) => {
        state.loading = false;
        state.paiements = state.paiements.filter((p) => p.id !== action.payload);
        state.success = 'Paiement removed successfully';
      })
      .addCase(removePaiement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove paiement';
      });
  },
});

export const { clearError, clearSuccess, resetCurrentPaiement } = paiementSlice.actions;
export default paiementSlice.reducer;