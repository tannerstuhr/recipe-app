import React, { useState } from 'react';

function Search() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const searchRecipes = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRecipes(data.results || []); // Fallback to an empty array if results is undefined
            console.log(data);
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchRecipes}>Search</button>
            <ul>
                {recipes.map((recipe) => (
                    // <div key={recipe.id} class="card" style={{ width: '100px' }} >
                    //     <img src={recipe.image} alt={recipe.title}  class="card-img-top" ></img>\
                    //     {recipe.title}
                    //     {/* Display image if available */}
                    //     {recipe.image && <img />}
                    // </div>
                    <div class="card" style={{ width: '18rem' }}>
                    <img src={recipe.image} class="card-img-top" alt={recipe.title} />
                    <div class="card-body">
                        <h5 class="card-title">{recipe.title}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-outline-success">Save Recipe</a>
                    </div>
                    </div>

                ))}
            </ul>
        </div>
    );
}

export default Search;