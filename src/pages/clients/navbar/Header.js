import React from "react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

// import Button from "./common/Button";
// import arrowRight from "/assets/icons/arrow-right.svg";

function Header() {
  return (
    <section
      id='section1'
      className='flex w-full h-screen'
    >
     <div className='flex flex-col items-center justify-center w-full'>
  <h1 className='mt-10 font-bold font-palanquin'>
    <span className='flex text-2xl center text- color-Banane xl:whitespace-nowrap md:xl:text-4xl xl:text-6xl'>
      Bienvenue sur Click Santé !
    </span>
  </h1>
  <p className='w-full p-4 mt-6 mb-10 text-sm leading-6 tracking-wide text-center text-white lg:w-2/3 sm:text-xl lg:text-1xl sm:leading-8 sm:tracking-widest font-montserrat text-slate-gray sm:mb-14'>
    Réservez votre consultation en quelques clics et donnez-vous l'opportunité d'améliorer votre bien-être. Que ce soit pour un bilan de santé, des conseils personnalisés ou un suivi, nous sommes à votre disposition pour répondre à vos besoins.
  </p>
  <div className='flex flex-col items-center gap-6 mt-10 sm:flex-row sm:gap-20 sm:mt-20'>
        <NavLink to="/rendez_vous" className="flex justify-end mb-10">
          <button className="px-6 py-3 text-lg font-bold bg-white rounded-lg sm:text-2xl btnprise font-montserrat focus:outline-none focus:border-none">
            Prendre un rendez-vous
          </button>
        </NavLink>

        <NavLink to="/login" className="flex justify-end mb-10">
          <button className="px-6 py-3 text-lg font-bold bg-white rounded-lg sm:text-2xl font-montserrat btnConn focus:outline-none focus:border-none">
            Se connecter
          </button>
        </NavLink>
    
  </div>
</div>


    </section>
  )
}

export default Header