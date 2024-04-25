import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
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
        setFormData({ // make sure the fields match with your form data structure
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/update_recipe/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }
      const data = await response.json();
      console.log(data.message);
      navigate(`/created_recipe/${recipeId}`); // Redirect to the updated recipe
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe title"
        />
        <textarea
          className='form-control me-2 recipe-input'
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Recipe description"
        />
      <button type="submit">Update Recipe</button>
    </form>
  );
  
}


export default EditRecipe;