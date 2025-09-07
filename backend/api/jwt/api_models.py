
from flask_restx import fields, Model

from api.jwt import jwt_ns

register_model: Model = jwt_ns.model('RegisterModel', {
    'name': fields.String,
    'password': fields.String,
    'secret_key': fields.String
})

refresh_model: Model = jwt_ns.model('RefreshModel', {
    'refresh_token': fields.String,
    'secret_key': fields.String
})