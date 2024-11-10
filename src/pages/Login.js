import React, { useEffect, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { Input, Label } from '@windmill/react-ui'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login.jpg'


import { loginUser, fetchCurrentUser } from '../Api/features/userAuth/authThunks'
import Loading from '../utils/Loading';

const Login = () =>{

    const dispatch = useDispatch();
    const  navigate = useHistory().push;
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false); // Pour le champ "Ancien mot de passe"
    const [isUserFetched, setIsUserFetched] = useState(false);

  
  
    // Récupère le statut d'authentification, le groupe, et les erreurs depuis Redux
    const { isAuthenticated, user, error, loading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ email, password }));
    };


  // Récupère l'utilisateur connecté une fois l'authentification vérifiée
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser())
      .then(() => {
        setIsUserFetched(true); // Assurez-vous que l'utilisateur est chargé
      });
    }
  }, [isAuthenticated, dispatch]);

  // Redirection une fois que l'utilisateur est récupéré et que l'authentification est réussie
  useEffect(() => {
    if (isAuthenticated && isUserFetched) {
      if (!user.is_password_changed) {
        navigate('/update-password');
      } else {
        // switch pour redirection en fonction du groupe de l'utilisateur
        // switch (user.groups[0].name) {
        //   case 'admin':
        //     navigate('/admin-dashboard');
        //     break;
        //   case 'user':
        //     navigate('/user-profile');
        //     break;
        //   default:
        //     navigate('/home');
        //     break;
        // }
      navigate('/app/dashboard');
      }
    }
  }, [isAuthenticated, isUserFetched, user, navigate]);
    
    
  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
      
    { loading && <Loading/>}

      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg bg-cadre1">
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
            <form onSubmit={handleSubmit}>
                <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">Connexion</h1>
                
                {error && typeof error === 'string' && <p style={{ color: 'red' }}>{error}</p>}
                {error && typeof error === 'object' && (
                  <p style={{ color: 'red' }}>
                    {error.email || error.password || 'Une erreur est survenue.'}
                  </p>
                )}
                
                <Label>
                  <span>Email</span>
                  <Input className="px-4 py-3 mt-1 " type="email" placeholder="kiboyou@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </Label>

                <Label className="relative mt-6 ">
                  <span>Mot de passe</span>
                  <Input
                    className="px-4 py-3 mt-1 outline-none active:outline-none"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="***************"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center p-2 pt-8 focus:outline-none focus:border-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5 text-gray-500 outline-none" /> : <EyeIcon className="w-5 h-5 text-gray-500 outline-none" />}
                  </button>
                  
                </Label>

            
                  <button type='submit' className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat">
                    se connecter
                  </button>
              </form> 

              {/* <hr className="my-8" /> */}

              <p className="mt-10">
                <NavLink
                  className="text-sm font-medium text-white hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
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

export default Login
