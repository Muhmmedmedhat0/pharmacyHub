import React, { useState } from "react";
import Helmet from "../../Components/Helmet/Helmet";
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../Firebase.config";
import { toast } from "react-toastify";
import "../../css/LogIn.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const linkCheck = "/home"; // Corrected link value

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call your API endpoint to authenticate user
      const response = await fetch("http://e-pharmacy.runasp.net/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
console.log(data)
      // Set token in cookies
      document.cookie = `id=${data.id}`;

      // Display success toast
      toast.success("Logged in successfully");

      // Redirect to home page after successful login
      navigate(linkCheck);
    } catch (error) {
      setLoading(false);
      // Show error message if login fails
      toast.error("Failed to login");
    }
  };

  return (
    <Helmet title="LogIn">
      <div className="container">
        <Row style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Col lg="12" className="text-center">
            {loading ? (
              <h5 className="fw-bold">Loading.....</h5>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <Form className="auth__form" onSubmit={signIn}>
                  <h3 className="fw-bold">Login</h3>
                  <FormGroup className="form__groups">
                    <input
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        paddingLeft: "20px",
                      }}
                      type="email"
                      autoComplete="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__groups">
                    <input
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        paddingLeft: "20px",
                      }}
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <button type="submit" className="buy_btn auth_btn">
                    Login
                  </button>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signUp">Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Col>
        </Row>
      </div>
    </Helmet>
  );
};

export default LogIn;
