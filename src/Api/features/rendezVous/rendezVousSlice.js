// rendezVousSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchRendezVous, 
  fetchRendezVousById, 
  fetchRendezVousByCode,
  createRendezVous, 
  updateRendezVous, 
  deleteRendezVous 
} from './rendezVousThunks';

const initialState = {
  rendezVousList: [],
  currentRendezVous: null,
  loading: false,
  error: null,
  success : null
  
};

const rendezVousSlice = createSlice({
  name: 'rendezVous',
  initialState,
  reducers: {
    resetCurrentRendezVous: (state) => {
      state.currentRendezVous = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all rendez-vous
      .addCase(fetchRendezVous.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRendezVous.fulfilled, (state, action) => {
        state.loading = false;
        state.rendezVousList = action.payload;
        state.success = 'rdvs fetched successfully';

      })
      .addCase(fetchRendezVous.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch rendez-vous by ID
      .addCase(fetchRendezVousById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRendezVousById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRendezVous = action.payload;
        state.success = 'rdv fetched successfully';

      })
      .addCase(fetchRendezVousById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       // Fetch rendez-vous by CodeRDV
       .addCase(fetchRendezVousByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRendezVousByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRendezVous = action.payload;
        state.success = 'rdv fetched successfully';

      })
      .addCase(fetchRendezVousByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create a new rendez-vous
      .addCase(createRendezVous.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRendezVous.fulfilled, (state, action) => {
        state.loading = false;
        state.rendezVousList.push(action.payload);
        state.success = 'rdv created successfully';

      })
      .addCase(createRendezVous.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update a rendez-vous
      .addCase(updateRendezVous.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRendezVous.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rendezVousList.findIndex(rdv => rdv.id === action.payload.id);
        if (index !== -1) {
          state.rendezVousList[index] = action.payload;
        }
        state.success = 'rdv updated successfully';


      })
      .addCase(updateRendezVous.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete a rendez-vous
      .addCase(deleteRendezVous.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRendezVous.fulfilled, (state, action) => {
        state.loading = false;
        state.rendezVousList = state.rendezVousList.filter(rdv => rdv.id !== action.payload);
        state.success = 'rdv deleted successfully';

      })
      .addCase(deleteRendezVous.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCurrentRendezVous } = rendezVousSlice.actions;
export default rendezVousSlice.reducer;
