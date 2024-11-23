import { createSlice } from '@reduxjs/toolkit';
import { fetchExamens, fetchExamenById, addExamen, editExamen, removeExamen } from './examenThunks';

const examenSlice = createSlice({
  name: 'examens',
  initialState: {
    examens: [],
    selectedExamen: null,
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
      .addCase(fetchExamens.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchExamens.fulfilled, (state, action) => {
        state.loading = false;
        state.examens = action.payload;
        state.success = 'Examens fetched successfully';
      })
      .addCase(fetchExamens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch examens';
      })

      .addCase(fetchExamenById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchExamenById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedExamen = action.payload;
        state.success = 'Examen fetched successfully';
      })
      .addCase(fetchExamenById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch examen by ID';
      })

      .addCase(addExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addExamen.fulfilled, (state, action) => {
        state.loading = false;
        state.examens.push(action.payload);
        state.selectedExamen = action.payload;
        state.success = 'Examen added successfully';
      })
      .addCase(addExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add examen';
      })

      .addCase(editExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editExamen.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.examens.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.examens[index] = action.payload;
          state.success = 'Examen updated successfully';
        }
      })
      .addCase(editExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update examen';
      })

      .addCase(removeExamen.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeExamen.fulfilled, (state, action) => {
        state.loading = false;
        state.examens = state.examens.filter((item) => item.id !== action.payload);
        state.success = 'Examen deleted successfully';
      })
      .addCase(removeExamen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete examen';
      });
  },
});

export const { clearError, clearSuccess } = examenSlice.actions;

export default examenSlice.reducer;
