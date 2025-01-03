import React, { useState } from 'react';
import BasicDetails from '../components/productForm/BasicDetails';
import CategorySelection from '../components/productForm/CategorySelection';
import Confirmation from '../components/productForm/Confirmation';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, GET_PRODUCTS } from '../apollo/mutations';
import '../styles/AddProductForm.css';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryIds: [],
  });

  const navigate = useNavigate();

    const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [GET_PRODUCTS]
    });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
      const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
      const { value } = e.target;
      const isChecked = e.target.checked;
    
      setFormData(prevFormData => {
          const updatedCategoryIds = isChecked
            ? [...prevFormData.categoryIds, value]
            : prevFormData.categoryIds.filter(id => id !== value);
        
          return { ...prevFormData, categoryIds: updatedCategoryIds };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createProduct({
                variables: {
                    ...formData,
                    price: parseFloat(formData.price)
                }
            });
            if (response && response.data) {
                console.log('Product Creation Success:', response.data);
                navigate('/products');
            }
        } catch (err) {
            console.error('Product Creation Failed:', err.message);
        }
    };


  const renderForm = () => {
    switch (step) {
      case 1:
        return <BasicDetails formData={formData} handleChange={handleChange} nextStep={nextStep} />;
      case 2:
        return (
          <CategorySelection
            formData={formData}
            handleCategoryChange={handleCategoryChange}
            nextStep={nextStep}
              prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Confirmation
            formData={formData}
             handleSubmit={handleSubmit}
              prevStep={prevStep}
              loading={loading}
                error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
      <div className="add-product-form">
      <h2>Add New Product</h2>
      {renderForm()}
      </div>
  );
};

export default AddProductForm;