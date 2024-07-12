import React, { useState, useEffect } from 'react';

const ProductCard = ({ title, price, description, image, id, pid, setPid }) => {
  const [inCart, setInCart] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Check if the product is already in the cart
    const isInCart = pid.some(product => product.id === id);
    setInCart(isInCart);
  }, [pid, id]);

  const toggleProductInCart = (id, title, image, price) => {
    if (inCart) {
      // Remove product from cart
      setPid((prevPid) => {
        const updatedPid = prevPid.filter(product => product.id !== id);
        localStorage.setItem('p_id', JSON.stringify(updatedPid)); // Update localStorage
       // setCartCount(updatedPid.length); // Update cart count
        return updatedPid;
      });
      setNotification('Product removed from cart');
    } else {
      // Add product to cart
      const newProduct = { id, title, image, price };
      setPid((prevPid) => {
        const updatedPid = [...prevPid, newProduct];
        localStorage.setItem('p_id', JSON.stringify(updatedPid)); // Update localStorage
        //setCartCount(updatedPid.length); // Update cart count
        return updatedPid;
      });
      setNotification('Product added to cart');
    }
    setTimeout(() => setNotification(''), 2000); // Reset notification after 2 seconds
  };

  return (
    <div className="country-card">
      {notification && <div className="notification">{notification}</div>}
      <span> {price} </span>
      <img src={image} alt={`${title} Flag`} />
      <div className="card-text">
        <h4 className="card-title text-1">{title}</h4>
        <p className="text-3">
          {description}
        </p>
        <input
          type="submit"
          value={inCart ? "Remove from cart" : "Add to cart"}
          onClick={() => toggleProductInCart(id, title, image, price)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
