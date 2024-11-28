import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import * as Icons from '../../icons'
import routesAdmin from '../../routes/sidebar'
import routesMedecin from '../../routes/sidebarMedecin'
import SidebarSubmenu from './SidebarSubmenu'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { logoutUser } from '../../Api/features/userAuth/authThunks'
import logoCH from "../../assets/img/LOGO - PD.png"
import Loading from '../../utils/Loading'
import routesReceptionniste from '../../routes/sidebarReceptionniste'
import routesPatient from '../../routes/sidebarPatient'


function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  
  const  navigate = useHistory().push;
  const dispatch = useDispatch();
  
  const [routes, setRoutes] = useState([])
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()); // Déconnexion
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Vérifiez si l'utilisateur a des groupes
      const userGroup = user?.groups[0]?.name || null;
  
      switch (userGroup) {
        case 'administrateur':
          setRoutes(routesAdmin);
          break;
        case 'medecin':
          setRoutes(routesMedecin);
          break;
        case 'patient':
          setRoutes(routesPatient);
          break;
        case 'receptionniste':
          setRoutes(routesReceptionniste);
          break;
        default:
          // Gérer le cas d'un groupe non reconnu ou non assigné
          console.warn("Groupe d'utilisateur non reconnu :", userGroup);
          // navigate('/login'); // Redirige vers une page par défaut ou une erreur
      }
    }
  }, [isAuthenticated, navigate, user]);
  
  
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      { loading && <Loading />}

      
      <div className='flex items-center justify-center'>
      <NavLink to='/client'>
          <img
            src={logoCH}
            alt='logo'
            width={140}
            height={40}
            className='w-[70px] h-[70px]  mx-auto'
          />
        </NavLink>
      </div>
      
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full mt-2 text-sm font-semibold transition-colors duration-150 focus:outline-none focus:border-none hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="bg-color-trait"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg bg-color-trait1"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5 focus:outline-none focus:border-none" aria-hidden="true" icon={route.icon} />
                <span className="ml-4 focus:outline-none focus:border-none">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
{/* 
      { 
        
        user ? (
        <>
        <div className="px-4 my-6">
          <button className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
          onClick={handleLogout}>
            Deconnexion
          </button>
        </div>
        </>
      ) : (
        <div className="px-4 my-6">
          <>username</>
        </div>
      )}       */}
      </div>
    )
}

export default SidebarContent
