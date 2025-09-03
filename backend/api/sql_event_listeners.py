from sqlalchemy import Engine, event

from api.pizzas.models import Pizza
from config import settings

@event.listens_for(Pizza, 'after_delete')
def delete_pizza_image(mapper, connection, target: Pizza):
    image_file: str = target.image_file
    if (settings.db.UPLOAD_FOLDER / image_file).exists():
        (settings.db.UPLOAD_FOLDER / image_file).unlink()

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()