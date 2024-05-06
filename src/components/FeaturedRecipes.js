import React from 'react';
import { Link } from 'react-router-dom';
import '../css/FeaturedRecipes.css'

const focusSearch = () => {
  // Check if the navbar is collapsed by checking the display style of the collapsible div
  const navbarToggler = document.querySelector('.navbar-toggler');
  const isCollapsed = getComputedStyle(document.getElementById('navbarSupportedContent')).display === 'none';

  // If the navbar is collapsed (meaning the 'display' property of the collapsible div is 'none'), click the toggler
  if (navbarToggler && isCollapsed) {
      navbarToggler.click();
      // Wait a bit for the collapse animation to complete before focusing
      setTimeout(() => {
          document.getElementById("search_form").focus();
      }, 350); // Adjust the timeout if needed
  } else {
      // If not collapsed, just focus
      document.getElementById("search_form").focus();
  }
};


function FeaturedRecipes() {
  const recipes = [
    { id: 986003, title: 'Smokey Chicken Tacos', image: `/images/chicken-tacos-2.jpeg` },
    { id: 649555, title: 'Lemon Chicken Breasts', image: `/images/lemon-chicken.jpeg` },
    { id: 633876, title: 'Crispy Baked Ziti', image: `/images/baked-ziti.jpeg` }
  ];

    return (
      <div className="featured-recipes-outer">
        <div className='inner'>
          <h2 className='heading'>Whats For Dinner?</h2>
          <p className='center-text'>
            <a 
            onClick={focusSearch}
            style={{ cursor: 'pointer' }}
            className='search_focus_button'
            >
              Search 
            </a> a Recipe Or Choose One of Our Featured Recipes Below!</p>
            <div className='h-rule'></div>
        </div>
        <div className="featured-recipes-inner">
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <Link className='featured-recipe-link' to={`/recipe/${recipe.id}`}>
                <div key={recipe.id} className="recipe-card">
                  <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                  <h3 className="recipe-title">{recipe.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='h-rule'></div>

      </div>
    );
  }
  
  export default FeaturedRecipes;