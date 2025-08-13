from flask import Flask
from flask_cors import CORS

from routes.wordpredict import wordpredict_bp
def create_app():
    app = Flask(__name__)
    app.register_blueprint(wordpredict_bp)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
