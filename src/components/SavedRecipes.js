import React, { useState, useEffect } from 'react';

function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/saved_recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch saved recipes');
                }
                const data = await response.json();
                setSavedRecipes(data);
            } catch (error) {
                console.error("Error fetching saved recipes:", error);
            }
        };

        fetchSavedRecipes();
    }, []);

    return (
        <div>
            <h2>Saved Recipes</h2>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SavedRecipes;
