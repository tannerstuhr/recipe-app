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
                    <li key={recipe.id}>
                        {recipe.title}
                        {/* Display image if available */}
                        {recipe.image && <img src={recipe.image} alt={recipe.title} style={{ width: '100px' }} />}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;