import { createSlice } from '@reduxjs/toolkit';
import { fetchPrescriptions, fetchPrescriptionById, addPrescription, editPrescription, removePrescription } from './prescriptionThunks';

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState: {
    prescriptions: [],
    selectedPrescription: null,
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
    resetCurrentPrescription: (state) => {
      state.selectedPrescription = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions = action.payload;
        state.success = 'Prescriptions fetched successfully';
      })
      .addCase(fetchPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch prescriptions';
      })

      .addCase(fetchPrescriptionById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchPrescriptionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPrescription = action.payload;
        state.success = 'Prescription fetched successfully';
      })
      .addCase(fetchPrescriptionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch prescription by ID';
      })

      .addCase(addPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addPrescription.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions.push(action.payload);
        state.selectedPrescription = action.payload;
        state.success = 'Prescription added successfully';
      })
      .addCase(addPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add prescription';
      })

      .addCase(editPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editPrescription.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.prescriptions.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.prescriptions[index] = action.payload;
          state.success = 'Prescription updated successfully';
        }
      })
      .addCase(editPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update prescription';
      })

      .addCase(removePrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removePrescription.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions = state.prescriptions.filter((item) => item.id !== action.payload);
        state.success = 'Prescription deleted successfully';
      })
      .addCase(removePrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete prescription';
      });
  },
});

export const { clearError, clearSuccess, resetCurrentPrescription } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
