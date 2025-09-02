
from flask_restx.reqparse import RequestParser
from flask_restx.resource import Resource
from flask_restx import abort, marshal
from pydantic import ValidationError
from sqlalchemy import or_

from api.pizzaCategory.api_models import category_model, category_model_post
from api.pizzaCategory.schemas import PizzaCategoryCreate
from api.pizzaCategory.models import PizzaCategory
from api.pizzaCategory import pizza_categories_ns
from api.pizzas.api_models import pizza_model
from api.jwt.decorators import jwt_required
from api.pizzas.models import Pizza
from api.extensions import db

@pizza_categories_ns.route('/')
class CategoriesResource(Resource):
    @pizza_categories_ns.marshal_list_with(category_model)
    def get(self):
        return PizzaCategory.query.all()
    
    @pizza_categories_ns.expect(category_model_post)
    @pizza_categories_ns.marshal_with(category_model)
    @pizza_categories_ns.doc(security='JWT')
    @jwt_required
    def post(self):
        try:
            validated_data: PizzaCategoryCreate = PizzaCategoryCreate(**pizza_categories_ns.payload)
        except ValidationError as e:
            errors = e.errors()
            error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
            abort(400, '; '.join(error_messages))

        new_category: PizzaCategory = PizzaCategory(name=validated_data.name)

        db.session.add(new_category)
        db.session.commit()

        return new_category, 200

parser = RequestParser()
parser.add_argument('sortBy', type=str)
parser.add_argument('page', type=int)
parser.add_argument('search', type=str)

@pizza_categories_ns.route('/<int:id>/pizzas')
@pizza_categories_ns.response(404, 'Pizza not found')
class SpecificCategoryPizzasResource(Resource):
    @pizza_categories_ns.doc(params={'sortBy': 'sortBy characteristics', 'page': 'Page number'})
    def get(self, id: int):
        category: PizzaCategory = PizzaCategory.query.filter_by(id=id).first()
        if not category:
            pizza_categories_ns.abort(404, f"Pizza with ID {id} not found")

        try:
            args = parser.parse_args()
        except TypeError as e:
            abort(400, str(e))

        query = Pizza.query.filter_by(category_id=id)

        if not query.all():
            return {'pizzas': [], 'total_pages': 0}
        
        sortBy: str = args.get('sortBy', 'rating')
        page: int = args.get('page')
        search: str = args.get('search')

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