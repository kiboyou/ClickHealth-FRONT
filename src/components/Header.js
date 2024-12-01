import React, { useContext, useState } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import {
  MenuIcon,
} from '../icons';

import { FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Api/features/userAuth/authThunks';
import groupeUser from '../utils/GrourpeUser';


function Header() {
  
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { toggleSidebar } = useContext(SidebarContext)
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutUser()); // Déconnexion
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom bg-cadre1">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Profile menu --> */}
          <li className="relative cursor-pointer">
          {
            user ? (
              <div className="flex text-white" onClick={toggleDropdown}>
                <span className="font-bold">
                  {user.groups.length > 0 && (() => {
                    const groupName = user.groups[0].name;
                    if (groupName === groupeUser.patient) {
                      return groupeUser.patient;
                    } else if (groupName === groupeUser.medecin) {
                      return groupeUser.medecin;
                    } else if (groupName === groupeUser.receptionniste) {
                      return groupeUser.receptionniste;
                    } else if (groupName === groupeUser.administrateur) {
                      return "gestionnaire";
                    } else {
                      return 'Non spécifié';
                    }
                  })()}
                </span>
                <span className="ml-2">
                  - {user.first_name} {user.last_name}
                </span>
                <FaChevronDown className="ml-2" />
              </div>
            ) : (
              <div className="px-4 my-6">
                <span>Username</span>
              </div>
            )
          }

          {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 w-48 mt-2 rounded-lg shadow-lg ">
                
                  <button className="w-full px-4 py-2 mt-1 text-lg font-bold bg-white focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
                  onClick={handleLogout}>
                    Deconnexion
                  </button>
                
                {/* <NavLink
                  to="/app/configuration/user/add"
                  className="block px-4 py-2 text-gray-700 btnprise"
                  onClick={() => setIsOpen(false)}
                >
                  Administrateur
                </NavLink>

                <NavLink
                  to="/app/patients/add"
                  className="block px-4 py-2 text-gray-700 btnprise"
                  onClick={() => setIsOpen(false)}
                >
                  patient
                </NavLink>           */}
              </div>
            )}
            
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
