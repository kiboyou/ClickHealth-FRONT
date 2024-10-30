import api from "../api";

export const login = async (credentials) => {
    const response = await api.post('token/', credentials);
    return response.data;
  };

export const logout = async () => {
    const refreshToken = localStorage.getItem('refresh');
    const response = await api.post('utilisateur/deconnexion/', {
        refresh_token: refreshToken,
    });
    return response.data;
};
 

export const getCurrentUser = async () => {
    const response = await api.get('utilisateur/connecter/');
    return response.data;
};

