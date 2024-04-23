import React from "react";
import HeaderComponent from "./HeaderComponent";
import FeaturedRecipes from "./FeaturedRecipes";
import RecipeCategories from "./RecipeCategories";
import '../css/HomePage.css'

function HomePage() {
    return (
        <div>
            <HeaderComponent />
            <div className="hero-image"></div>
            <FeaturedRecipes />
            <RecipeCategories />
        </div>
    )
}

export default HomePage;