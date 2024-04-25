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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipeDetails) return <div>Recipe not found</div>;

  return (
    <div>
      <h2>{recipeDetails.title}</h2>
      {/* Assuming recipeDetails.image holds the image URL */}
      <img src={recipeDetails.image} alt={recipeDetails.title} />
      <p>{recipeDetails.description}</p>
      {/* Display ingredients and instructions here */}
    </div>
  );
}

export default CreatedRecipeDetails;
