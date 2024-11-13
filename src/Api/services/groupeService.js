// src/api/groupApi.js
import api from "../api";

// Fetch all groups
export const getGroups = async () => {
  const response =  await api.get("groupe/");
  return response.data;
};

// Fetch a group by ID
export const getGroupById = async (id) => {
  const response =  await api.get(`groupe/${id}`);    
  return response.data;
};

// Create a new group
export const createGroup = async (newGroup) => {
  const response =  await api.post("groupe/", newGroup);
  return response.data;
};

// Update a group by ID
export const updateGroup = async (id, updatedGroup) => {
  const response =  await api.put(`groupe/${id}/`, updatedGroup);
  return response.data;
};

// Delete a group by ID
export const deleteGroup = async (id) => {
  const response =  await api.delete(`groupe/${id}/`);
  return response.data;
};
