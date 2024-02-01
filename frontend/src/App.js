import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/signin';
import SignUp from './components/signup';
import ImageStorage from './components/images';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/sign-in');
  }
  return (
    <Router>
      <div className={'auth-wrapper'}>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Image Drive Pro
            </Link>
          </div>

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
          </div>
        </nav>

        <div className={'auth-inner'}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/images" element={<ImageStorage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
