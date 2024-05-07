import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from '../../Components/Menu';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { updateUser } from '../../Redux/Slice/user';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateUser({
          name,
          email,
          phoneNumber,
          street,
          city,
        }),
      );

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error[0]);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          <Menu />
        </Col>
        <Col md={10} className="mb-12">
          <div id="profile">
            <h2>Profile</h2>
            <Form onSubmit={handleUpdate}>
              <FormGroup className="form__groups">
                <Form.Label htmlFor="name" className="pb-0">
                  Your Name*
                </Form.Label>
                <input
                  placeholder={userInfo?.name || 'Name'}
                  name="name"
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="form__groups">
                <Form.Label htmlFor="email" className="pb-0">
                  Email*
                </Form.Label>
                <input
                  placeholder={userInfo?.email || 'Email'}
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <Form.Label htmlFor="phoneNumber" className="pb-0">
                  Phone Number*
                </Form.Label>
                <input
                  placeholder={userInfo?.phoneNumber || 'Phone Number'}
                  className="form-control"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="form__groups">
                <Form.Label htmlFor="street" className="pb-0">
                  Street*
                </Form.Label>
                <input
                  placeholder={userInfo?.street || 'Street'}
                  className="form-control"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="form__groups">
                <Form.Label htmlFor="city" className="pb-0">
                  City*
                </Form.Label>
                <input
                  placeholder={userInfo?.city || 'City'}
                  className="form-control"
                  value={city}
                  type="text"
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </FormGroup>

              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
