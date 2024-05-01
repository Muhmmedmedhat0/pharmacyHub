import React, { useState } from 'react';
import Helmet from '../../Components/Helmet/Helmet';
// import Search from '../../Components/Search/Search';
import { Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faTimes } from '@fortawesome/free-solid-svg-icons'; // Corrected import
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../../Redux/Slice/CartSlice';
// import UseAuth from "../../Custom-hooks/UseAuth";
// import LogIn from "../../Pages/LogIn/LogIn";
import '../../css/Carts.css';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import Stars from '../../Components/StarsCustom/StarsCustom'; // Assuming 'Stars' component is imported from this path

const Carts = () => {
  const dispatch = useDispatch();
  // const currentUser = UseAuth();
  const cartItem = useSelector((state) => state.cart.cartItem);
  // const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const deleteProduct = (id) => {
    dispatch(deleteItem(id));
  };

  // if (!currentUser) {
  //   return (
  //     <div className="container">
  //       <LogIn />
  //     </div>
  //   );
  // }

  const isCartEmpty = cartItem.length === 0;

  const handleCompleteOrder = () => {
    if (isCartEmpty) {
      setIsModalOpen(true); // Open the React Modal
    } else {
      // Proceed to billing page
    }
  };
  const toggleDetails = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Helmet title="Carts">
      <div className="container">
        {/* <Search /> */}

        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginTop: '70px',
          }}>
          {cartItem.length === 0 ? (
            <h2
              className='fs-4 text-center text-red-600'
              style={{
                height: isCartEmpty ? '50vh' : '',
              }}>
              No item added to the cart
            </h2>
          ) : (
            <>
              {cartItem.map((item) => (
                <Card
                  style={{
                    height: '560px',
                    width: '18rem',
                  }}
                  id="card-one">
                  <div className="card-body">
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        className="iconCarts"
                        onClick={() => deleteProduct(item.id)}
                      />
                    </div>
                    <div className="img">
                      <img
                        whileHover={{ scale: 1.1 }}
                        src={item.image}
                        alt="CaresImage"
                        className="cardImage"
                      />
                    </div>
                    <div className="divider"></div>
                    <h3>{item.productName}</h3>

                    <div className="text">
                      <p className="text__one">{item.prices} EGP</p>
                      <p className="text__two">
                        <span className="text__two__span">
                          {item.prices - item.prices * 0.3} <del>30%</del>
                        </span>
                      </p>
                    </div>

                    <div className="star">
                      <Stars
                        totalStars={5}
                        initialRating={userRating}
                        onChange={(rating) => setUserRating(rating)}
                      />
                    </div>
                    <h4 className="text__three">Available in:</h4>
                    <div className="available__pharmacy h-7 w-full">
                      {item.pharmacy?.map((pharmacy, index) => (
                        <span className="text-sm text-center" key={index}>
                          ⚕ {pharmacy}
                        </span>
                      ))}
                    </div>
                    {/* Add the button to toggle details */}
                    <Link to={`/product/${item.id}`}>
                      {' '}
                      {/* Changed from `props.id` to `item.id` */}
                      <button
                        whileHover={{ scale: 1.1 }}
                        className="showDetails"
                        onClick={toggleDetails}>
                        Show Details
                      </button>
                    </Link>
                  </div>
                </Card>
              ))}
            </>
          )}
        </Row>
        <Row>
          <div id="order">
            {/* <div>
              <h5>
                Subtotal: <span>{totalAmount} £</span>
              </h5>
            </div> */}
            <div className="flex w-full">
              {cartItem.length === 0 ? null : (
                <>
                  <button
                    className="buy__btn inline-block w-3/6 mx-auto"
                    onClick={handleCompleteOrder}>
                    Complete Order
                  </button>
                </>
              )}
              {/* {isCartEmpty ? (
                <button className="buy__btn inline-block w-3/6 mx-auto" onClick={handleCompleteOrder}>
                  Complete Order
                </button>
              ) : (
                <button className="buy__btn inline-block w-3/6 mx-auto">
                  <Link to="/billing">Complete Order</Link>
                </button>
              )} */}
              <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Empty Cart Message"
                style={{
                  overlay: {
                    zIndex: 9999, // Higher z-index to make it above other elements
                  },
                  content: {
                    color: '#fff', // White color for text
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    padding: '20px',
                    backgroundColor: '#13a03bd6', // Dark background color for modal
                    borderRadius: '8px',
                    textAlign: 'center',
                  },
                }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                  }}>
                  <button
                    style={{
                      background: 'black',
                      width: '30px',
                      height: '30px',
                      color: '#fff',
                      borderRadius: '50%',
                      border: '1px solid black',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="close-button"
                    onClick={() => setIsModalOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <h3 className="mt-5 ">Please add products to continue.</h3>
              </ReactModal>
            </div>
          </div>
        </Row>
      </div>
    </Helmet>
  );
};

export default Carts;
