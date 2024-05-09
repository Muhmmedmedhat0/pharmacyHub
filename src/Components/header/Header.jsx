import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { logo } from '../../Assets/img/index';
import userIcon from '../../Assets/img/user-icon-1024x1024-dtzturco.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import HeaderBottom from './HeaderBottom';
import { toast } from 'react-toastify';
import CircleIndicator from '../CircleIndicator/CircleIndicator';
import { deleteCookie } from '../../Routers/ProtectedRoute';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faCartPlus, faHouse } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  // const currentUser = getCookie('id');

  // Subscribe to totalItems state
  const totalItems = useSelector((state) => state.cart.cart.totalItems);

  const logout = () => {
    deleteCookie('token');
    toast.success('Logged out successfully');
    navigate('/home');
    window.location.reload();
  };

  return (
    <>
      <CircleIndicator />
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-[#5b9b6e]">
          <Container fluid>
            <NavLink to="/home">
              <img
                whiletap={{ scale: 1.1 }}
                className="logo"
                src={logo}
                alt="logo"
              />
            </NavLink>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
              <Offcanvas.Header closeButton className="bg-[#5b9b6e]">
                <Link to="/home">
                  <img
                    whiletap={{ scale: 1.1 }}
                    className="logo"
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </Offcanvas.Header>
              <Offcanvas.Body className="bg-[#5b9b6e]">
                <Nav className="justify-content-end flex-grow-1 pe-3 items-center gap-5">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-gray-800 text-lg font-bold relative'
                        : 'text-white text-lg font-thin relative'
                    }>
                    Home
                    <FontAwesomeIcon
                      icon={faHouse}
                      className="text-white text-lg mx-1"
                    />
                  </NavLink>
                  <NavLink
                    to="/carts"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-gray-800 text-lg font-bold'
                        : 'text-white text-lg font-thin'
                    }>
                    Cart
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="text-white text-lg"
                    />
                    {totalItems > 0 && (
                      <>
                        <Badge bg="danger" className="absolute top-3">
                          {totalItems}
                        </Badge>
                      </>
                    )}
                  </NavLink>

                  {userInfo ? (
                    <>
                      <NavDropdown
                        className="text-white text-lg capitalize"
                        align="end"
                        title={userInfo?.name}
                        id={`offcanvasNavbarDropdown-expand-${expand}`}>
                        <div className="flex flex-col px-3 gap-2 text-white text-lg">
                          <NavLink to="/profile" className="text-whit">
                            Profile
                          </NavLink>
                          <NavLink to="/orders" className="text-whit">
                            Orders
                          </NavLink>
                        </div>

                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={logout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                      <div className="">
                        <img
                          src={
                            userInfo && userInfo?.photoURL
                              ? userInfo?.photoURL
                              : userIcon
                          }
                          alt="userIcon"
                          className="w-10 h-10 rounded-full overflow-hidden"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-2 text-white text-lg">
                        <NavLink
                          to="/signUp"
                          className={({ isActive }) =>
                            isActive
                              ? 'text-gray-800 text-lg font-bold'
                              : 'text-white text-lg font-thin'
                          }>
                          Register
                        </NavLink>
                        <span>/</span>
                        <NavLink
                          to="/login"
                          className={({ isActive }) =>
                            isActive
                              ? 'text-gray-800 text-lg font-bold'
                              : 'text-white text-lg font-thin'
                          }>
                          Login
                        </NavLink>
                      </div>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <HeaderBottom />
    </>
  );
};

export default Header;
