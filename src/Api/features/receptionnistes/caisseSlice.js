import { createSlice } from '@reduxjs/toolkit';
import { fetchCaisses, addCaisse, editCaisse, removeCaisse } from './caisseThunk';  // Assurez-vous que le chemin vers le thunk est correct

const caisseSlice = createSlice({
  name: 'caisses',
  initialState: {
    caisses: [],
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
      // Fetch all caisses
      .addCase(fetchCaisses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchCaisses.fulfilled, (state, action) => {
        state.loading = false;
        state.caisses = action.payload;
        state.success = 'Caisses récupérées avec succès';
      })
      .addCase(fetchCaisses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la récupération des caisses';
      })

      // Add caisse
      .addCase(addCaisse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addCaisse.fulfilled, (state, action) => {
        state.loading = false;
        state.caisses.push(action.payload);
        state.success = 'Caisse ajoutée avec succès';
      })
      .addCase(addCaisse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de l\'ajout de la caisse';
      })

      // Edit caisse
      .addCase(editCaisse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editCaisse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.caisses.findIndex((caisse) => caisse.id === action.payload.id);
        if (index !== -1) {
          state.caisses[index] = action.payload;
        }
        state.success = 'Caisse mise à jour avec succès';
      })
      .addCase(editCaisse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la mise à jour de la caisse';
      })

      // Remove caisse
      .addCase(removeCaisse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeCaisse.fulfilled, (state, action) => {
        state.loading = false;
        state.caisses = state.caisses.filter((caisse) => caisse.id !== action.payload);
        state.success = 'Caisse supprimée avec succès';
      })
      .addCase(removeCaisse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la suppression de la caisse';
      });
  },
});

export const { clearError, clearSuccess } = caisseSlice.actions;

export default caisseSlice.reducer;
