import { createSlice } from '@reduxjs/toolkit';
import { fetchOrdonnances, fetchOrdonnanceById, addOrdonnance, editOrdonnance, removeOrdonnance } from './ordonnanceThunks';

const ordonnanceSlice = createSlice({
  name: 'ordonnances',
  initialState: {
    ordonnances: [],
    selectedOrdonnance: null,
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
    resetCurrentOrdonnance: (state) => {
      state.selectedOrdonnance = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdonnances.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchOrdonnances.fulfilled, (state, action) => {
        state.loading = false;
        state.ordonnances = action.payload;
        state.success = 'Ordonnances fetched successfully';
      })
      .addCase(fetchOrdonnances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch ordonnances';
      })

      .addCase(fetchOrdonnanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchOrdonnanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrdonnance = action.payload;
        state.success = 'Ordonnance fetched successfully';
      })
      .addCase(fetchOrdonnanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch ordonnance by ID';
      })

      .addCase(addOrdonnance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addOrdonnance.fulfilled, (state, action) => {
        state.loading = false;
        state.ordonnances.push(action.payload);
        state.selectedOrdonnance = action.payload;
        state.success = 'Ordonnance added successfully';
      })
      .addCase(addOrdonnance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add ordonnance';
      })

      .addCase(editOrdonnance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editOrdonnance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.ordonnances.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.ordonnances[index] = action.payload;
          state.success = 'Ordonnance updated successfully';
        }
      })
      .addCase(editOrdonnance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update ordonnance';
      })

      .addCase(removeOrdonnance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeOrdonnance.fulfilled, (state, action) => {
        state.loading = false;
        state.ordonnances = state.ordonnances.filter((item) => item.id !== action.payload);
        state.success = 'Ordonnance deleted successfully';
      })
      .addCase(removeOrdonnance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete ordonnance';
      });
  },
});

export const { clearError, clearSuccess, resetCurrentOrdonnance } = ordonnanceSlice.actions;

export default ordonnanceSlice.reducer;
