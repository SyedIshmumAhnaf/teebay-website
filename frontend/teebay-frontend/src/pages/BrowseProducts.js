import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_OTHER_PRODUCTS } from '../apollo/mutations';
import ProductCard from './ProductCard';
import { jwtDecode } from 'jwt-decode';
import '../styles/ProductList.css';

const BrowseProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Get the current user ID from the token
  const token = localStorage.getItem('token');
  const currentUserId = token ? jwtDecode(token).userId : null;

  const { loading, error, data } = useQuery(GET_OTHER_PRODUCTS, {
    variables: {
      skip: (currentPage - 1) * productsPerPage,
      take: productsPerPage,
      excludeCurrentUser: true, 
    },
  });
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  const totalPages = data?.products ? Math.ceil(data.products.length / productsPerPage) : 1;

  return (
    <div className="product-list">
      <h2>All Listings</h2>
      <div className="product-grid">
        {data &&
          data.products &&
          data.products.map((product) => (
            <div key={product.id} className="product-item">
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowseProducts;
