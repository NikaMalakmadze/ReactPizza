
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv('/etc/secrets/.env')

BASE_DIR: Path = Path(__file__).resolve().parent
FILES_FOLDER_NAME: str = 'uploads'
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

    UPLOAD_FOLDER: Path = BASE_DIR / "api" / FILES_FOLDER_NAME

class JWT(BaseModel):
    PRIVATE_KEY: Path = Path(os.environ.get('JWT_PRIVATE_KEY_PATH', '/etc/secrets/jwt-private.pem'))
    PUBLIC_KEY: Path = Path(os.environ.get('JWT_PUBLIC_KEY_PATH', '/etc/secrets/jwt-public.pem'))
    ALGORITHM: str = 'RS256'

    JWT_ACCESS_TOKEN_EXPIRES: int = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES_MINUTES'))
    JWT_REFRESH_TOKEN_EXPIRES: int = int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRES_MINUTES'))
    
    AUTHORIZATIONS: dict[str, dict] = AUTHORIZATIONS
    SECRET_PASSWORD: str = str(os.environ.get('SECRET_PASSWORD'))

class Settings(BaseSettings):
    DEBUG: bool = True
    TESTING: bool = False

    db: DbSettings = DbSettings()
    jwt: JWT = JWT()

    model_config = SettingsConfigDict(env_file='/etc/secrets/.env', extra='allow')

settings: Settings = Settings()

def prepare_folders() -> None:
    os.makedirs(settings.db.UPLOAD_FOLDER, exist_ok=True)