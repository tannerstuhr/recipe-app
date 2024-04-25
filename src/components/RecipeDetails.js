import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';

function RecipeDetails() {
    const { recipeId } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/recipe/${recipeId}`);
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

    return (
        <div>
            {recipeDetails && (
                <div>
                    <h2>{recipeDetails.title}</h2>
                    <img src={recipeDetails.image} alt={recipeDetails.title} />
                    <p>{recipeDetails.summary}</p>
                    {/* More detailed information like ingredients and instructions can be displayed here */}
                </div>
            )}
        </div>
    );
}

export default RecipeDetails;
