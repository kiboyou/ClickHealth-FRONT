// src/middleware/authMiddleware.js
const authMiddleware = (store) => (next) => (action) => {
    const state = store.getState();
    const isAuthenticated = state.auth.isAuthenticated;
  
    if (
      action.type.startsWith('users/') && // Vérifie si c'est une action utilisateur
      !isAuthenticated
    ) {
      console.warn('Action bloquée. Utilisateur non authentifié.');
      return; // Bloque l'action si l'utilisateur n'est pas connecté
    }
  
    return next(action); // Passe l'action si l'utilisateur est authentifié
  };
  
export default authMiddleware;