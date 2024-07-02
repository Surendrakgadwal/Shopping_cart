import './App.css'
import Login from '../component/Login'
import Cart from '../component/Cart'
import ProductList from '../component/ProductList'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [pid, setPid] = useState(() => {
    const savedPid = localStorage.getItem('p_id');
    return savedPid ? JSON.parse(savedPid) : [];
  });

  const [userDetails, setUserDetails] = useState('')
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserDetails={setUserDetails}/>} />
        <Route path="/login" element={<Login setUserDetails={setUserDetails}/>} />
        <Route path="/productlist" element={<ProductList pid={pid} setPid={setPid} userDetails={userDetails}/>} />
        <Route path="/cart" element={<Cart pid={pid} userDetails={userDetails}/>} />
      </Routes>
      
    </Router> 
  )
}

export default App
