// src/api/groupApi.js
import api from "../api";

// Fetch all groups
export const getGroups = async () => {
  return await api.get("groups");
};

// Fetch a group by ID
export const getGroupById = async (id) => {
  return await api.get(`groups/${id}`);    
};

// Create a new group
export const createGroup = async (newGroup) => {
  return await api.post("groups", newGroup);
};

// Update a group by ID
export const updateGroup = async (id, updatedGroup) => {
  return await api.put(`groups/${id}`, updatedGroup);
};

// Delete a group by ID
export const deleteGroup = async (id) => {
  return await api.delete(`groups/${id}`);
};
