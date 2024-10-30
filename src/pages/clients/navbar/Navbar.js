import React from "react";
// import hamburger from "/assets/icons/hamburger.svg";
import logoCH from "../../../assets/img/LOGOC.png";

// import { navLinks } from "../../../constants";
import { useState } from "react";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'


const Navbar = () => {
  
  let [open,setOpen]=useState(false);
  
  return (
    <header className='absolute z-10 w-full p-8 padding-x'>
      <nav className='flex items-center justify-between max-container'>
        <NavLink to='/client'>
          <img
            src={logoCH}
            alt='logo'
            width={140}
            height={40}
            className='m-0 w-[70px] h-[70px]'
          />
        </NavLink>
        {/* <ul className='flex items-center justify-center flex-1 gap-16 text-white max-lg:hidden '>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className='text-lg leading-normal font-montserrat text-slate-gray hover-nav'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul> */}
        <div className='flex gap-2 text-lg font-medium leading-normal text-white font-montserrat max-lg:hidden wide:mr-24'>
           {/* <Button label='Contactez-nous'  /> */}
        </div>
         
        
        <div onClick={()=>setOpen(!open)} className='hidden bg-white cursor-pointer max-lg:block'>
          <img src={''} alt='hamburger icon' width={35} height={35} />
        </div>
        

        <div
        className={`lg:hidden absolute p-10 top-04 left-0 w-full items-center h-screen bg-black z-50 duration-3000 ${
          open ? 'block' : 'hidden'
        }`}
        >
        {/* <ul className="flex flex-col items-center gap-8 text-white bg-black h-96">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-lg leading-normal font-montserrat text-slate-gray hover-nav"
                onClick={()=>setOpen(!open)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul> */}
        <div onClick={()=>setOpen(!open)} className="flex items-center justify-center text-lg font-medium leading-normal text-white font-montserrat">
          {/* <Button label='Contactez-nous'  /> */}
        </div>
      </div>
      </nav>
    </header>
  );
};

export default Navbar;
