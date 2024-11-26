// planningSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPlannings, fetchPlanningById, createPlanning, updatePlanning, deletePlanning } from './plannigThunks';

const initialState = {
  plannings: [],
  currentPlanning: null,
  loading: false,
  error: null,
  success: null
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
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
        state.success = 'Plannings fetched successfully';
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
        state.success = 'Plannig fetched successfully';
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
        state.success = 'Planning created successfully';
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
          state.success = 'Planning updated successfully';

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
        state.success = 'Palnning deleted successfully';

      })
      .addCase(deletePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCurrentPlanning, clearError, clearSuccess  } = planningSlice.actions;
export default planningSlice.reducer;
