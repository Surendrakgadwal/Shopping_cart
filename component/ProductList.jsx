import React, { useState,useEffect } from 'react'
import ProductCard from './ProductCard'
import Header from './Header'
import Loading from "./Loading";


const ProductList = ({pid,setPid,userDetails}) => {

  let [rowData ,setRowData] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(`https://dummyjson.com/products?limit=10&_page=${page}`)
    .then((res)=> res.json())
     .then((data)=>{
       //setRowData(data.products)
       setRowData((prev) => [...prev, ...data.products]);
       setLoading(false);
     })
  },[page])


  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>
         <Header count={pid.length} userDetails={userDetails}/>
        <div className="countries-container">
            {
            
            rowData.map((product)=>{
                return (
                    <ProductCard 
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    image={product.thumbnail}
                    id={product.id} 
                    setPid={setPid}
                    />
                )
            })
            }
             {loading && <Loading />}
        </div> 
    </>
  )
   
}

export default ProductList
