import React from 'react';
import { Container, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Helmet from '../../Components/Helmet/Helmet';
import './Orders.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Summery from './Summery';

const Orders = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Helmet title="Billing">
      <Container>
        <Row className=" justify-center">
          <Col lg="8" sm="12" className="px-4">
            <h6>Billing Information</h6>

            <Form className="billing__form !mt-0">
              <div className="flex items-center justify-end">
                <Link to="/profile" className="capitalize">
                  want to Change Address ?
                </Link>
              </div>
              <FormGroup className="form__group">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  disabled
                  value={userInfo.name || 'please update your name'}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  disabled
                  value={userInfo.email}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <input
                  type="number"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  disabled
                  value={
                    userInfo.phoneNumber || 'please update your phone number'
                  }
                />
              </FormGroup>
              <FormGroup className="form__group">
                <input
                  type="text"
                  placeholder="Street address"
                  name="address"
                  disabled
                  value={userInfo.street || 'please update your street address'}
                />
              </FormGroup>
              <FormGroup className="form__group mb-10">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  disabled
                  value={userInfo.city || 'please update your city'}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col md={4}>
            <Summery />
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Orders;
