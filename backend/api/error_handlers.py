
from api.jwt.exceptions import JWTAuthorizationError, JWTTokenError, NoAdminError

def init_error_handlers():
    from api.extensions import api

    @api.errorhandler(JWTAuthorizationError)
    def handle_auth_error(error: Exception):
        return {'message': error.message}, error.error_code

    @api.errorhandler(JWTTokenError)
    def handle_token_error(error: Exception):
        return {'message': error.message}, error.error_code
    
    @api.errorhandler(NoAdminError)
    def handle_admin_error(error: Exception):
        return {'message': error.message}, error.error_code