import React, { useState, useEffect } from 'react'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login.jpg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { loginUser, fetchCurrentUser } from '../Api/features/userAuth/authThunks'

const Login = () =>{

    const dispatch = useDispatch();
    const  navigate = useHistory().push;
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  
    // Récupère le statut d'authentification, le groupe, et les erreurs depuis Redux
    const { isAuthenticated, user, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ email, password }));
    };
    
    
    // Redirection après une connexion réussie en fonction du groupe
    useEffect(() => {
      if (isAuthenticated) {
        // if (isAuthenticated) {
        //   switch (group) {
        //     case 'admin':
        //       navigate('/admin-dashboard');
        //       break;
        //     case 'user':
        //       navigate('/user-profile');
        //       break;
        //     default:
        //       navigate('/home');
        //       break;
        //   }
        // }
        navigate('/app/dashboard');
        // console.log(group);
      }
    }, [isAuthenticated, navigate]);
    
  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
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
                  <Input className="px-4 py-3 mt-1 " type="email" placeholder="john@doe.com" onChange={(e) => setEmail(e.target.value)} />
                </Label>

                <Label className="mt-6">
                  <span>Password</span>
                  <Input className="px-4 py-3 mt-1 " type="password" placeholder="***************" onChange={(e) => setPassword(e.target.value)} />
                </Label>

                {/* <Button className="mt-4" block tag={Link} to="/app">
                  Login
                </Button> */}

              
                  <button type='submit' className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg sm:text-xl btnprise font-montserrat" onSubmit={handleSubmit} >
                    se connecter
                  </button>
              </form> 

              {/* <hr className="my-8" /> */}

              {/* <p className="mt-10">
                <Link
                  className="text-sm font-medium text-white hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p> */}
              
              <p className="mt-4">
                <NavLink
                  className="text-sm font-medium text-white hover:underline"
                  to="/create-account"
                >
                  Create account
                </NavLink>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
