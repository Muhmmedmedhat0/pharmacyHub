import React, { useState } from 'react';
import { Row, Col, Form, FormGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sign = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        'http://e-pharmacy.runasp.net/api/Account/Register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
            repeatPassword: retypePassword,
            phoneNumber: phoneNumber,
          }),
        },
      );

      if (response.ok) {
        toast.success('Signed up successfully');
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log(errorData[0].description);
        toast.error(errorData[0].description);
        setLoading(false);
      }
    } catch (error) {
      toast.error('An error occurred while signing up');
      setLoading(false);
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
                  style={{
                    marginBottom: '10px',
                    width: '100%',
                    paddingLeft: '20px',
                  }}
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  style={{
                    marginBottom: '10px',
                    width: '100%',
                    paddingLeft: '20px',
                  }}
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  style={{
                    marginBottom: '10px',
                    width: '100%',
                    paddingLeft: '20px',
                  }}
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  style={{
                    marginBottom: '10px',
                    width: '100%',
                    paddingLeft: '20px',
                  }}
                  type="password"
                  placeholder="Retype Your Password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  style={{
                    marginBottom: '10px',
                    width: '100%',
                    paddingLeft: '20px',
                  }}
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
