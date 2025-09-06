
from werkzeug.datastructures import FileStorage
from cloudinary.uploader import upload, destroy

def upload_image(file: FileStorage) -> dict[str, str]:
    result = upload(file, folder="pizzas-kitchen")

    return {
        'public_id': result['public_id'],
        'format': result['format']
    }

def delete_image(public_id: str) -> str:
    result = destroy(public_id)
    return result['result']