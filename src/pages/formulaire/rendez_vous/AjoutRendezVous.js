import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

import { Input, Label, Select } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import ImageLight from '../../../assets/img/login-office.jpeg';
import ImageDark from '../../../assets/img/login.jpg';


// import { fetchCurrentUser, loginUser } from '../Api/features/userAuth/authThunks';
import Loading from '../../../utils/Loading';
import { fetchPlannings } from '../../../Api/features/plannig/plannigThunks';

const AjoutRendezVous = () =>{

    const dispatch = useDispatch();
    const  navigate = useHistory().push;
  
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    
    const [showPassword, setShowPassword] = useState(false); // Pour le champ "Ancien mot de passe"
    const [isUserFetched, setIsUserFetched] = useState(false);

  
  
  //   // Récupère le statut d'authentification, le groupe, et les erreurs depuis Redux
    const { plannings } = useSelector((state) => state.planning);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     dispatch(loginUser({ email, password }));
  //   };

  useEffect(() => {
    dispatch(fetchPlannings())
  }, [plannings.length, dispatch])

  
  // // Récupère l'utilisateur connecté une fois l'authentification vérifiée
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(fetchCurrentUser())
  //     .then(() => {
  //       setIsUserFetched(true); // Assurez-vous que l'utilisateur est chargé
  //     });
  //   }
  // }, [isAuthenticated, dispatch]);

  // // Redirection une fois que l'utilisateur est récupéré et que l'authentification est réussie
  // useEffect(() => {
  //   if (isAuthenticated && isUserFetched) {
  //     if (!user.is_password_changed) {
  //       navigate('/update-password');
  //     } else {
  //       // switch pour redirection en fonction du groupe de l'utilisateur
  //       // switch (user.groups[0].name) {
  //       //   case 'admin':
  //       //     navigate('/admin-dashboard');
  //       //     break;
  //       //   case 'user':
  //       //     navigate('/user-profile');
  //       //     break;
  //       //   default:
  //       //     navigate('/home');
  //       //     break;
  //       // }
  //     navigate('/app/dashboard');
  //     }
  //   }
  // }, [isAuthenticated, isUserFetched, user, navigate]);
  
  
    
  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
    {console.log(plannings)}
    {/* { loading && <Loading/>} */}

    <div className="flex-1 h-full max-w-6xl mx-auto overflow-hidden bg-white rounded-lg bg-cadre1">
    
        <div className="flex flex-col overflow-y-auto md:flex-row">
        <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>

          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
            {/* onSubmit={handleSubmit} */}
            <form >
              
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                  Formualire de rendez-vous
              </h1>
              
                {/* {error && typeof error === 'string' && <p style={{ color: 'red' }}>{error}</p>}
                {error && typeof error === 'object' && (
                  <p style={{ color: 'red' }}>
                    {error.email || error.password || 'Une erreur est survenue.'}
                  </p>
                )}
                 */}
                
                <Label className="mt-4">
                  <span>Nom</span>
                  <Input className="px-4 py-3 mt-1" placeholder="OUATTARA" onChange={(e) => setFirst_name(e.target.value)}/>
                </Label>

                <Label className="mt-4">
                  <span>Prenoms</span>
                  <Input className="px-4 py-3 mt-1" placeholder="Kiboyou Mohamed" onChange={(e) => setLast_name(e.target.value)}/>
                </Label>
              
                <Label className="mt-4">
                  <span>Email</span>
                  <Input className="px-4 py-3 mt-1 " type="email" placeholder="kiboyou@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </Label>

                <Label className="mt-4">
                  <span>Telephone</span>
                  <Input className="px-4 py-3 mt-1 " type='number' placeholder="0707073567" onChange={(e) => setEmail(e.target.value)} />
                </Label>

                <Label className="mt-4">
                  <span>Message</span>
                  <Input className="px-4 py-3 mt-1 " placeholder="message pour le specialiste" onChange={(e) => setEmail(e.target.value)} />
                </Label>
                
                <Label className="mt-4">
                  <span>Specialite</span>
                  <Select className="mt-1">
                    <option></option>
                    <option>Medecin generale</option>
                    <option>Cardilogie</option>
                    
                  </Select>
                </Label>

                <Label className="mt-4">
                  <span>Plannig</span>
                  <Select className="mt-1">
                    <option></option>
                    {
                      plannings.map((plannig, i) => (
                        <option key={i}>plannig du {plannig.jour} {plannig.date} de {plannig.heure_debut} - {plannig.heure_fin}</option>
                      ))
                    }
                  </Select>
                </Label>
            
                <button type='submit' className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
                    Envoyer
                </button>
              
              </form>
              
              {/* <hr className="my-8" /> */}

              <p className="mt-10">
                <NavLink
                  className="text-sm font-medium text-white hover:underline"
                  to="/verifie_rendez_vous"
                >
                  voulez-vous modifier votre prise de rendez-vous ?
                </NavLink>
              </p>
              {/* <p className="mt-4">
                <NavLink
                  className="text-sm font-medium text-white hover:underline"
                  to="/create-account"
                >
                  Create account
                </NavLink>
              </p> */}
            </div>
          </main>
        </div>
    </div>  
    </div>
  )
}

export default AjoutRendezVous
