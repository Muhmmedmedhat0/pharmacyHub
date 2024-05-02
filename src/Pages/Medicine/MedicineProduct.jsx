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

const MedicineProduct = (product) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        pictureUrl: product.pictureUrl,
        category: product.category,
        price: product.price,
        quantity: product.quantityProduct,
      }),
    );
    toast.success('Product added Successfully');
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
              id="card-one">
              <div className="card-body">
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
                    {product.price - product.price * 0.3}{' '}
                      <del>30%</del>
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
                <h4 className="text__three">Available in:</h4>
                <div className="available__pharmacy h-7 w-full">
                  {product.pharmacies?.map((pharmacy, index) => (
                    <span key={index} className="text-sm text-center">
                      ⚕ {pharmacy}
                    </span>
                  ))}
                </div>
                {/* Add the button to toggle details */}
                {product.id === 25 ? (
                  <button
                    whileHover={{ scale: 1.1 }}
                    className="outOfStock"
                    disabled={true}>
                    Out of Stock
                  </button>
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
