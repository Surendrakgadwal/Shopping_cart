import React, { useState,useEffect } from 'react'
import ProductCard from './ProductCard'
import Header from './Header'
import Loading from "./Loading";

const ProductList = ({ pid, setPid, userDetails }) => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
        const data = await res.json();
        setRowData((prev) => [...prev, ...data.products]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);

  return (
    <>
      <Header count={pid.length} userDetails={userDetails} />
      <div className="countries-container">
        {rowData.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.thumbnail}
            id={product.id}
            setPid={setPid}
            pid={pid}
          />
        ))}
        {loading && <Loading />}
      </div>
    </>
  );
};

export default ProductList
