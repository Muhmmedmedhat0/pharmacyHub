import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import StarsCustom from '../../Components/StarsCustom/StarsCustom';
import { Link } from 'react-router-dom';

const MedicineSimilar = ({ id, category }) => {
  const [similarMedicines, setSimilarMedicines] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);

  };

  useEffect(() => {
    const fetchSimilarMedicines = async () => {
      try {
        let diseaseId;

        // Check if the category is "Medicine" before fetching similar medicines
        if (category === 'Medicine') {
          // Determine disease ID based on the provided ID
          if (id === '1' || id === '13' || id === '23') {
            diseaseId = '2';
          } else if (id === '18' || id === '22' || id === '11') {
            diseaseId = '3';
          } else if (id === '9' || id === '6' || id === '8') {
            diseaseId = '1';
          } else if (id === '25') {
            diseaseId = '4';
          } else {
            return; // Don't fetch similar medicines for other IDs
          }

          const response = await fetch(
            `http://e-pharmacy.runasp.net/api/product?CategoryId=1&DiseaseId=${diseaseId}`,
          );
          if (!response.ok) {
            throw new Error('Failed to fetch similar medicines');
          }
          const data = await response.json();
          setSimilarMedicines(data.data);
        }
      } catch (error) {
        console.error('Error fetching similar medicines:', error);
      }
    };

    fetchSimilarMedicines();
  }, [id, category]);

  //
  const [userRating, setUserRating] = useState(0);

  return (
    <>
      {similarMedicines.length > 0 && (
        <Row>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#27b43e',
              marginBottom: '30px',
            }}>
            Similar Medicines
          </h2>
          {similarMedicines.map((medicine) => (
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

export default MedicineSimilar;
