import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./CardsDetails.scss";

const CardsDetails = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDataHandler();
  }, []);

  async function fetchDataHandler() {
    try {
      const response = await fetch(
        "http://e-pharmacy.runasp.net/api/Product/Categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  const handleClick = (id) => {
    if (id === 1) {
      navigate("/medicine");
    } else if (id === 2) {
      navigate("/vitamins");
    } else if (id === 3) {
      navigate("/equipments");
    } else if (id === 4) {
      navigate("/cares");
    } else {
      navigate("home");
    }
  };

  return (
    <Fragment>
      <Container className="mt-0">
        <Row>
          {categories.map((category, index) => (
            <Col lg="3" md="6" key={index} id="cards">
              <Card id="card-main" onClick={() => handleClick(category.id)} className="cursor-pointer">
                <Card.Body id="card-details">
                  <div >
                    <img src={category.pictureUrl} alt={category.name} />
                    <Link to={`/${category.id}`}>
                      <p
                        style={{
                          color: "#393636",
                          fontWeight: "bold",
                        }}
                      >
                        {category.name}
                      </p>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default CardsDetails;
