import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/signin';
import SignUp from './components/signup';
import Images from './components/images';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/images" element={<Images />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
