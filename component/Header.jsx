import React from 'react'
import {Link} from 'react-router-dom'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom';


const Header = ({count,userDetails}) => {

  const navigate = useNavigate();

  return (
    <>
       <header className='header-container' >
        <div className="header-content">
          <h2 className="title">Hello {userDetails}</h2>
          <Link to='/Cart' element={<Cart count={count} userDetails={userDetails}/>}>Cart({count})</Link>
        </div>
      </header>
    </>
    
   
  )
}

export default Header
