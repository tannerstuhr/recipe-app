import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/EditRecipe.css'

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: ''
  });

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/created_recipe/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const recipe = await response.json();
        setFormData({
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions
        });
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    if (recipeId) {
      fetchRecipeDetails();
    }
  }, [recipeId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e, index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = e.target.value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredientField = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/update_recipe/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }
      const result = await response.json();
      console.log(result.message);
      navigate(`/created_recipe/${recipeId}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe title"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Recipe description"
          />
        </div>
        <div className="form-group">
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                className="form-input ingredient-input"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder={`Ingredient ${index + 1}`}
              />
              {index === formData.ingredients.length - 1 && (
                <button type="button" onClick={addIngredientField} className="add-ingredient-button">+</button>
              )}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-textarea"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Instructions"
          />
        </div>
        <button type="submit" className="form-input-button">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;
