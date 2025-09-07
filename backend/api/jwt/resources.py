
from flask_restx.resource import Resource
from pydantic import ValidationError
from flask_restx import abort

from api.jwt.schemas import ValidateRegister, ValidateTokenRefresh
from api.jwt.api_models import register_model, refresh_model
from api.jwt.utils import generate_tokens, verify_token
from api.jwt.exceptions import NoAdminError
from api.jwt.models import Admin
from api.extensions import db
from api.jwt import jwt_ns

@jwt_ns.route('/register')
class AdminRegisterResouce(Resource):
    @jwt_ns.expect(register_model)
    def post(self):
        try:
            validated_data: ValidateRegister = ValidateRegister(**jwt_ns.payload)
        except ValidationError as e:
            errors = e.errors()
            error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
            abort(400, '; '.join(error_messages))

        if Admin.query.filter_by(name=validated_data.name).first():
            abort(400, 'Admin with That name already exists!')

        admin: Admin = Admin(name=validated_data.name)
        admin.hash_password(validated_data.password)

        access_token, refresh_token = generate_tokens(user_name=admin.name)

        db.session.add(admin)
        db.session.commit()

        return {
            'name': admin.name,
            'password': admin.hashed_password.decode("utf-8"),
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    
@jwt_ns.route('/login')
class AdminLoginResource(Resource):
    @jwt_ns.expect(register_model)
    def post(self):
        try:
            validated_data: ValidateRegister = ValidateRegister(**jwt_ns.payload)
        except ValidationError as e:
            errors = e.errors()
            error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
            abort(400, '; '.join(error_messages))

        user_name: str = validated_data.name
        admin: Admin = Admin.query.filter_by(name=user_name).first()
        if not admin:
            raise NoAdminError(
                message={'error': "Admin with that username doesn't exists"},
                error_code=401
            )

        if not admin.validate_password(validated_data.password):
            abort(400, 'Invalid Password')

        new_access_token, new_refresh_token = generate_tokens(user_name=user_name)
        
        return {
            'access_token': new_access_token,
            'refresh_token': new_refresh_token
        }
    
@jwt_ns.route('/refresh')
class TokenRefreshResource(Resource):
    @jwt_ns.expect(refresh_model)
    def post(self):
        try:
            validated_data: ValidateTokenRefresh = ValidateTokenRefresh(**jwt_ns.payload)
        except ValidationError as e:
            errors = e.errors()
            error_messages = [f"{err['loc'][0]}: {err['msg']}" for err in errors]
            abort(400, '; '.join(error_messages))

        refresh_token: dict | None = verify_token(validated_data.refresh_token, 'refresh')
        if not refresh_token:
            abort(401, 'Invalid or Expired Refresh Token')

        user_name: str = refresh_token.get('user_name')
        if not user_name:
            abort(401, 'Invalid Token Payload')

        new_access_token, new_refresh_token = generate_tokens(user_name)

        return {
            'access_token': new_access_token,
            'refresh_token': new_refresh_token
        }