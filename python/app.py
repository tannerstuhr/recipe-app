from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app = Flask(__name__)

@app.route('/api/search', methods=['GET'])
def search_recipes():
    query = request.args.get('query')
    api_key = '4ff44dbca2414abebca530b60704163c'
    url = f"https://api.spoonacular.com/recipes/complexSearch?query={query}&apiKey={api_key}"
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)

