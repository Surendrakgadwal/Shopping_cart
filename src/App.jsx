// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../component/Login';
import Cart from '../component/Cart';
import ProductList from '../component/ProductList';
import PrivateRoute from '../component/PrivateRoute';

function App() {
  const [pid, setPid] = useState(() => {
    const savedPid = localStorage.getItem('p_id');
    return savedPid ? JSON.parse(savedPid) : [];
  });

  const [userDetails, setUserDetails] = useState('');
  
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserDetails={setUserDetails} setAuthenticated={setAuthenticated} />} />
        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}><ProductList pid={pid} setPid={setPid} userDetails={userDetails} /></PrivateRoute>} />
        <Route path="/productlist" element={<PrivateRoute isAuthenticated={isAuthenticated}><ProductList pid={pid} setPid={setPid} userDetails={userDetails} /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute isAuthenticated={isAuthenticated}><Cart pid={pid} userDetails={userDetails} /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
