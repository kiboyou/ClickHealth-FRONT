import React, { useState } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'


import ImageLight from '../../assets/img/update.jpg'
import ImageDark from '../../assets/img/update.jpg'
import { Label, Input, Button } from '@windmill/react-ui'

function ForgotPassword() {

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('forgot password');
  }
  
  return (
    <div className="flex items-center min-h-screen p-6 bg-cadre">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl bg-cadre1">
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
                <h1 className="mb-10 text-2xl font-semibold text-center text-gray-200">renitialiser le mot de passe</h1>
                
                <Label>
                  <span className="text-gray-200">Email</span>
                  <Input className="px-4 py-3 mt-1  border-0 focus:ring-0" type="email" placeholder="kiboyou@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </Label>
             
                  <button type='submit' className="w-full px-4 py-2 mt-6 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat" onSubmit={handleSubmit} >
                    Envoyer
                  </button>
              </form> 
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
