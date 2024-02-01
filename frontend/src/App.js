import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Signin from './components/signin';
import SignUp from './components/signup';
import Images from './components/images';

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthRoute = location.pathname === '/sign-in' || location.pathname === '/sign-up' || location.pathname === '/';
  const handleLogout = () => {
    navigate('/sign-in');
  }

  const { isAuthenticated } = useAuth();

  return (
    <div className={`App ${isAuthRoute ? 'auth-wrapper' : ''}`}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'}>
            Image Drive Pro
          </Link>
        </div>
        {isAuthenticated && !isAuthRoute && (
          <div style={{ marginRight: "20px" }}>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>)}
      </nav>

      <div className={isAuthRoute ? 'auth-inner' : ''}>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/images" element={<Images />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;
