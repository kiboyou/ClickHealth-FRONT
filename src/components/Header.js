import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {

  MenuIcon,

} from '../icons'

import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../Api/features/userAuth/authThunks';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Header() {

  const dispatch = useDispatch();
  const navigate = useHistory().push;
  
  const { user } = useSelector((state) => state.auth);
  
  const { toggleSidebar } = useContext(SidebarContext)


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(fetchCurrentUser());
  //   }
  // }, [isAuthenticated, navigate]);

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
          <li className="relative">
          {         
            user ? (
                <div className='text-white'>
                  Hello, <span className='text-bold'>{user.first_name} {user.last_name}</span>
                </div>
              ) : (
                <div className="px-4 my-6">
                  <>username</>
                </div>
              )
          }
            
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
