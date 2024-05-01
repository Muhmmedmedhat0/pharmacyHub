// MedicineAlternative.js
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import StarsCustom from '../../Components/StarsCustom/StarsCustom';
import { Link } from 'react-router-dom';

const MedicineAlternative = ({ id, category }) => {
  const [alternativeMedicines, setAlternativeMedicines] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);

  };
  useEffect(() => {
    const fetchAlternativeMedicines = async () => {
      try {
        let activeIngredientId;

        // Check if the category is "Medicine" before fetching alternative medicines
        if (category === 'Medicine') {
          // Determine active ingredient ID based on the provided ID
          if (id === '1' || id === '13' || id === '23') {
            activeIngredientId = '2';
          } else if (id === '18' || id === '22' || id === '11') {
            activeIngredientId = '3';
          } else if (id === '9' || id === '6' || id === '8') {
            activeIngredientId = '1';
          } else if (id === '25') {
            activeIngredientId = '4';
          } else {
            return; // Don't fetch alternative medicines for other IDs
          }

          const response = await fetch(
            `http://e-pharmacy.runasp.net/api/product?CategoryId=1&ActiveIngredientId=${activeIngredientId}`,
          );
          if (!response.ok) {
            throw new Error('Failed to fetch alternative medicines');
          }
          const data = await response.json();
          setAlternativeMedicines(data.data);
        }
      } catch (error) {
        console.error('Error fetching alternative medicines:', error);
      }
    };

    fetchAlternativeMedicines();
  }, [id, category]);

  //
  const [userRating, setUserRating] = useState(0);

  return (
    <>
      {alternativeMedicines.length > 0 && (
        <Row>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#27b43e',
              marginBottom: '30px',
            }}>
            Alternative Medicines
          </h2>
          {alternativeMedicines.map((medicine) => (
            <Col key={medicine.id}>
              <Card style={{ height: '550px', width: '18rem' }} id="card-one">
                <div className="card-body">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '230px',
                    }}
                    className="icon">
                    {medicine.id === 25 ? (
                      <button
                        style={{
                          backgroundColor: '#ff0000',
                          color: '#ffffff',
                          padding: '8px',
                          border: 'none',
                          cursor: 'not-allowed',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="out"
                        disabled={true}>
                        Out of Stock
                      </button>
                    ) : null}
                    <FontAwesomeIcon icon={faCartPlus} className="iconCarts" />
                  </div>
                  <div className="img">
                    <img
                      whileHover={{ scale: 1.1 }}
                      src={medicine.pictureUrl}
                      alt="CaresImage"
                      className="cardImage"
                    />
                  </div>
                  <div className="divider"></div>
                  <h3>{medicine.name}</h3>

                  <div className="text">
                    <p className="text__one">{medicine.price} EGP</p>
                    <p className="text__two">
                      <span className="text__two__span">
                        {Math.ceil(medicine.price - medicine.price * 0.3)}{' '}
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
                  <div className="available__pharmacy flex items-center h-7 w-full">
                    {medicine.pharmacies?.map((pharmacy, index) => (
                      <span className="text-sm text-center" key={index}>
                        ⚕ {pharmacy}
                      </span>
                    ))}
                  </div>
                  <Link to={`/product/${medicine.id}`}>
                    <button
                      whileHover={{ scale: 1.1 }}
                      onClick={toggleDetails}
                      className="showDetails">
                      Show Details
                    </button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MedicineAlternative;
