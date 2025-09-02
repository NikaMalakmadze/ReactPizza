
from flask_restx import Namespace

from config import settings

pizza_categories_ns: Namespace = Namespace(
    'PizzaCategories', 
    path='/pizza-categories',
    authorizations=settings.jwt.AUTHORIZATIONS
)

from . import resources