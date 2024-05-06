import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../css/SearchResults.css'

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const cuisine = searchParams.get('cuisine'); // Retrieve the cuisine parameter if it exists
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Determine the base URL based on the presence of 'query' or 'cuisine'
        const baseUrl = `http://localhost:5000/api/search`;
        let url = baseUrl;
        if (query) {
            url += `?query=${encodeURIComponent(query)}`;
        }
        if (cuisine) {
            url += `${query ? '&' : '?'}cuisine=${encodeURIComponent(cuisine)}`;
        }

        if (query || cuisine) {
            const fetchRecipes = async () => {
                try {
                    const response = await fetch(url);
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
    }, [query, cuisine]); // React to changes in either query or cuisine

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

    const headingText = query ? `Showing results for "${query}"` : (cuisine ? `Showing results for ${cuisine} Cuisine` : "Search Results");

    return (
        <>
            <h2 className='heading'>{headingText}</h2> 
            <div className='h-rule'></div>
            <div className="cards-container">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="card" style={{ width: '100%' }}> {/* Adjust width here */}
                        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                            </h5>
                            <p className="card-text">{recipe.summary}</p>
                            <button onClick={() => saveRecipe(recipe)} className="btn btn-outline-success">
                                Save Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
    
}

export default SearchResults;
