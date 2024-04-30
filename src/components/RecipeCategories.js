import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h2>Find What Works For You</h2>
      <div className="category-buttons">
        {popularCuisines.map(cuisine => (
          <button key={cuisine} onClick={() => handleCuisineSearch(cuisine)}>
            {cuisine}
          </button>
        ))}
      </div>
      <select value={selectedCuisine} onChange={handleCuisineChange}>
        <option value="">Select Cuisine</option>
        {allCuisines.map(cuisine => (
          <option key={cuisine} value={cuisine}>{cuisine}</option>
        ))}
      </select>
      <button onClick={() => handleCuisineSearch(selectedCuisine)}>Search Cuisine</button>
    </div>
  );
}

export default RecipeCategories;
