import React, { useState, useEffect, useCallback } from 'react';
import Helmet from '../../Components/Helmet/Helmet';
import { Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, fetchCart } from '../../Redux/Slice/CartSlice';
import '../../css/Carts.css';
import ReactModal from 'react-modal';
import Stars from '../../Components/StarsCustom/StarsCustom';
import { Link } from 'react-router-dom';

const Carts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const deleteProduct = useCallback(
    async (id) => {
      await dispatch(removeItemFromCart(id));
      dispatch(fetchCart());
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, deleteProduct]);

  const isCartEmpty = cartItems?.length === 0;

  return (
    <Helmet title="Carts">
      <div className="container">
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginTop: '70px',
          }}>
          {cartItems?.length === 0 ? (
            <h2
              className="fs-4 text-center text-red-600"
              style={{
                height: isCartEmpty ? '50vh' : '',
              }}>
              No item added to the cart
            </h2>
          ) : (
            <>
              {cartItems.map((product) => (
                <Card
                  style={{
                    height: '520px',
                    width: '18rem',
                  }}
                  id="card-one"
                  key={product.id}>
                  <div className="card-body">
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        className="iconCarts"
                        onClick={() => deleteProduct(product.id)}
                      />
                    </div>
                    <div className="img">
                      <img
                        src={product.pictureUrl}
                        alt="CaresImage"
                        className="cardImage"
                      />
                    </div>
                    <div className="divider"></div>
                    <h3>{product.name}</h3>
                    <div className="text">
                      <p className="text__one">{product.price} EGP</p>
                    </div>
                    <div className="star">
                      <Stars
                        totalStars={5}
                        initialRating={userRating}
                        onChange={(rating) => setUserRating(rating)}
                      />
                    </div>
                    <h4 className="text__three">
                      Category: {product.category}
                    </h4>
                    <div className="flex items-center justify-center mt-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </Row>
        <Row>
          <div id="order">
            <div className="flex w-full">
              {cartItems.length === 0 ? null : (
                <>
                  <button className="buy__btn inline-block w-3/6 mx-auto">
                    <Link to="/billing">Complete Order</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </Row>
      </div>
    </Helmet>
  );
};

export default Carts;
