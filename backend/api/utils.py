
from api.cloud.uploader import upload_image, delete_image
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from string import ascii_letters
from uuid import uuid4

GEO_TO_EN = {
    'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e',
    'ვ': 'v', 'ზ': 'z', 'თ': 't', 'ი': 'i', 'კ': 'k',
    'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 'პ': 'p',
    'ჟ': 'zh', 'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u',
    'ფ': 'p', 'ქ': 'q', 'ღ': 'gh', 'ყ': 'y', 'შ': 'sh',
    'ჩ': 'ch', 'ც': 'c', 'ძ': 'dz', 'წ': 'w', 'ჭ': 'w',
    'ხ': 'kh', 'ჯ': 'j', 'ჰ': 'h'
}

def update_old_image(
        file: FileStorage,
        old_public_id: str,
        old_image_format: str
    ) -> tuple[str]:
    
    if not file or file.filename == "":
        return old_public_id, old_image_format
    
    filename = secure_filename(file.filename)
    unique_name = f"{uuid4().hex}_{filename}"
    file.filename = unique_name

    delete_image(old_public_id)

    image_info: dict[str, str] = upload_image(file)

    return image_info['public_id'], image_info['format']

def save_image_file(file: FileStorage) -> tuple[str]:
    filename: str = f'{uuid4().hex}-{secure_filename(file.filename)}'

    file.filename = filename

    image_info: dict[str, str] = upload_image(file)

    return image_info['public_id'], image_info['format']

def slugify(name: str) -> str:
    res: str = ''
    for char in name:
        if char in (' ', '_', '-'):
            res += '-'
        else:
            try:
                res += GEO_TO_EN[char]
            except KeyError:
                if char in ascii_letters:
                    res += char.lower()
                else:
                    continue
    return res