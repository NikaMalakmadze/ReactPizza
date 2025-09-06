
from cloudinary import config
from config import settings

config(
    cloud_name = settings.cloudinary.CLOUD_NAME,
    api_key = settings.cloudinary.API_KEY,
    api_secret = settings.cloudinary.API_SECRET,
    secure = True
)