import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './Header.css';
import { logo } from '../../Assets/img/index'; // Importing logo image
import userIcon from '../../Assets/img/user-icon-1024x1024-dtzturco.png'; // Importing user icon image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { useSelector } from 'react-redux'; // Importing useSelector hook from Redux
import HeaderBottom from './HeaderBottom'; // Importing HeaderBottom component
import { nav__link, nav__mobile__link } from '../../data/navData'; // Importing navigation data
import { motion } from 'framer-motion'; // Importing motion for animations
import { signOut } from 'firebase/auth'; // Importing signOut function from firebase auth
import { auth } from '../../Firebase.config'; // Importing firebase auth configuration
import { toast } from 'react-toastify'; // Importing toast notification library
import CircleIndicator from '../CircleIndicator/CircleIndicator'; // Importing CircleIndicator component

// import NavLink from 'react-bootstrap/NavLink';
import { getCookie, deleteCookie } from '../../Routers/ProtectedRoute';

const Header = () => {
  const navigate = useNavigate(); // Initializing navigate function for programmatic navigation

  const currentUser = getCookie('id');
  const [clicked, setClicked] = useState(false); // State for mobile navigation menu

  const totalItems = useSelector((state) => state.cart.cart.totalItems);

  // Function to handle user logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        deleteCookie('id'); // Remove 'id' cookie
        toast.success('Logged out successfully');
        navigate('/home');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Function to handle click event for mobile navigation menu
  const handleClick = () => {
    setClicked(!clicked); // Toggling mobile navigation menu
  };

  return (
    <>
      {/* Progress Indicator */}
      <CircleIndicator />

      {/* Start of header for big and medium screens */}
      <header className="main-header">
        <div className="header-content">
          <div className="left">
            {/* Logo */}
            <NavLink to="/home">
              <motion.img
                whileTap={{ scale: 1.1 }}
                className="logo"
                src={logo}
                alt="logo"
              />
            </NavLink>
          </div>

          <div className="user">
            <div className="right">
              {/* Navigation Links */}
              <ul>
                {nav__link.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'nav__active' : ''
                      }>
                      <FontAwesomeIcon
                        icon={item.imgNav}
                        className="iconCarts"
                      />
                      {item.display}
                      {item.path === 'carts' && (
                        <span className="badge">{totalItems}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* User Actions */}
            {currentUser ? (
              <div className="user__actions">
                <div className="actions">
                  <span
                    onClick={() => {
                      logout();
                    }}>
                    logout
                  </span>
                </div>
                {/* User Details */}
                <div className="user_details">
                  <img
                    src={
                      currentUser && currentUser.photoURL
                        ? currentUser.photoURL
                        : userIcon
                    }
                    alt="userIcon"
                    className="user__image"
                  />
                  <p>{currentUser.displayName}</p>
                </div>
              </div>
            ) : (
              <div className="user__actions">
                <div className="actions">
                  <Link to="/signUp">Register</Link>
                  <div className="px-1 font-bold">/</div>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div id="open" onClick={handleClick}>
            <i
              id="bar"
              className={clicked ? 'bx bxs-x-circle' : 'bx bx-menu'}></i>
          </div>
        </div>
      </header>
      {/* End of header for big and medium screens */}

      {/* HeaderBottom Component */}
      <HeaderBottom />

      {/* Mobile Navigation */}
      <div id="mobile-nav" className={clicked ? 'active' : ''}>
        <ul>
          <div className="user-mobile">
            {/* User Image */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              className="userImage">
              <img
                src={
                  currentUser && currentUser.photoURL
                    ? currentUser.photoURL
                    : userIcon
                }
                alt="userIcon"
              />
              <p
                style={{
                  paddingTop: '15px',
                  color: '#f8f8f8',
                }}>
                {currentUser ? currentUser.displayName : 'Guest'}
              </p>{' '}
            </div>
            {/* User Actions */}
            {currentUser ? (
              <div className="user__actions">
                <span onClick={logout}>Logout</span>
                <i></i>
                {/* Displaying user's display name */}
              </div>
            ) : (
              <div className="user__actions">
                <Link to="/signUp">Register</Link>
                <div className="px-1 font-bold">/</div>
                <Link to="/login">Login</Link>
                <div>{/* Links for sign up and login here */}</div>
              </div>
            )}
          </div>
          {/* Rendering Navigation Links */}
          {nav__link.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>
                <FontAwesomeIcon icon={item.imgNav} className="iconCarts" />
                {item.display}
                {item.path === 'carts' && (
                  <span className="badge">{totalItems}</span>
                )}
              </NavLink>
            </li>
          ))}
          {/* Rendering additional mobile-only navigation links */}
          {nav__mobile__link.map((item) => (
            <li key={item.paths}>
              <NavLink to={item.paths}>
                <FontAwesomeIcon icon={item.iconImg} className="iconCarts" />
                {item.displayText}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* End of Mobile Navigation */}
    </>
  );
};

export default Header;
