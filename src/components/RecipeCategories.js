function RecipeCategories() {
    const categories = ["Quick Dinner", "Vegan Meals", "Chicken Meal Prep", "One Pot Recipes"];
  
    return (
      <div className="categories">
        <h2>Find What Works For You</h2>
        <div className="category-buttons">
          {categories.map(category => (
            <button key={category}>{category}</button>
          ))}
        </div>
      </div>
    );
  }
  
  export default RecipeCategories;