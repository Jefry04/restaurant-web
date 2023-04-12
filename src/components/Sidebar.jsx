import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
  return (
    <div className="md:flex min-h-screen">
      <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
        <div className="p-6">
          <p className="text-white tracking-wide text-center font-bold">
            CARIBBEAN RESTAURANT
          </p>
          <p className="mt-3 text-gray-600">Adminsitra tu restaurante</p>
          <nav className="mt-5">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-500 p-1  hover:text-gray-900 block hover:bg-yellow-500'
                  : 'p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900'
              }
              to="/"
            >
              Ordenes
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-500 p-1  hover:text-gray-900 block hover:bg-yellow-500'
                  : 'p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900'
              }
              to="/menu"
            >
              Menu
            </NavLink>
          </nav>
        </div>
      </div>
      <div className="md:w-3/5 xl:w-4/5 p-6">{children}</div>
    </div>
  );
};

export default Sidebar;
