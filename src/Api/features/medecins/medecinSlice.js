import { createSlice } from '@reduxjs/toolkit';
import { fetchMedecins, fetchMedecinById, addMedecin, editMedecin, removeMedecin } from './medecinThunks';

const medecinSlice = createSlice({
  name: 'medecins',
  initialState: {
    medecins: [],
    selectedMedecin: null,
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
      // Fetch all medecins
      .addCase(fetchMedecins.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchMedecins.fulfilled, (state, action) => {
        state.loading = false;
        state.medecins = action.payload;
        state.success = 'Médecins récupérés avec succès';
      })
      .addCase(fetchMedecins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la récupération des médecins';
      })

      // Fetch medecin by ID
      .addCase(fetchMedecinById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchMedecinById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMedecin = action.payload;
        state.success = 'Médecin récupéré avec succès';
      })
      .addCase(fetchMedecinById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la récupération du médecin';
      })

      // Add medecin
      .addCase(addMedecin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addMedecin.fulfilled, (state, action) => {
        state.loading = false;
        state.medecins.push(action.payload);
        state.selectedMedecin = action.payload;
        state.success = 'Médecin ajouté avec succès';
      })
      .addCase(addMedecin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de l\'ajout du médecin';
      })

      // Edit medecin
      .addCase(editMedecin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editMedecin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.medecins.findIndex((medecin) => medecin.id === action.payload.id);
        if (index !== -1) {
          state.medecins[index] = action.payload;
        }
        state.success = 'Médecin mis à jour avec succès';
      })
      .addCase(editMedecin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la mise à jour du médecin';
      })

      // Remove medecin
      .addCase(removeMedecin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeMedecin.fulfilled, (state, action) => {
        state.loading = false;
        state.medecins = state.medecins.filter((medecin) => medecin.id !== action.payload);
        state.success = 'Médecin supprimé avec succès';
      })
      .addCase(removeMedecin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Échec de la suppression du médecin';
      });
  },
});

export const { clearError, clearSuccess } = medecinSlice.actions;

export default medecinSlice.reducer;
