import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (query) {
            const fetchRecipes = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setRecipes(data.results || []);
                } catch (error) {
                    console.error("Error during fetch: ", error);
                }
            };
            fetchRecipes();
        }
    }, [query]); // Dependency on query ensures useEffect reruns when query changes

    const saveRecipe = async (recipe) => {
        try {
            const response = await fetch('http://localhost:5000/api/save_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });
            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error("Error saving recipe:", error);
        }
    };

    return (
        <div>
            <HeaderComponent />
            {recipes.map((recipe) => (
                <div key={recipe.id} className="card" style={{ width: '18rem' }}>
                    <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link> 
                        </h5>
                        <p className="card-text">{recipe.summary}</p>
                        <button
                          onClick={() => saveRecipe(recipe)} 
                          className="btn btn-outline-success">
                            Save Recipe
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
