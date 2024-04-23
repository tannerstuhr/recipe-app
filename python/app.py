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
    api_key = '4ff44dbca2414abebca530b60704163c'  # store in environment variable
    url = f"https://api.spoonacular.com/recipes/complexSearch?query={query}&apiKey={api_key}"
    response = requests.get(url)
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
    # The recipe_id is expected to be passed in the URL

    # Attempt to convert the provided id to a valid ObjectId
    try:
        obj_id = ObjectId(recipe_id)
    except:
        return jsonify({'error': 'Invalid recipe ID provided'}), 400

    # Perform the deletion
    result = mongo.db.recipes.delete_one({'_id': obj_id})

    # Check if a document was deleted
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

if __name__ == '__main__':
    app.run(debug=True)
