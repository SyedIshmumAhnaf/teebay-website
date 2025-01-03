import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT, UPDATE_PRODUCT } from '../apollo/mutations';
import '../styles/EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rent: '',
    rentType: 'per hr',
    categoryIds: [],
  });

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  const [updateProduct, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PRODUCT, {
      onCompleted: () => navigate('/all-products'),
    });

  useEffect(() => {
    if (data && data.product) {
      const product = data.product;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        rent: product.rent || '',
        rentType: product.rentType || 'per hr',
        categoryIds: product.categories.map((category) => category.id.toString()),
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categoryIds: checked
        ? [...prev.categoryIds, value]
        : prev.categoryIds.filter((id) => id !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        variables: {
          id: parseInt(id),
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          categoryIds: formData.categoryIds.map(Number),
          rent: formData.rent ? parseFloat(formData.rent) : null,
          rentType: formData.rentType,
        },
      });
    } catch (err) {
      console.error('Error updating product:', err.message);
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error fetching product: {error.message}</p>;

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Categories</label>
        <div className="category-checkboxes">
          {data.categories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                value={category.id}
                checked={formData.categoryIds.includes(category.id.toString())}
                onChange={handleCategoryChange}
              />
              {category.name}
            </label>
          ))}
        </div>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />


        <label>Rent</label>
        <div className="rent-group">
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
          />
          <select
            name="rentType"
            value={formData.rentType}
            onChange={handleChange}
          >
            <option value="per hr">per hr</option>
            <option value="per day">per day</option>
          </select>
        </div>

        <button type="submit" disabled={updateLoading}>
          {updateLoading ? 'Updating...' : 'Edit Product'}
        </button>
        {updateError && <p className="error">{updateError.message}</p>}
      </form>
    </div>
  );
};

export default EditProduct;
