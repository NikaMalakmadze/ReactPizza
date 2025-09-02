
from flask_restx import Namespace

from config import settings

pizzas_ns: Namespace = Namespace(
    'Pizzas', 
    path='/pizzas',
    authorizations=settings.jwt.AUTHORIZATIONS
)

from . import resources