import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/RecipeDetails.css'

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
    <h2 className="recipe-title">{recipeDetails.title}</h2>
    <div className="main-info">
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
    </div>
    <div className="supplementary-info">
        <button onClick={printRecipe} className="print-button">Print Recipe</button>
    </div>
</div>

  );
}

export default CreatedRecipeDetails;
