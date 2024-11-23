import { createSlice } from '@reduxjs/toolkit';
import { fetchConsultations, fetchConsultationById, addConsultation, editConsultation, removeConsultation } from './consultationThunks';

const consultationSlice = createSlice({
  name: 'consultations',
  initialState: {
    consultations: [],
    selectedConsultation: null,
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
      .addCase(fetchConsultations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
        state.success = 'Consultations fetched successfully';
      })
      .addCase(fetchConsultations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch consultations';
      })

      .addCase(fetchConsultationById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchConsultationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedConsultation = action.payload;
        state.success = 'Consultation fetched successfully';
      })
      .addCase(fetchConsultationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch consultation by ID';
      })

      .addCase(addConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations.push(action.payload);
        state.selectedConsultation = action.payload;
        state.success = 'Consultation added successfully';
      })
      .addCase(addConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add consultation';
      })

      .addCase(editConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editConsultation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.consultations.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.consultations[index] = action.payload;
          state.success = 'Consultation updated successfully';
        }
      })
      .addCase(editConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update consultation';
      })

      .addCase(removeConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = state.consultations.filter((item) => item.id !== action.payload);
        state.success = 'Consultation deleted successfully';
      })
      .addCase(removeConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete consultation';
      });
  },
});

export const { clearError, clearSuccess } = consultationSlice.actions;

export default consultationSlice.reducer;
