import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../Redux/Slice/user';
import Menu from '../../Components/Menu';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const sign = async (e) => {
    e.preventDefault();

    // Reset error message
    setError('');

    // Check if fields are filled
    if (!currentPassword || !newPassword) {
      setError('Please fill in all fields');
      return;
    }


    setLoading(true);
    try {
      // Perform your asynchronous action here, for example:
      await dispatch(changePassword({
        currentPassword, newPassword
      }));
      toast.success('Password changed successfully');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to change password');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          <Menu />
        </Col>
        <Col md={10} className="mb-12">
          <div id="change-password">
            <h2>Change Password</h2>
            <Form onSubmit={sign}>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter Your Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter Your New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormGroup>
              {error && <p className="error-message text-red-500">{error}</p>}
              <Button
                type="submit"
                className="buy_btn auth_btn"
                disabled={loading}
                variant="success">
                {loading ? 'Loading...' : 'Change Password'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
