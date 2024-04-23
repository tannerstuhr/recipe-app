import React, { useState } from 'react';

function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      console.error("Error creating recipe:", error);
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
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Recipe description"
      />
      {/* Add inputs for ingredients and instructions */}
      <button type="submit">Create Recipe</button>
    </form>
  );
}

export default CreateRecipe;
