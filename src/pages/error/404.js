import React from 'react'

import { ForbiddenIcon } from '../../icons'
import { NavLink } from 'react-router-dom'

function Page404() {
  return (
    <div className="flex flex-col items-center">
      <ForbiddenIcon className="w-12 h-12 mt-8 text-purple-200" aria-hidden="true" />
      <h1 className="text-6xl font-semibold text-gray-200">404</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Page not found. Check the address or{' '}
        <NavLink to="/app" className="text-purple-600 hover:underline dark:text-purple-300">
          go back
        </NavLink>
          
      </p>
    </div>
  )
}

export default Page404
