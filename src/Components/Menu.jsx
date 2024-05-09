import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-2 p-2 my-20 bg-white rounded-md">
      <Link
        to="/profile"
        className={`p-2 rounded-l-md rounded-r-md text-black ${
          pathname === '/profile' ? 'bg-[#5b9b6e] text-white' : ''
        }`}>
        Profile
      </Link>
      <Link
        to="/change-password"
        className={`p-2 rounded-l-md rounded-r-md text-black ${
          pathname === '/change-password' ? 'bg-[#5b9b6e] text-white' : ''
        }`}>
        Change Password
      </Link>
    </nav>
  );
};

export default Menu;
// className="bg-[#5b9b6e]"