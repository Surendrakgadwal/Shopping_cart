import React from 'react'
import Header from './Header'

const Cart = ({pid,userDetails}) => {
    let cartData = localStorage.getItem('p_id')
    let data = JSON.parse(cartData);
    console.log(data)
  return (
    <>
     <Header count={pid.length} userDetails={userDetails}/>
     {data ? data.map((product)=>{
        return(<div className="cart-item-container">
            <div className="cart-item">
              <img src={product.image} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <p>{} ★ ★ ★ ★</p>
              </div>
            </div>
            <div className="item-price">${product.price}</div>
           
            <div className="item-total">${product.price}</div>
          </div>)
            
        
     }):<h1 className='text-center'>Empty Cart</h1>}
     
    </>
  )
}

export default Cart



