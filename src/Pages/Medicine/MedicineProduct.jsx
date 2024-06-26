import React, { useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import '../../css/Cares.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../Redux/Slice/CartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarsCustom from '../../Components/StarsCustom/StarsCustom';
import { getCookie } from '../../Routers/ProtectedRoute';

const MedicineProduct = (product) => {
  const dispatch = useDispatch();
  const id = getCookie('id');

  const addToCart = async () => {
    try {
      await dispatch(
        addItemToCart({
          id: id,
          items: [
            {
              id: product.id,
              name: product.name,
              pictureUrl: product.pictureUrl,
              category: product.category,
              price: product.price,
              quantity: 1,
            },
          ],
        }),
      );

      toast.success('Product added Successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product');
    }
  };

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);
  };
  const [userRating, setUserRating] = useState(0);

  return (
    <div>
      <div className="container">
        <Row>
          <Col>
            <Card
              style={{
                height: '550px',
                width: '18rem',
              }}
              className={`${
                product.id === 25 && 'border border-red-500 bg-red-300'
              }`}
              id="card-one">
              <div
                className={`card-body ${
                  product.id === 25 && 'border border-red-500 bg-red-300'
                }`}>
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="iconCarts"
                    onClick={addToCart}
                  />
                </div>
                <div className="img">
                  <img
                    whileHover={{ scale: 1.1 }}
                    src={product.pictureUrl}
                    alt="CaresImage"
                    className="cardImage"
                  />
                </div>
                <div className="divider"></div>
                <h3>{product.name}</h3>

                <div className="text">
                  <p className="text__one">{product.price} EGP</p>
                  <p className="text__two">
                    <span className="text__two__span">
                      {product.price - product.price * 0.3} <del>30%</del>
                    </span>
                  </p>
                </div>

                <div className="star">
                  <StarsCustom
                    totalStars={5}
                    initialRating={userRating}
                    onChange={(rating) => setUserRating(rating)}
                  />
                </div>
                <h4
                  className={`text__three ${
                    product.id === 25 && '!text-red-500'
                  }`}>
                  {product.id === 25 ? 'Out of Stock' : 'Available in:'}
                </h4>

                {product.id !== 25 && (
                  <div className="available__pharmacy h-7 w-full">
                    {product.pharmacies?.map((pharmacy, index) => (
                      <span key={index} className="text-sm text-center">
                        ⚕ {pharmacy}
                      </span>
                    ))}
                  </div>
                )}

                {/* Add the button to toggle details */}
                {product.id === 25 ? (
                  <Link to={`/product/${product.id}`}>
                    <button
                      whileHover={{ scale: 1.1 }}
                      className="showDetails bg-red-500 border-red-500"
                      onClick={toggleDetails}>
                      Out of Stock
                    </button>
                  </Link>
                ) : (
                  <Link to={`/product/${product.id}`}>
                    <button
                      whileHover={{ scale: 1.1 }}
                      onClick={toggleDetails}
                      className="showDetails">
                      Show Details{' '}
                    </button>
                  </Link>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MedicineProduct;
