import React from 'react'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/creatAccount.jpg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'


function Login() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl bg-cadre1">
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
              <h1 className="mb-10 text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
                Inscription
              </h1>
              <Label>
                <span>Email</span>
                <Input className="px-4 py-3 mt-1" type="email" placeholder="john@doe.com" />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input className="px-4 py-3 mt-1" placeholder="***************" type="password" />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input className="px-4 py-3 mt-1" placeholder="***************" type="password" />
              </Label>

              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>


              <NavLink to="/login">
                <button className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg sm:text-xl btnprise font-montserrat">
                  S'incrire
                </button>
              </NavLink>

              {/* <hr className="my-8" /> */}


              <p className="mt-4">
                <NavLink
                  className="text-sm font-medium text-white"
                  to="/login"
                >
                  Already have an account? Login
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
