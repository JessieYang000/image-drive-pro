import React, { useState} from 'react';
import { useAuth } from './AuthContext';
import Axios from 'axios';
import { useNavigate } from 'react-router';

export default function SignUp() {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth();

  const signup = (event) => {
    event.preventDefault();
    if (passwordReg !== confirmPasswordReg) {
      setResponseMessage("Passwords do not match. Please try again.");
      return;
    }
    Axios.post('http://localhost:3001/sign-up', { email: emailReg, password: passwordReg })
      .then((response) => {
        setResponseMessage(response.data.message);
        setIsAuthenticated(true);
        navigate('/images', { state: { email: emailReg } }); // Redirect on success
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          // Handle the specific error message from the server
          setResponseMessage(error.response.data.message);
        } else {
          // General error message for other cases
          setResponseMessage("An error occurred. Please try again later.");
        }
      });
  };


  return (
    <form onSubmit={signup}>
      <h3>Sign Up</h3>
      {responseMessage && <div className="alert alert-info">{responseMessage}</div>} {/* Display the response message */}

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmailReg(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPasswordReg(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setConfirmPasswordReg(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
}