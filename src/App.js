import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SearchResults from './components/SearchResults';
import SavedRecipes from './components/SavedRecipes';
import CreateRecipe from './components/CreateRecipe';
import YourRecipes from './components/YourRecipes.js';
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';
import CreatedRecipeDetails from './components/CreatedRecipeDetails.js';
import HeaderComponent from './components/HeaderComponent.js';
import EditRecipe from './components/EditRecipe.js';
function App() {
  return (
    <Router>
      <div className="App">
          <HeaderComponent />
          <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/your-recipes" element={<YourRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="/created_recipe/:recipeId" element={<CreatedRecipeDetails />} />
          <Route path="/edit_recipe/:recipeId" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
