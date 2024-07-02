
const ProductCard = ({title, price,description,image,id,setPid}) => {



  const addProduct = (id, title, image,price) => {
    
      const newProduct = { id, title, image,price };
      setPid((prevPid) => {
        const updatedPid = [...prevPid, newProduct];
        localStorage.setItem('p_id', JSON.stringify(updatedPid)); // Update localStorage
        return updatedPid;
      });
  };

  return (
  
    <a className="country-card" >
      <span> {price} </span>
        <img src={image} alt={title + ' Flag'} />
    <div className="card-text">
      <h4 className="card-title text-1">{title}</h4>
      <p className="text-3">
        {/* <b>Brief description: </b> */}
        {description}
      </p>
      <input type="submit" value="Add to cart" onClick={()=>addProduct(id,title,image,price)}></input>
    </div>
  </a>
  )
}

export default ProductCard
