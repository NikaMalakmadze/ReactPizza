
from sqlalchemy.types import Integer, String, Boolean, JSON, DateTime
from sqlalchemy.orm import mapped_column, Mapped, relationship
from datetime import datetime, timezone
from sqlalchemy import ForeignKey

from api.pizzas.utils import JsonList
from api.extensions import db

class Pizza(db.Model):
    __tablename__ = 'pizzas'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    title: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    slug: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String(300), nullable=False)

    ingredients: Mapped[list[str]] = mapped_column(JsonList)
    pizza_types: Mapped[list[int]] = mapped_column(JsonList)
    pizza_sizes: Mapped[list[int]] = mapped_column(JsonList)
    bake_time: Mapped[list[str]] = mapped_column(JsonList)

    price: Mapped[int] = mapped_column(Integer, nullable=False)
    discount_percent: Mapped[int] = mapped_column(Integer, default=0)

    score: Mapped[int] = mapped_column(Integer, default=0)
    is_vegan: Mapped[bool] = mapped_column(Boolean, default=False)
    is_spicy: Mapped[bool] = mapped_column(Boolean, default=False)

    nutrition_info: Mapped[JSON] = mapped_column(JSON, nullable=False, default={})

    image_file: Mapped[str] = mapped_column(String(500), nullable=False)

    category_id: Mapped[int] = mapped_column(ForeignKey('pizza_categories.id', ondelete='CASCADE'))
    category: Mapped['PizzaCategory'] = relationship('PizzaCategory', back_populates='pizzas')

    avaliable: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc), 
        onupdate=lambda: datetime.now(timezone.utc)
    )

    def to_dict(self):
        nutrition = {
            size: {
                "calories": self.nutrition_info.get(size).get('calories') ,
                "protein": self.nutrition_info.get(size).get('protein')
            } for size in ["26", "30", "40"] if self.nutrition_info.get(size)
        }

        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "description": self.description,
            "nutrition": nutrition,
            "ingredients": self.ingredients,
            "pizza_types": self.pizza_types,
            "pizza_sizes": self.pizza_sizes,
            "bake_time": self.bake_time,
            "price": self.price,
            "discount_percent": self.discount_percent,
            "category_id": self.category_id,
            "image_file": self.image_file,
            "score": self.score,
            'is_vegan': self.is_vegan,
            'is_spicy': self.is_spicy,
            'avaliable': self.avaliable,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S') if self.created_at else None,
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S') if self.updated_at else None
        }