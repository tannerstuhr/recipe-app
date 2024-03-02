from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, Flask is running!'

@app.route('/api/search', methods=['GET'])
def search_recipes():
    query = request.args.get('query')  # This is correct
    api_key = '4ff44dbca2414abebca530b60704163c'  # Ideally, store API keys in environment variables
    url = f"https://api.spoonacular.com/recipes/complexSearch?query={query}&apiKey={api_key}"
    response = requests.get(url)
    return jsonify(response.json())  # This should correctly return the JSON response from Spoonacular

if __name__ == '__main__':
    app.run(debug=True)
