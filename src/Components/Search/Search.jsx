import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { Prescription, Upload } from '../../Assets/img/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../Redux/Slice/CartSlice';
import '../../css/Cares.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Search.css';
import StarsCustom from '../StarsCustom/StarsCustom';
import { Link } from 'react-router-dom';
import { getCookie } from '../../Routers/ProtectedRoute';

const Search = (props) => {
  const [userRating, setUserRating] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const id = getCookie('id');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataHandler = async () => {
      try {
        let apiUrl = 'https://e-pharmacy.runasp.net/api/product';
        if (searchQuery.trim() !== '') {
          apiUrl += `?search=${searchQuery}`;
        }
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        console.log('Response from API:', responseData); // Log raw response data
        const ProductData = responseData.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          pictureUrl: product.pictureUrl,
          category: product.category,
          pharmacies: product.pharmacies,
          quantity: product.quantity,
        }));
        setProducts(ProductData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataHandler();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    window.scrollTo(0, 0);
  };

  const addToCart = async (product) => {
    try {
      await dispatch(
        addItemToCart({
          id: id,
          items: [
            {
              id: product.id.toString(),
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

  return (
    <Container id="searchPage">
      <Row className="d-flex align-items-center justify-between">
        <Col sm="12" lg="9">
          <Form className="hh d-flex ">
            <Form.Control
              type="search"
              placeholder="Search for medicine & wellness products"
              id="searchBar"
              aria-label="Search"
              style={{ height: '50px' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>
        </Col>
        <Col className="custom mt-5">
          <div className="flex flex-col justify-center items-center">
            <img src={Prescription} alt="Prescription" width={50} height={50} />
            <p>By Prescription</p>
          </div>
        </Col>
        <Col className="custom mt-5">
          <div className="flex flex-col justify-center items-center">
            <img src={Upload} alt="Upload" width={50} height={50} />
            <p>Upload product</p>
          </div>
        </Col>
      </Row>

      {products.length > 0 && (
        <Row style={{ marginTop: '50px' }}>
          {products.map((product) => (
            <Col key={product.id} className="mb-4">
              <Card style={{ height: '550px', width: '18rem' }} id="card-one">
                <div className="card-body">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="iconCarts"
                      onClick={() => addToCart(product)}
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
                  <h4 className="text__three">Available in:</h4>
                  <div className="available__pharmacy flex items-center h-7 w-full">
                    {product.pharmacies?.map((pharmacy, index) => (
                      <span className="text-sm text-center" key={index}>
                        ⚕ {pharmacy}
                      </span>
                    ))}
                  </div>
                  <Link to={`/product/${product.id}`}>
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
    </Container>
  );
};

export default Search;
