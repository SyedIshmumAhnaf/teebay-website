import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/edit-product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <h3>{product.name}</h3>
      {product.user && <p><strong>Seller:</strong> {product.user.username}</p>}
      <p><strong>Categories:</strong> {product.categories.map((cat) => cat.name).join(', ')}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p>{product.description}</p>
      <p><strong>Created at:</strong> {new Date(parseInt(product.createdAt)).toLocaleString()}</p>
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigation on delete click
          onDelete(product.id);
        }}
      >
        🗑️
      </button>
    </div>
  );
};

export default ProductCard;
