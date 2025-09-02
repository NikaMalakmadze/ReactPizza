
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.types import Integer, String
import bcrypt

from api.extensions import db

class Admin(db.Model):
    __tablename__ = 'admins'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(400), nullable=False)

    def hash_password(self, password: str) -> None:
        bcrypt_salt: bytes = bcrypt.gensalt()
        password_bytes: bytes = password.encode()
        self.hashed_password = bcrypt.hashpw(password_bytes, bcrypt_salt)

    def validate_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode(), self.hashed_password)