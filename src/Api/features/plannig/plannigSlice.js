// planningSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPlannings, fetchPlanningById, createPlanning, updatePlanning, deletePlanning } from './plannigThunks';

const initialState = {
  plannings: [],
  currentPlanning: null,
  loading: false,
  error: null,
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    resetCurrentPlanning: (state) => {
      state.currentPlanning = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all plannings
      .addCase(fetchPlannings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlannings.fulfilled, (state, action) => {
        state.loading = false;
        state.plannings = action.payload;
      })
      .addCase(fetchPlannings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch planning by ID
      .addCase(fetchPlanningById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanningById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlanning = action.payload;
      })
      .addCase(fetchPlanningById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create new planning
      .addCase(createPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.plannings.push(action.payload);
      })
      .addCase(createPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update planning
      .addCase(updatePlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlanning.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.plannings.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.plannings[index] = action.payload;
        }
      })
      .addCase(updatePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete planning
      .addCase(deletePlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.plannings = state.plannings.filter(p => p.id !== action.payload);
      })
      .addCase(deletePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCurrentPlanning } = planningSlice.actions;
export default planningSlice.reducer;
