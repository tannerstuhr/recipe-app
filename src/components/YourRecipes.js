import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/SavedRecipes.css"

function YourRecipes() {
    const [yourRecipes, setYourRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchYourRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/your_recipes');
                if (!response.ok) {
                    throw new Error('Failed to fetch your recipes');
                }
                const data = await response.json();
                setYourRecipes(data);
            } catch (error) {
                console.error("Error fetching your recipes:", error);
            }
        };

        fetchYourRecipes();
    }, []);

    const deleteRecipe = async (recipeId) => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    
        try {
            const response = await fetch(`http://localhost:5000/api/delete_recipe/${recipeId}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete recipe: ${await response.text()}`);
            }
    
            setYourRecipes(yourRecipes.filter(recipe => recipe._id.$oid !== recipeId));
        } catch (error) {
            console.error("Error deleting recipe:", error.message);
        }
    };
    
    

    return (
        <div>
            <h2>Your Recipes</h2>
            <ul className='cards-container'> 
                {yourRecipes.map((recipe) => (
                    <div key={recipe._id.$oid} className='card' style={{ width: '18rem' }}>
                        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                        <div className='card-body'>
                            <h3 className='card-title'>
                                <Link className='recipe-link' to={`/created_recipe/${recipe._id.$oid}`}>{recipe.title}</Link>
                            </h3>
                            <button
                                onClick={() => navigate(`/edit_recipe/${recipe._id.$oid}`)}
                                className='btn btn-outline-primary'>
                                Edit Recipe
                            </button>

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

export default YourRecipes;
