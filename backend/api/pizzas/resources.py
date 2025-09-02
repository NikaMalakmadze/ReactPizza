
from werkzeug.datastructures import FileStorage
from flask_restx.reqparse import RequestParser
from werkzeug.exceptions import BadRequest
from flask_restx.resource import Resource
from flask_restx import abort, marshal
from flask import send_from_directory
from pydantic import ValidationError
from flask.globals import request
from sqlalchemy import or_

from api.pizzas.schemas import Nutrition, PizzaCreateSchema, PizzaUpdateSchema
from api.pizzas.api_models import pizza_model, pizza_model_input
from api.utils import update_old_image, save_image_file
from api.jwt.decorators import jwt_required
from api.pizzas.models import Pizza
from api.pizzas import pizzas_ns
from api.extensions import db
from api.utils import slugify
from config import settings

parser = RequestParser()
parser.add_argument('sortBy', type=str)
parser.add_argument('page', type=int)
parser.add_argument('search', type=str)

@pizzas_ns.route('/')
class PizzaResource(Resource):
    def get(self):
        try:
            args = parser.parse_args()
        except TypeError as e:
            abort(400, str(e))

        sortBy: str = args.get('sortBy', 'rating')
        page: int = args.get('page', False)
        search: str = args.get('search', False)

        query = Pizza.query

        if not query.all():
            if page:
                return {'pizzas': [], 'total_pages': 0}
            else:
                return []

        if search:
            query = query.filter(
                or_(
                    Pizza.title.ilike(f"%{search}%"),
                    Pizza.slug.ilike(f"%{search}%")
                )
            )

        if sortBy == 'rating':
            query = query.order_by(Pizza.score.desc())
        elif sortBy == 'price-a':
            query = query.order_by(Pizza.price.asc())
        elif sortBy == 'price-d':
            query = query.order_by(Pizza.price.desc())
        elif sortBy == 'alphabet':
            query = query.order_by(Pizza.title.asc())

        if page:
            pagination = query.paginate(page=page, per_page=4, error_out=False)
            return {
                "pizzas": [pizza.to_dict() for pizza in pagination.items],
                "total_pages": pagination.pages,
                "current_page": pagination.page
            }
        
        return marshal(query.all(), pizza_model)
    
    @pizzas_ns.doc(consumes=["multipart/form-data"])
    @pizzas_ns.expect(pizza_model_input())
    @pizzas_ns.marshal_with(pizza_model)
    @pizzas_ns.doc(security='JWT')
    @jwt_required
    def post(self):
        try:
            form_data = request.form.to_dict()

            image_file: FileStorage = request.files.get('image_file')
            if not image_file:
                raise BadRequest("image_file is required")
            
            raw_nutration = form_data.get('nutrition', None)
            
            if raw_nutration:
                try:
                    nutrition: Nutrition = Nutrition.model_validate_json(raw_nutration) 
                except ValidationError as e:
                    errors = e.errors()
                    error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
                    abort(400, '; '.join(error_messages))

            validated_data = PizzaCreateSchema(
                title=form_data.get("title"),
                pizza_types=form_data.get('pizza_types', '').split(','),
                pizza_sizes=form_data.get('pizza_sizes', '').split(','),
                bake_time=form_data.get('bake_time', '').split(','),
                price=form_data.get("price"),
                discount_percent=form_data.get('discount_percent', 0),
                score=int(form_data.get("score", 0)),
                is_vegan=form_data.get('is_vegan'),
                is_spicy=form_data.get('is_spicy'),
                avaliable=form_data.get('avaliable'),
                category_id=int(form_data.get("category_id")),
                image_file=image_file,  
            )
        except ValidationError as e:
            errors = e.errors()
            error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
            abort(400, '; '.join(error_messages))

        ingredients: list[str] = form_data.get('ingredients', '').strip().split(',')
        ingredients = [ingredient.strip() for ingredient in ingredients]

        new_pizza: Pizza = Pizza(
            title=validated_data.title,
            slug=slugify(validated_data.title),
            description=form_data.get('description', 'No Desc'),
            nutrition_info = nutrition.model_dump(by_alias=True),
            ingredients=ingredients,
            pizza_types=validated_data.pizza_types or [],
            pizza_sizes=validated_data.pizza_sizes or [],
            bake_time=validated_data.bake_time,
            price=validated_data.price,
            discount_percent=validated_data.discount_percent,
            category_id=validated_data.category_id,
            score=validated_data.score,
            is_vegan=validated_data.is_vegan,
            is_spicy=validated_data.is_spicy,
            avaliable=validated_data.avaliable
        )

        secure_filename: str = save_image_file(validated_data.image_file, 'pizzas')

        new_pizza.image_file = secure_filename

        db.session.add(new_pizza)
        db.session.commit()

        return new_pizza, 200
    
@pizzas_ns.route('/<string:slug>')
@pizzas_ns.response(404, 'Pizza not found')
class SpecificPizzaResource(Resource):
    @pizzas_ns.marshal_with(pizza_model)
    def get(self, slug: str):
        pizza = Pizza.query.filter_by(slug=slug).first()
        if not pizza:
            pizzas_ns.abort(404, f"Pizza with Slug {slug} not found")
        return pizza
    
    @pizzas_ns.expect(pizza_model_input(True))
    @pizzas_ns.marshal_with(pizza_model)
    @pizzas_ns.doc(security='JWT')
    @jwt_required
    def put(self, slug: str):
        pizza: Pizza = Pizza.query.filter_by(slug=slug).first()
        if not pizza:
            pizzas_ns.abort(404, f"Pizza with Slug {slug} not found")

        if request.is_json:
            form_data = request.get_json()
            image_file = None
        else:
            form_data = request.form.to_dict()
            image_file = request.files.get("image_file")

        try:
            ingredients: list[str] = form_data.get('ingredients') 
            if ingredients:
                ingredients = ingredients.strip().split(',')
                pizza.ingredients = [ingredient.strip() for ingredient in ingredients]

            if image_file:
                pizza.image_file = update_old_image(
                    image_file,
                    pizza.image_file,
                    settings.db.UPLOAD_FOLDER / 'pizzas'
                )

            nutrition = None
            raw_nutration = form_data.get('nutrition')

            if raw_nutration:
                try:
                    nutrition: Nutrition = Nutrition.model_validate_json(raw_nutration)
                except ValidationError as e:
                    errors = e.errors()
                    error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
                    abort(400, '; '.join(error_messages))

            validated_data = PizzaUpdateSchema(**form_data)
        except ValidationError as e:
            errors = e.errors()
            error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
            abort(400, '; '.join(error_messages))

        for field, value in validated_data.model_dump(exclude_unset=True).items():
            setattr(pizza, field, value)

        if validated_data.title:
            pizza.slug = slugify(validated_data.title)

        if nutrition:
            pizza.nutrition_info = nutrition.model_dump(by_alias=True) if nutrition else {}

        db.session.commit()

        return pizza, 200
    
    @pizzas_ns.response(204, 'Pizza deleted')
    @pizzas_ns.doc(security='JWT')
    @jwt_required
    def delete(self, slug: str):
        pizza: Pizza = Pizza.query.filter_by(slug=slug).first()
        if not pizza:
            pizzas_ns.abort(404, f"Pizza with Slug {slug} not found")

        if pizza.image_file:
            image_path = settings.db.UPLOAD_FOLDER / 'pizzas' / pizza.image_file
            if image_path.exists():
                image_path.unlink()

        db.session.delete(pizza)
        db.session.commit()

        return '', 204
    
@pizzas_ns.route('/image/<string:file_name>')
class PizzaImageResource(Resource):
    def get(self, file_name: str):
        return send_from_directory(
            settings.db.UPLOAD_FOLDER / 'pizzas', 
            file_name
        )
