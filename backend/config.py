
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv('/etc/secrets/.env')

AUTHORIZATIONS = {
    'JWT': {
        'type': 'apiKey',
        'in': 'headers',
        'name': 'Authorization'
    }
}

class DbSettings(BaseModel):
    SQLALCHEMY_DATABASE_URI: str = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False

class CloudinarySettings(BaseModel):
    CLOUD_NAME: str = os.environ.get('CLOUDINARY_CLOUD_NAME')
    API_KEY: str = os.environ.get('CLOUDINARY_API_KEY')
    API_SECRET: str = os.environ.get('CLOUDINARY_API_SECRET')

    BASE_URL: str = f"https://res.cloudinary.com/{CLOUD_NAME}/image/upload/"

class JWT(BaseModel):
    PRIVATE_KEY: Path = Path(os.environ.get('JWT_PRIVATE_KEY_PATH', '/etc/secrets/jwt-private.pem'))
    PUBLIC_KEY: Path = Path(os.environ.get('JWT_PUBLIC_KEY_PATH', '/etc/secrets/jwt-public.pem'))
    ALGORITHM: str = 'RS256'

    JWT_ACCESS_TOKEN_EXPIRES: int = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES_MINUTES'))
    JWT_REFRESH_TOKEN_EXPIRES: int = int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRES_MINUTES'))
    
    AUTHORIZATIONS: dict[str, dict] = AUTHORIZATIONS
    SECRET_PASSWORD: str = str(os.environ.get('SECRET_PASSWORD'))

class Settings(BaseSettings):
    TESTING: bool = False
    DEBUG: bool = True

    cloudinary: CloudinarySettings = CloudinarySettings()
    db: DbSettings = DbSettings()
    jwt: JWT = JWT()

    model_config = SettingsConfigDict(env_file='/etc/secrets/.env', extra='allow')

settings: Settings = Settings()