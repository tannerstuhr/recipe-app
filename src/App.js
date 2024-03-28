import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './components/HeaderComponent';
import SearchResults from './components/SearchResults';
import FeaturedRecipes from './components/FeaturedRecipes';
import RecipeCategories from './components/RecipeCategories';
import SavedRecipes from './components/SavedRecipes';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='hero-image'></div>
        <Routes>
          <Route path="/" element={
            <>
              <FeaturedRecipes />
              <RecipeCategories />
            </>
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
