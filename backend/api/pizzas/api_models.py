
from flask_restx import fields

from api.pizzas import pizzas_ns

nutrition_per_size = pizzas_ns.model('NutritionPerSize', {
    'calories': fields.Integer(),
    'protein': fields.Integer()
})

nutrition_model = pizzas_ns.model('Nutrition', {
    '26': fields.Nested(nutrition_per_size, required=False, skip_none=True),
    '30': fields.Nested(nutrition_per_size, required=False, skip_none=True),
    '40': fields.Nested(nutrition_per_size, required=False, skip_none=True)
})

pizza_model = pizzas_ns.model('Pizza', {
    'id': fields.Integer,
    'title': fields.String,
    'slug': fields.String,
    'description': fields.String,
    'ingredients': fields.List(fields.String),
    "pizza_types": fields.List(fields.Integer),
    "pizza_sizes": fields.List(fields.Integer),
    'nutrition_info': fields.Nested(nutrition_model, skip_none=True),
    "bake_time": fields.List(fields.String),
    "price": fields.Integer,
    'discount_percent': fields.Integer,
    "score": fields.Integer,
    'is_vegan': fields.Boolean,
    'is_spicy': fields.Boolean,
    "image_file": fields.String,
    "category_id": fields.Integer,
    'avaliable': fields.Boolean,
    'created_at': fields.DateTime,
    'updated_at': fields.DateTime,
})

def pizza_model_input(is_put: bool = False):
    pizza_model = pizzas_ns.parser()
    pizza_model.add_argument('title', type=str, required=True, location='form')
    pizza_model.add_argument('description', type=str, required=True, location='form')
    pizza_model.add_argument(
        'ingredients',
        type=str,
        required=True,
        location='form',
        help="Comma-separated list of ingredients"
    )
    pizza_model.add_argument(
        'pizza_types',
        type=str,
        required=True,
        location='form',
        help="Comma-separated list of 0 or 1"
    )
    pizza_model.add_argument(
        'pizza_sizes',
        type=str, 
        required=True, 
        location='form', 
        help="Comma-separated list of sizes (20-50)"
    )
    pizza_model.add_argument(
        'nutrition',
        type=str, 
        required=False, 
        location='form', 
        help="Nutrition info per size (JSON object)",

    )
    pizza_model.add_argument('bake_time', type=str, required=True, location='form')
    pizza_model.add_argument('price', type=int, required=True, location='form')
    pizza_model.add_argument('discount_percent', type=int, required=False, location='form')
    pizza_model.add_argument('score', type=int, required=False, location='form')
    pizza_model.add_argument('is_vegan', type=bool, required=False, location='form')
    pizza_model.add_argument('is_spicy', type=bool, required=False, location='form')
    pizza_model.add_argument('category_id', type=int, required=True, location='form')
    pizza_model.add_argument('image_file', type='file', location='files', required=True)
    pizza_model.add_argument('avaliable', type=bool, location='form', required=False)

    if is_put:
        for arg in pizza_model.args:
            arg.required = False

    return pizza_model

