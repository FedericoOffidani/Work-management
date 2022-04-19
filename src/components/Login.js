import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

import axiosInstance from "../api/client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      await axiosInstance
        .post("/user/api/v1/authenticate", {
          username,
          password,
        })
        .then((res) => {
          const token = res?.data.contentData.jwtToken;
          setUsername("");
          setPassword("");
          setRememberMe(false);
          dispatch(login({ token: token, rememberMe: rememberMe }));
          navigate(state?.path || "/dashboard");
        })
        .catch((error) => {
          let errorStatus = error.response.status;
          if (errorStatus === 401) {
            setError("Unauthorized");
          }
        });
    } else if (username === "" && password === "") {
      setError("Fields cannot be blank");
    } else if (username === "") {
      setError("Username missing");
    } else if (password === "") {
      setError("Password missing");
    }
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        style={{
          display: error ? "" : "none",
        }}
      >
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  };

  return (
    <Container>
      {/* Login Form */}
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Calling to the methods */}

        <div>{errorMessage()}</div>
        <Form.Group className="mb-3" controlId="username">
          {/* username */}
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Group>
        {/* Password */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="remeberMe">
          {/* Remember me */}
          <Form.Check
            className="me-2"
            type="checkbox"
            name="remeberMe"
            value={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <Form.Label>Remember me</Form.Label>
        </Form.Group>
        {/* Login Button */}
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
