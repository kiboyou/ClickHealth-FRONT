// src/api/axios.js
import axios from 'axios';

// Configuration d'instance Axios
const api = axios.create({
baseURL: 'http://192.168.10.137:9800/api/', // Remplacez par l'URL de base de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Pour envoyer les cookies avec les requêtes, si nécessaire
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajout du token d'authentification si disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Gestion des erreurs spécifiques de l'API
      if (error.response.status === 401) {
        console.log("Non autorisé : Veuillez vous reconnecter.");
        // Rediriger l'utilisateur vers la page de connexion si nécessaire
      } else if (error.response.status === 403) {
        console.log("Accès refusé.");
      }
    } else {
      console.log("Erreur réseau : Veuillez vérifier votre connexion.");
    }
    return Promise.reject(error);
  }
);

export default api;