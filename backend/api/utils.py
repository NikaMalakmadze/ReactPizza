
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from string import ascii_letters
from pathlib import Path
from uuid import uuid4

from config import settings

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
    old_filename: str,
    upload_dir: Path,
) -> str:
    
    if not file or file.filename == "":
        return old_filename
    
    filename = secure_filename(file.filename)
    unique_name = f"{uuid4().hex}_{filename}"
    file_path = upload_dir / unique_name
    file.save(file_path)

    old_path = upload_dir / old_filename
    if old_path.exists():
        old_path.unlink()

    return unique_name

def save_image_file(file: FileStorage, image_folder: str) -> str:
    filename: str = f'{uuid4().hex}-{secure_filename(file.filename)}'
    file.save(settings.db.UPLOAD_FOLDER / image_folder / filename)
    return filename

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