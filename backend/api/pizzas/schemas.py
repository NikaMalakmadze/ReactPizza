
from pydantic import BaseModel, Field, field_validator, ConfigDict
from werkzeug.datastructures import FileStorage
from typing import Optional

from api.pizzaCategory.models import PizzaCategory

class PizzaCreateSchema(BaseModel):
    title: str
    pizza_types: list[int]
    pizza_sizes: list[int]
    bake_time: list[str]
    price: int
    discount_percent: Optional[int] = 0
    score: int = 0
    is_vegan: bool = False
    is_spicy: bool = False
    image_file: Optional[FileStorage]
    category_id: int
    avaliable: bool = True

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @field_validator('pizza_types')
    @classmethod
    def validate_pizza_types(cls, v):
        try:
            v = list(map(int, v))
        except (TypeError, ValueError):
            raise ValueError('pizza_types invalid data type')

        if len(v) not in (1, 2):
            return ValueError('invalid amount of pizza_types')
        if not all(t in [0, 1] for t in v):
            raise ValueError("pizza_types can only contain 0 or 1")
        return sorted(v)

    @field_validator('pizza_sizes')
    @classmethod
    def validate_pizza_sizes(cls, v):
        try:
            v = list(map(int, v))
        except (TypeError, ValueError):
            raise ValueError('pizza_sizes invalid data type')

        if not v or len(v) not in (1, 2, 3):
            raise ValueError("invalid amount of pizza_sizes")
        for size in v:
            if size < 20 or size > 50:
                raise ValueError("pizza_sizes must be between 20 and 50")
        return sorted(v)
    
    @field_validator('bake_time')
    @classmethod
    def validate_bake_time(cls, v):
        try:
            v = list(map(int, v))
        except (TypeError, ValueError):
            raise ValueError('pizza_sizes invalid data type')
        
        if len(v) not in (1, 2):
            raise ValueError('invalid pizza bake time')
        
        return v
    
    @field_validator('image_file')
    @classmethod
    def validate_image_file(cls, file: Optional[FileStorage]):
        if not file or file.filename == '':
            raise ValueError("No file selected")
        return file
    
    @field_validator('category_id')
    @classmethod
    def validate_name(cls, id: int):
        pizza_category: PizzaCategory = PizzaCategory.query.filter_by(id=id).first()
        if not pizza_category:
            raise ValueError(f"category with inputed id - {id} doesn't exists")
        return id
    
    @field_validator('price')
    @classmethod
    def validate_price(cls, price: int):
        try: 
            inted_price = int(price)
        except (TypeError, ValueError):
            raise ValueError('Pizza price must be integer')
        
        if price < 0:
            raise ValueError('Pizza price must be greter than 0')
        
        return inted_price

    @field_validator('discount_percent')
    @classmethod
    def validate_dicount(cls, discount: int):
        try: 
            inted_discount = int(discount)
        except (TypeError, ValueError):
            raise ValueError('Pizza discount must be integer')
        
        if not (0 <= inted_discount <= 100):
            raise ValueError('Pizza discount must be between 0 and 100')
        
        return inted_discount
    
    @field_validator('is_vegan', 'is_vegan', 'avaliable')
    @classmethod
    def validate_bool_values(cls, value: bool):
        if type(value) is not bool:
            raise ValueError('This field should contain boolean value')
        return value

class PizzaUpdateSchema(BaseModel):
    title: Optional[str] = None
    image_file: Optional[FileStorage] = None
    pizza_types: Optional[list[str]] = None
    pizza_sizes: Optional[list[str]] = None
    bake_time: Optional[list[int]] = None
    price: Optional[int] = None
    discount_percent: Optional[int] = None
    score: Optional[int] = None
    is_vegan: Optional[bool] = None
    is_spicy: Optional[bool] = None
    avaliable: Optional[bool] = None
    category_id: Optional[int] = None

    model_config = ConfigDict(arbitrary_types_allowed=True)

    @field_validator('pizza_types', mode='before')
    def validate_pizza_types(cls, v):
        if isinstance(v, str):
            v = [int(i) for i in v.split(',') if i.strip()]
        try:
            v = list(map(int, v))
        except (TypeError, ValueError):
            raise ValueError('pizza_types invalid data type')

        if len(v) not in (1, 2):
            raise ValueError('invalid amount of pizza_types')
        if not all(t in [0, 1] for t in v):
            raise ValueError("pizza_types can only contain 0 or 1")
        return sorted(v)

    @field_validator('pizza_sizes', mode='before')
    @classmethod
    def validate_pizza_sizes(cls, v):
        if isinstance(v, str):
            v = [int(i) for i in v.split(',') if i.strip()]
        try:
            v = list(map(int, v))
        except (TypeError, ValueError):
            raise ValueError('pizza_sizes invalid data type')

        if not v or len(v) not in (1, 2, 3):
            raise ValueError("invalid amount of pizza_sizes")
        for size in v:
            if size < 20 or size > 50:
                raise ValueError("pizza_sizes must be between 20 and 50")
        return sorted(v)
    
    @field_validator('bake_time')
    @classmethod
    def validate_bake_time(cls, v):
        try:
            v = list(map(int, v))
        except (TypeError, ValueError):
            raise ValueError('pizza_sizes invalid data type')
        
        if len(v) not in (1, 2):
            raise ValueError('invalid pizza bake time')
        
        return v

    @field_validator('image_file')
    @classmethod
    def validate_image_file(cls, file):
        if file is None or (hasattr(file, 'filename') and file.filename == ''):
            raise ValueError("No file selected")
        return file

    @field_validator('category_id')
    @classmethod
    def validate_category_id(cls, id):
        pizza_category = PizzaCategory.query.filter_by(id=id).first()
        if not pizza_category:
            raise ValueError(f"Category with id {id} does not exist")
        return id

    @field_validator('price')
    @classmethod
    def validate_price(cls, price):
        try:
            inted_price = int(price)
        except (TypeError, ValueError):
            raise ValueError('Pizza price must be integer')

        if inted_price < 0:
            raise ValueError('Pizza price must be greater than 0')

        return inted_price

    @field_validator('discount_percent')
    @classmethod
    def validate_discount(cls, discount):
        try:
            inted_discount = int(discount)
        except (TypeError, ValueError):
            raise ValueError('Pizza discount must be integer')

        if not (0 <= inted_discount <= 100):
            raise ValueError('Pizza discount must be between 0 and 100')

        return inted_discount

    @field_validator('is_vegan', 'is_spicy', 'avaliable')
    @classmethod
    def validate_bool_values(cls, value):
        if not isinstance(value, bool):
            raise ValueError('This field should contain boolean value')
        return value

class NutritionPerSize(BaseModel):
    calories: int
    protein: int

class Nutrition(BaseModel):
    s26: Optional[NutritionPerSize] = Field(None, alias="26")
    s30: Optional[NutritionPerSize] = Field(None, alias="30")
    s40: Optional[NutritionPerSize] = Field(None, alias="40")