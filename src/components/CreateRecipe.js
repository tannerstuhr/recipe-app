import React, { useState } from 'react';

function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: ''
  });

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
    // Additional validation can be done here
    try {
      const response = await fetch('http://localhost:5000/api/create_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }
      const data = await response.json();
      console.log(data.message);
      // Reset the form or navigate the user to another page
      setFormData({
        title: '',
        description: '',
        ingredients: [],
        instructions: ''
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="create-recipe-form">
      <form onSubmit={handleSubmit}>
        <input
          className='form-control recipe-input'
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe title"
        />
        <textarea
          className='form-control recipe-input'
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Recipe description"
        />
        {formData.ingredients.map((ingredient, index) => (
          <input
            key={index}
            className='form-control recipe-input'
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
            placeholder={`Ingredient ${index + 1}`}
          />
        ))}
        <button 
          type="button" 
          className='btn btn-outline-secondary' 
          onClick={addIngredientField}
        >
          Add Ingredient
        </button>
        <textarea
          className='form-control recipe-input'
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions"
        />
        <div className='btn-container'>
          <button className='btn btn-outline-success' type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;
