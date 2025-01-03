import React from 'react';
import '../../styles/AddProductForm.css';

const CategorySelection = ({ formData, handleCategoryChange, nextStep, prevStep }) => {
  return (
      <div className="form-step">
      <h3>Select Categories</h3>
       <div className="category-selection">
            <label><input type="checkbox" value="1" onChange={handleCategoryChange} checked={formData.categoryIds.includes("1")} /> Electronics</label>
            <label><input type="checkbox" value="2" onChange={handleCategoryChange} checked={formData.categoryIds.includes("2")}/> Furniture</label>
            <label><input type="checkbox" value="3" onChange={handleCategoryChange} checked={formData.categoryIds.includes("3")}/> Home Appliances</label>
            <label><input type="checkbox" value="4" onChange={handleCategoryChange} checked={formData.categoryIds.includes("4")}/> Sporting Goods</label>
            <label><input type="checkbox" value="5" onChange={handleCategoryChange} checked={formData.categoryIds.includes("5")}/> Outdoor</label>
            <label><input type="checkbox" value="6" onChange={handleCategoryChange} checked={formData.categoryIds.includes("6")}/> Toys</label>
        </div>
        <button onClick={prevStep}>Previous</button>
        <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default CategorySelection;