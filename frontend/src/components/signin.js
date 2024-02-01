import React from 'react';


export default function Signin() {

    return (
        <form>
            <h3>Sign In</h3>
             <div className="alert alert-info"></div>

            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>

            <div className="d-grid">
                <button type="button" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="forgot-password text-right">
                Don't have an account? <a href="/sign-up">sign up</a>
            </p>
        </form>
    );
}
