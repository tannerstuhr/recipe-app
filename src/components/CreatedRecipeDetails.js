import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CreatedRecipeDetails() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/created_recipe/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const data = await response.json();
        setRecipeDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [recipeId]);

  const printRecipe = () => {
    window.print();
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipeDetails) return <div>Recipe not found</div>;

  return (
    <div className="recipe-details">
      <h2>{recipeDetails.title}</h2>
      <img src={recipeDetails.image} alt={recipeDetails.title} className="recipe-image" />
      <div className="recipe-description">
        <p>{recipeDetails.description}</p>
      </div>
      {recipeDetails.ingredients && (
        <div className="recipe-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipeDetails.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
      {recipeDetails.instructions && (
        <div className="recipe-instructions">
          <h3>Instructions</h3>
          <p>{recipeDetails.instructions}</p>
        </div>
      )}
       <button onClick={printRecipe} className="print-button">Print Recipe</button>
    </div>
  );
}

export default CreatedRecipeDetails;
