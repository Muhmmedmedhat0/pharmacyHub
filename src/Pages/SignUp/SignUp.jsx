import React, { useState } from 'react';
import { Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../Redux/Slice/user';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRetypePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sign = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        register({
          name,
          email,
          phoneNumber,
          street,
          city,
          password,
          repeatPassword,
        }),
      );

      toast.success('Signed up successfully');
      navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error(error[0]);
      navigate('/signUp');
    }
  };

  return (
    <div className="container">
      <Row style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {loading ? (
          <Col lg="12" className="text-center">
            <h5 className="fw-bold">Loading.....</h5>
          </Col>
        ) : (
          <Col lg="6" className="m-auto text-center">
            <Form className="auth__form" onSubmit={sign}>
              <h3 className="fw-bold">Register</h3>
              <FormGroup className="form__groups">
                <input
                name='name'
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  value={city}
                  type="text"
                  name="city"
                  placeholder="Enter city name"
                  autoComplete="username"
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // autoComplete="new-password" // add autoComplete attribute
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Retype Your Password"
                  value={repeatPassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  // autoComplete="new-password" // add autoComplete attribute
                />
              </FormGroup>
              <button
                type="submit"
                className="buy_btn auth_btn"
                disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
              <p>
                Already have an account? <Link to={'/login'}>Login</Link>
              </p>
            </Form>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SignUp;
