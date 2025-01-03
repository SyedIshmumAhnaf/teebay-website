import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, DELETE_PRODUCT } from '../apollo/mutations';
import ProductCard from '../pages/ProductCard';
import { jwtDecode } from 'jwt-decode';
import '../styles/ProductList.css';

const ProductListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const productsPerPage = 6;

  const token = localStorage.getItem('token');
  const currentUserId = token ? jwtDecode(token).userId : null;

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      skip: (currentPage - 1) * productsPerPage,
      take: productsPerPage,
      userId: currentUserId,
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct({ variables: { id: selectedProductId } });
      setShowModal(false);
      setSelectedProductId(null);
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  const totalPages = data?.products ? Math.ceil(data?.products?.length / productsPerPage) : 1;

  return (
    <div className="product-list">
      <h2>My Products</h2>
      <div className="product-grid">
        {data &&
          data.products &&
          data.products.map((product) => (
            <div key={product.id} className="product-item">
              <ProductCard 
                product={product} 
                onDelete={(id) => handleDeleteClick(id)} 
              />
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

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this product?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Yes
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
