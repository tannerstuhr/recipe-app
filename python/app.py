from flask import Flask, request, jsonify
import requests
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import json_util
from bson.objectid import ObjectId
import json

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://tstuhr:scrumptiouspassword@cluster0.bjqgpu5.mongodb.net/SCRUMptious?retryWrites=true&w=majority"
mongo = PyMongo(app)

CORS(app, supports_credentials=True)

@app.route('/')
def hello():
    return 'Hello, Flask is running!'

@app.route('/api/search', methods=['GET'])
def search_recipes():
    query = request.args.get('query')
    cuisine = request.args.get('cuisine')
    api_key = '4ff44dbca2414abebca530b60704163c'  # store in environment variable
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {'apiKey': api_key}

    if query:
        params['query'] = query
    if cuisine:
        params['cuisine'] = cuisine

    response = requests.get(url, params=params)
    return jsonify(response.json())

@app.route('/api/like', methods=['POST'])
def like_recipe():
    if not request.json or 'recipeId' not in request.json:
        return jsonify({'error': 'Missing recipeId'}), 400
    
    recipe_id = request.json['recipeId']
    
    # Check if the recipe is already liked
    if mongo.db.likes.find_one({'recipeId': recipe_id}):
        return jsonify({'message': 'Recipe already liked'}), 200
    
    # Store the like in the database
    mongo.db.likes.insert_one({'recipeId': recipe_id})
    return jsonify({'message': 'Recipe liked successfully'}), 201

@app.route('/api/save_recipe', methods=['POST'])
def save_recipe():
    recipe = request.json
    if not recipe:
        return jsonify({'error': 'No recipe data provided'}), 400

    mongo.db.recipes.insert_one(recipe)
    return jsonify({'message': 'Recipe saved successfully'}), 201

@app.route('/api/delete_recipe/<recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    try:
        obj_id = ObjectId(recipe_id)
    except Exception as e:
        return jsonify({'error': 'Invalid recipe ID format: ' + str(e)}), 400

    result = mongo.db.created_recipes.delete_one({'_id': obj_id})
    if result.deleted_count:
        return jsonify({'message': 'Recipe deleted successfully'}), 200
    else:
        return jsonify({'error': 'Recipe not found'}), 404



@app.route('/api/saved_recipes', methods=['GET'])
def get_saved_recipes():
    recipes = mongo.db.recipes.find()
    # Convert the cursor to a list and then use json_util to handle MongoDB specific types
    recipes_list = list(recipes)
    return json.dumps(recipes_list, default=json_util.default), 200

@app.route('/api/your_recipes', methods=['GET'])
def get_your_recipes():
    recipes = mongo.db.created_recipes.find()
    # Convert the cursor to a list and then use json_util to handle MongoDB specific types
    recipes_list = list(recipes)
    return json.dumps(recipes_list, default=json_util.default), 200

@app.route('/api/create_recipe', methods=['POST'])
def create_recipe():
    """
    Create a new recipe in the database.
    """
    # Get data from the request
    recipe_data = request.get_json()

    # Validate the data, ensuring required fields are present
    if not recipe_data:
        return jsonify({'error': 'No recipe data provided'}), 400
    if 'title' not in recipe_data or 'description' not in recipe_data:
        # You can add more required fields as necessary
        return jsonify({'error': 'Missing required recipe data'}), 400

    # Insert the recipe data into the database
    mongo.db.created_recipes.insert_one(recipe_data)

    # Return success message
    return jsonify({'message': 'Recipe created successfully'}), 201

@app.route('/api/recipe/<int:recipe_id>', methods=['GET'])
def get_recipe_information(recipe_id):
    api_key = '4ff44dbca2414abebca530b60704163c'  # store in environment variable
    url = f"https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Recipe not found"}), response.status_code

@app.route('/api/created_recipe/<recipe_id>', methods=['GET'])
def get_created_recipe_information(recipe_id):
    try:
        # Convert the string ID to a MongoDB ObjectId
        obj_id = ObjectId(recipe_id)
    except:
        return jsonify({'error': 'Invalid recipe ID format'}), 400

    # Fetch the recipe from the 'created_recipes' collection using the ObjectId
    recipe = mongo.db.created_recipes.find_one({'_id': obj_id})

    if recipe:
        # Convert the MongoDB document to a JSON serializable format
        return json.dumps(recipe, default=json_util.default), 200
    else:
        return jsonify({'error': 'Recipe not found'}), 404


@app.route('/api/update_recipe/<recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    try:
        obj_id = ObjectId(recipe_id)
    except:
        return jsonify({'error': 'Invalid recipe ID format'}), 400
    
    # Get the updated data from the request body
    updated_data = request.get_json()
    
    # Update the recipe in the database
    mongo.db.created_recipes.update_one(
        {'_id': obj_id},
        {'$set': updated_data}
    )
    return jsonify({'message': 'Recipe updated successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True)


