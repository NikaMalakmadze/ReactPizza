
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import Integer, String

from api.extensions import db

class PizzaCategory(db.Model):
    __tablename__ = 'pizza_categories'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)

    pizzas: Mapped[list['Pizza']] = relationship('Pizza', back_populates='category')