import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import FeaturedRecipes from './components/FeaturedRecipes';
import RecipeCategories from './components/RecipeCategories';
import SavedRecipes from './components/SavedRecipes';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/saved-recipes">Saved Recipes</Link>
            </li>
          </ul>
        </nav>
        <Routes> {/* Updated from Switch to Routes */}
          <Route path="/" element={
            <>
              <Search />
              <FeaturedRecipes />
              <RecipeCategories />
            </>
          } />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
