import React, {useState} from 'react';
import '../../styles/AddProductForm.css';

const BasicDetails = ({ formData, handleChange, nextStep }) => {
    const [priceError, setPriceError] = useState('');

    const handlePriceChange = (e) => {
        handleChange(e);
        setPriceError(isNaN(e.target.value) ? "Please input a valid price" : '');
    }

    const handleNext = () => {
        if (!priceError){
            nextStep();
        }
    }
  return (
    <div className='form-step'>
      <h3>Basic Details</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
          value={formData.price}
        onChange={handlePriceChange}
        required
      />
    {priceError && <p className="error">{priceError}</p>}
      <button onClick={handleNext} disabled={!!priceError}>Next</button>
    </div>
  );
};

export default BasicDetails;