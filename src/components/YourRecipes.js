import React, { useState, useEffect } from 'react';
import HeaderComponent from './HeaderComponent';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function YourRecipes() {
    const [yourRecipes, setYourRecipes] = useState([]);
    const [editingRecipeId, setEditingRecipeId] = useState(null);

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

    // const deleteRecipe = async (recipeOid) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/delete_recipe/${recipeOid}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(`Failed to delete recipe: ${errorData.error}`);
    //         }
    //         // Assuming your server's response includes the deleted recipe's ID
    //         // Update the state to remove the recipe
    //         setSavedRecipes(prevRecipes => prevRecipes.filter((recipe) => recipe._id.$oid !== recipeOid));
    //     } catch (error) {
    //         console.error("Error deleting recipe:", error);
    //     }
    // };
    
    
    

    return (
        <div>
            <h2>Your Recipes</h2>
            <ul>
                {yourRecipes.map((recipe) => (
                    <div key={recipe._id.$oid} className='card' style={{ width: '18rem' }}>
                        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                        <div className='card-body'>
                            <h3 className='card-title'>
                                <Link to={`/created_recipe/${recipe._id.$oid}`}>{recipe.title}</Link>
                            </h3>
                            <button
                                onClick={() => navigate(`/edit_recipe/${recipe._id.$oid}`)}
                                className='btn btn-outline-primary'>
                                Edit Recipe
                            </button>

                            <button 
                                // onClick={() => deleteRecipe(recipe._id.$oid)}
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
