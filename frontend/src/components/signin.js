import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Axios from 'axios';

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const { setIsAuthenticated } = useAuth();

    const signin = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/sign-in', { email: email, password: password })
            .then((response) => {
                setIsAuthenticated(true);
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setResponseMessage(error.response.data.message);
                } else {
                    setResponseMessage("An error occurred. Please try again later.");
                }
            });
    };

    return (
        <form>
            <h3>Sign In</h3>
            {responseMessage && <div className="alert alert-info">{responseMessage}</div>}

            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="d-grid">
                <button type="button" className="btn btn-primary" onClick={signin}>
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                Don't have an account? <a href="/sign-up">sign up</a>
            </p>
        </form>
    );
}
