import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/RecipeCategories.css'

function RecipeCategories() {
  const navigate = useNavigate();
  const popularCuisines = ["Italian", "Chinese", "Japanese", "Indian"];
  const allCuisines = [
    "African", "Asian", "American", "British", "Cajun", "Caribbean", 
    "Chinese", "Eastern European", "European", "French", "German", 
    "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", 
    "Korean", "Latin American", "Mediterranean", "Mexican", 
    "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
  ];
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleCuisineSearch = (cuisine) => {
    if (cuisine) {
      navigate(`/search?cuisine=${encodeURIComponent(cuisine)}`);
    }
  };

  return (
    <div className="categories">
      <h2>Or Search By Cuisine!</h2>
      <div className="category-buttons">
        {popularCuisines.map(cuisine => (
          <div key={cuisine} className="cuisine-image-container" onClick={() => handleCuisineSearch(cuisine)}>
            <img src={`/images/${cuisine.toLowerCase()}.jpeg`} alt={cuisine} className="cuisine-image" />
            <div className="overlay">{cuisine}</div>
          </div>
        ))}
      </div>
      <div className='input-container'>
        <select class="form-select" value={selectedCuisine} onChange={handleCuisineChange}>
          <option value="">Select Cuisine</option>
          {allCuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>{cuisine}</option>
          ))}
        </select>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => handleCuisineSearch(selectedCuisine)}>Search Cuisine</button>
      </div>
    </div>
  );
}

export default RecipeCategories;
