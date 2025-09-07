
from pydantic import field_validator
from pydantic import BaseModel

from config import settings

class ValidateSecretKey(BaseModel):
    secret_key: str

    @field_validator('secret_key')
    @classmethod
    def validate_secret_key(cls, value: str):
        if value != settings.jwt.SECRET_PASSWORD:
            raise ValueError('Invalid Secret Key')
        return value
    
class ValidateRegister(ValidateSecretKey):
    name: str
    password: str

class ValidateTokenRefresh(ValidateSecretKey):
    refresh_token: str