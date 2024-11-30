import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// Importez vos composants Dashboard
import AdminDashboard from './dashboard/DashboardAdmin';
import MedecinDashboard from './dashboard/DashboardMedecin';
import DashboardPatient from './dashboard/DashboardPatient';
import ReceptionnisteDashboard from './dashboard/DashboardReceptionniste';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import groupeUser from '../utils/GrourpeUser';


function Dashboard() {
  const dispatch = useDispatch();
  const  navigate = useHistory().push;


  // Récupérez les données du store Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirigez si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user.groups[0].name === groupeUser.patient) {
      navigate('/app/rendez_vous');
    } else if (user.groups[0].name === groupeUser.medecin) {
      navigate('/app/planning');
    } else if (user.groups[0].name === groupeUser.receptionniste) {
      navigate('/app/reception/queue');
    } else if (user.groups[0].name === groupeUser.administrateur) {
      navigate('/app/dashboard');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, user.groups]);
  

  // Déterminez quel tableau de bord afficher
  const renderDashboard = () => {
    if (!user || !user.groups || user.groups.length === 0) {
      return <p>Groupe utilisateur non défini</p>; // Cas par défaut ou erreur
    }

    const userGroup = user.groups[0].name; 

    switch (userGroup) {
      case groupeUser.administrateur:
        return <AdminDashboard />;
      default:
        return <p>Groupe utilisateur inconnu : {userGroup}</p>;
    }
  };

  return (
    <>
      {renderDashboard()}
    </>
  );
}

export default Dashboard;
