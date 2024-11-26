import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block mt-10 mb-10 text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 text-lg font-bold bg-white rounded-lg focus:outline-none focus:border-none sm:text-xl btnprise font-montserrat"
      >
        Ajouter un utilisateur <FaChevronDown className="ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 rounded-lg shadow-lg ">
          <NavLink
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
          </NavLink>          
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
