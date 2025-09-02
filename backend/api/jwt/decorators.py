
from flask.globals import request
from functools import wraps

from api.jwt.exceptions import JWTAuthorizationError, JWTTokenError, NoAdminError
from api.jwt.utils import verify_token
from api.jwt.models import Admin

def jwt_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        authorization: str = request.headers.get('Authorization', None)

        if not authorization or not authorization.startswith('Bearer '):
            raise JWTAuthorizationError(
                message={"error": "Authorization header missing or invalid"},
                error_code=400
            )

        token: str = authorization.split()[1]
        payload: dict | None = verify_token(token)
        user_name: str | None = payload.get('user_name', None)

        if not payload or not user_name:
            raise JWTTokenError(
                message={"error": "Invalid token"},
                error_code=401
            )
        
        if not Admin.query.filter_by(name=user_name).first():
            raise NoAdminError(
                message={'error': "Admin with that username doesn't exists"},
                error_code=401
            )

        return fn(*args, **kwargs)
    return wrapper