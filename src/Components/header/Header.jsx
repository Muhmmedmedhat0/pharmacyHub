import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './Header.css';
import { logo } from '../../Assets/img/index';
import userIcon from '../../Assets/img/user-icon-1024x1024-dtzturco.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import HeaderBottom from './HeaderBottom';
import { nav__link, nav__mobile__link } from '../../data/navData';
import { toast } from 'react-toastify';
import CircleIndicator from '../CircleIndicator/CircleIndicator';
import { getCookie, deleteCookie } from '../../Routers/ProtectedRoute';

const Header = () => {
  const navigate = useNavigate();
  const currentUser = getCookie('id');
  const [clicked, setClicked] = useState(false);

  // Subscribe to totalItems state
  const totalItems = useSelector((state) => state.cart.cart.totalItems);

  const logout = () => {
    deleteCookie('id');
    toast.success('Logged out successfully');
    navigate('/home');
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <CircleIndicator />
      <header className="main-header">
        <div className="header-content">
          <div className="left">
            <NavLink to="/home">
              <img
                whileTap={{ scale: 1.1 }}
                className="logo"
                src={logo}
                alt="logo"
              />
            </NavLink>
          </div>

          <div className="user">
            <div className="right">
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
            {currentUser ? (
              <div className="user__actions">
                <div className="actions">
                  <span onClick={logout}>logout</span>
                </div>
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
          <div id="open" onClick={handleClick}>
            <i
              id="bar"
              className={clicked ? 'bx bxs-x-circle' : 'bx bx-menu'}></i>
          </div>
        </div>
      </header>
      <HeaderBottom />
      <div id="mobile-nav" className={clicked ? 'active' : ''}>
        <ul>
          <div className="user-mobile">
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
            {currentUser ? (
              <div className="user__actions">
                <span onClick={logout}>Logout</span>
              </div>
            ) : (
              <div className="user__actions">
                <Link to="/signUp">Register</Link>
                <div className="px-1 font-bold">/</div>
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
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
    </>
  );
};

export default Header;
