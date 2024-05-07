import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/SavedRecipes.css"

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

    const deleteRecipe = async (recipeOid) => {
        try {
            const response = await fetch(`http://localhost:5000/api/delete_saved_recipe/${recipeOid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete recipe: ${errorData.error}`);
            }
    
            setSavedRecipes(prevRecipes => prevRecipes.filter((recipe) => recipe._id.$oid !== recipeOid));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };
    
    

    return (
        <div>
            <h2 className='heading'>Saved Recipes</h2>
            <div className='h-rule'></div>
            <ul className='cards-container'>
                {savedRecipes.map((recipe) => (
                    <div key={recipe._id.$oid} className='card' style={{ width: '18rem' }}>
                        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                        <div className='card-body'>
                            <Link className='recipe-link' to={`/recipe/${recipe.id}`}><h3 className='card-title'>{recipe.title}</h3></Link> 
                            <button 
                                onClick={() => deleteRecipe(recipe._id.$oid)}
                                className='btn btn-outline-danger'>
                                Delete Recipe
                            </button>

                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default SavedRecipes;
