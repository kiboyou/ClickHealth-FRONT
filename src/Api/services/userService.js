import api from "../api";

export const getUsers = async () => {
  const response = await api.get("utilisateur/");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`utilisateur/${id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post("utilisateur/", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`utilisateur/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`utilisateur/${id}`);
  return id;
};
