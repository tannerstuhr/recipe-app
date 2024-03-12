from flask import Flask, request, jsonify
import requests
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/recipeApp"  # Use your actual MongoDB URI
mongo = PyMongo(app)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)
