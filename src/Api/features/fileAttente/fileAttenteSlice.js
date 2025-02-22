import { createSlice } from '@reduxjs/toolkit';
import {
  fetchQueue,
  fetchPatientById,
  addPatient,
  editPatient,
  removePatient,
} from './fileAttenteThunks';


const queueSlice = createSlice({
  name: 'queue',
  initialState: {
    queue: [],
    selectedPatient: null,
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
      // Fetch all patients in the queue
      .addCase(fetchQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.queue = action.payload;
        state.success = 'Queue fetched successfully';
      })
      .addCase(fetchQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch queue';
      })

      // Fetch patient by ID
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPatient = action.payload;
        state.success = 'Patient fetched successfully';
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch patient by ID';
      })

      // Add patient to the queue
      .addCase(addPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.queue.push(action.payload);
        state.selectedPatient = action.payload;
        state.success = 'Patient added successfully';
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add patient';
      })

      // Edit patient in the queue
      .addCase(editPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPatient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.queue.findIndex((patient) => patient.id === action.payload.id);
        if (index !== -1) {
          state.queue[index] = action.payload;
          state.success = 'Patient updated successfully';
        }
      })
      .addCase(editPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update patient';
      })

      // Remove patient from the queue
      .addCase(removePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.queue = state.queue.filter((patient) => patient.id !== action.payload);
        state.success = 'Patient removed successfully';
      })
      .addCase(removePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove patient';
      });
  },
});

export const { clearError, clearSuccess } = queueSlice.actions;

export default queueSlice.reducer;
