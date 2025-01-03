import React from 'react';
import '../../styles/AddProductForm.css';

const Confirmation = ({ formData, handleSubmit, prevStep, loading, error }) => {
  return (
    <div className="form-step">
      <h3>Confirm Product Details</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Description:</strong> {formData.description}</p>
        <p><strong>Price:</strong> {formData.price}</p>
        <p><strong>Categories:</strong> {formData.categoryIds.join(', ')}</p>
      
        <button onClick={prevStep}>Previous</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating Product...' : 'Confirm'}
        </button>
        {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default Confirmation;