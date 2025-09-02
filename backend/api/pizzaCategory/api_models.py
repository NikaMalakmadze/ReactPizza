
from flask_restx import fields

from api.pizzaCategory import pizza_categories_ns
from api.pizzas.api_models import pizza_model

category_model = pizza_categories_ns.model('PizzaCategory', {
    'id': fields.Integer,
    'name': fields.String,
    'pizzas': fields.List(fields.Nested(pizza_model))
})

category_model_post = pizza_categories_ns.model('PizzaCategoryPost', {
    "name": fields.String
})