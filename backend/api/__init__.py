
from flask import Flask

from api.error_handlers import init_error_handlers
from api.extensions import db, api, api_bp, cors
from config import settings, prepare_folders

def create_app(migrate=False, drop=False):
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_mapping(
        DEBUG=settings.DEBUG,
        TESTING=settings.TESTING,
        SQLALCHEMY_DATABASE_URI=settings.db.SQLALCHEMY_DATABASE_URI,
        SQLALCHEMY_TRACK_MODIFICATIONS=settings.db.SQLALCHEMY_TRACK_MODIFICATIONS,
        UPLOAD_FOLDER=str(settings.db.UPLOAD_FOLDER),
    )

    db.init_app(app)
    cors.init_app(app)

    init_error_handlers()

    app.register_blueprint(api_bp, url_prefix='/api')

    from api.pizzaCategory import pizza_categories_ns
    from api.pizzas import pizzas_ns
    from api.jwt import jwt_ns
    
    api.add_namespace(pizza_categories_ns)
    api.add_namespace(pizzas_ns)
    api.add_namespace(jwt_ns)

    if migrate:
        prepare_folders()

        with app.app_context():
            if drop:
                db.drop_all()
            db.create_all()
            db.session.commit()

    return app