import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from '../../Components/Menu';

const Order = () => {
  return (
    <Container>
      <Row>
        <Col md={2}>
          <Menu />
        </Col>
        <Col md={10} className='mb-12'>
          <div id="orders">
            <h2>My Orders</h2>
            {/* Display orders */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
