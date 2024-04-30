import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/RecipeDetails.css'

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

    const printRecipe = () => {
        window.print();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="recipe-details">
            {recipeDetails && (
                <>
                    <h2>{recipeDetails.title}</h2>
                    <img src={recipeDetails.image} alt={recipeDetails.title} />
                    <div dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
                    
                    <h3>Ingredients</h3>
                    <ul>
                        {recipeDetails.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>
                                {ingredient.original}
                            </li>
                        ))}
                    </ul>

                    <h3>Instructions</h3>
                    {recipeDetails.analyzedInstructions.length > 0 ? (
                        recipeDetails.analyzedInstructions[0].steps.map((step, index) => (
                            <p key={index}><strong>Step {index + 1}:</strong> {step.step}</p>
                        ))
                    ) : (
                        <p>No detailed instructions provided.</p>
                    )}

                    <h3>Nutrition</h3>
                    <p>Calories: {recipeDetails.nutrition?.calories || 'N/A'}</p>
                    {recipeDetails.winePairing && (
                        <>
                            <h3>Wine Pairing</h3>
                            <p>{recipeDetails.winePairing.pairingText}</p>
                        </>
                    )}

                    <button onClick={printRecipe} className="print-button">Print Recipe</button>
                </>
            )}
        </div>
    );
}

export default RecipeDetails;
