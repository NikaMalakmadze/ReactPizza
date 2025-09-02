
from pydantic import BaseModel, field_validator

class PizzaCategoryCreate(BaseModel):
    name: str

    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        if len(v) > 100:
            raise ValueError('Category name is too long')
        return v