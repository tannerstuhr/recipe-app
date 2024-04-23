import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SearchResults from './components/SearchResults';
import SavedRecipes from './components/SavedRecipes';
import CreateRecipe from './components/CreateRecipe';
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header />
        <div className='hero-image'></div>
        <Routes>
          <Route path="/" element={
            <>
              <FeaturedRecipes />
              <RecipeCategories />
            </>
          } /> */}
          <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
