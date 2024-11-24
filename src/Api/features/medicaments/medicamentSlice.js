import { createSlice } from '@reduxjs/toolkit';
import { fetchMedicaments, fetchMedicamentById, createMedicament, updateMedicament, deleteMedicament } from './medicamentThunk';

const initialState = {
  medicaments: [],
  currentMedicament: null,
  loading: false,
  error: null,
  success: null,
};

const medicamentSlice = createSlice({
  name: 'medicaments',
  initialState,
  reducers: {
    resetCurrentMedicament: (state) => {
      state.currentMedicament = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all medicaments
      .addCase(fetchMedicaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicaments.fulfilled, (state, action) => {
        state.loading = false;
        state.medicaments = action.payload;
        state.success = 'Medicaments fetched successfully';
      })
      .addCase(fetchMedicaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch medicament by ID
      .addCase(fetchMedicamentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicamentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedicament = action.payload;
        state.success = 'Medicament récupérées avec succès';
      })
      .addCase(fetchMedicamentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create new medicament
      .addCase(createMedicament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMedicament.fulfilled, (state, action) => {
        state.loading = false;
        state.medicaments.push(action.payload);
        state.success = 'Médicament ajouté avec succès';
      })
      .addCase(createMedicament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update medicament
      .addCase(updateMedicament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMedicament.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.medicaments.findIndex((med) => med.id === action.payload.id);
        if (index !== -1) {
          state.medicaments[index] = action.payload;
        }
        state.success = 'Medicament mise à jour avec succès';
      })
      .addCase(updateMedicament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete medicament
      .addCase(deleteMedicament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedicament.fulfilled, (state, action) => {
        state.loading = false;
        state.medicaments = state.medicaments.filter((med) => med.id !== action.payload);
        state.success = 'Medicament supprimée avec succès';
      })
      .addCase(deleteMedicament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCurrentMedicament } = medicamentSlice.actions;
export default medicamentSlice.reducer;
