import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { initializeAuth } from './Api/features/userAuth/authSlice';
import { fetchCurrentUser } from './Api/features/userAuth/authThunks';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';


const Acceuil = lazy(() => import('./pages/clients/Acceuil'))
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'))
const AjoutRendezVous = lazy(() => import('./pages/formulaire/rendez_vous/AjoutRendezVous'))
const UpdateRendezVous = lazy(() => import('./pages/formulaire/rendez_vous/UpdateRendezVous'))
const VerifieRendezVous = lazy(() => import('./pages/VerifieRendezVous'))




function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(initializeAuth()); // Vérifie le token au démarrage
      if (localStorage.getItem('token')) {
          dispatch(fetchCurrentUser()); // Récupère les infos de l'utilisateur si token présent
      }
  }, [dispatch]);

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>

          <Route path="/client" component={Acceuil} />

          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/update-password" component={UpdatePassword} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <Route path="/rendez_vous" component={AjoutRendezVous} />
          <Route path="/rendez_vous_update" component={UpdateRendezVous} />
          <Route path="/verifie_rendez_vous" component={VerifieRendezVous} />


          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/client" />

        </Switch>
      </Router>
    </>
  )
}

export default App;