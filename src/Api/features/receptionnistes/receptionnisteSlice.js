import { createSlice } from '@reduxjs/toolkit';
import { fetchReceptionnistes, fetchReceptionnisteById, addReceptionniste, editReceptionniste, removeReceptionniste } from './receptionnisteThunk';

const receptionnisteSlice = createSlice({
  name: 'receptionnistes',
  initialState: {
    receptionnistes: [],
    selectedReceptionniste: null,
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
      // Fetch all receptionnistes
      .addCase(fetchReceptionnistes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchReceptionnistes.fulfilled, (state, action) => {
        state.loading = false;
        state.receptionnistes = action.payload;
        state.success = 'Réceptionnistes récupérés avec succès';
      })
      .addCase(fetchReceptionnistes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la récupération des réceptionnistes';
      })

      // Fetch receptionniste by ID
      .addCase(fetchReceptionnisteById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchReceptionnisteById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReceptionniste = action.payload;
        state.success = 'Réceptionniste récupéré avec succès';
      })
      .addCase(fetchReceptionnisteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la récupération du réceptionniste';
      })

      // Add receptionniste
      .addCase(addReceptionniste.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addReceptionniste.fulfilled, (state, action) => {
        state.loading = false;
        state.receptionnistes.push(action.payload);
        state.selectedReceptionniste = action.payload;
        state.success = 'Réceptionniste ajouté avec succès';
      })
      .addCase(addReceptionniste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de l\'ajout du réceptionniste';
      })

      // Edit receptionniste
      .addCase(editReceptionniste.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editReceptionniste.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.receptionnistes.findIndex((receptionniste) => receptionniste.id === action.payload.id);
        if (index !== -1) {
          state.receptionnistes[index] = action.payload;
        }
        state.success = 'Réceptionniste mis à jour avec succès';
      })
      .addCase(editReceptionniste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la mise à jour du réceptionniste';
      })

      // Remove receptionniste
      .addCase(removeReceptionniste.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeReceptionniste.fulfilled, (state, action) => {
        state.loading = false;
        state.receptionnistes = state.receptionnistes.filter((receptionniste) => receptionniste.id !== action.payload);
        state.success = 'Réceptionniste supprimé avec succès';
      })
      .addCase(removeReceptionniste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la suppression du réceptionniste';
      });
  },
});

export const { clearError, clearSuccess } = receptionnisteSlice.actions;

export default receptionnisteSlice.reducer;
