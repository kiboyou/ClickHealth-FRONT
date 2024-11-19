// src/features/groupSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchGroups, fetchGroupById, addGroup, editGroup, removeGroup } from './groupeThunks';

const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    selectedGroup: null,
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
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all groups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        state.success = 'Groups fetched successfully';
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch groups';
      })

      // Fetch group by ID
      .addCase(fetchGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGroup = action.payload;
        state.success = 'Group fetched successfully';
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch group by ID';
      })

      // Add group
      .addCase(addGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload);
        state.success = 'Group added successfully';
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add group';
      })

      // Edit group
      .addCase(editGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editGroup.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.groups.findIndex((group) => group.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
          state.success = 'Group updated successfully';

        }
      })
      .addCase(editGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update group';
      })

      // Remove group
      .addCase(removeGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter((group) => group.id !== action.payload);
        state.success = 'Group deleted successfully';
      })
      .addCase(removeGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete group';
      });
  },
});

export const { clearError, clearSuccess } = groupSlice.actions;

export default groupSlice.reducer;
