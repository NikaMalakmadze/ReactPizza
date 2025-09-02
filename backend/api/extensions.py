
from flask_sqlalchemy import SQLAlchemy
from flask.blueprints import Blueprint
from flask_restx import Api
from flask_cors import CORS

api_bp: Blueprint = Blueprint('api_bp', __name__)
api: Api = Api(api_bp, title='ReactPizza')
db: SQLAlchemy = SQLAlchemy()
cors: CORS = CORS(
    origins=["http://localhost:5173", 'https://reactpizza-je52.onrender.com'], supports_credentials=True
)