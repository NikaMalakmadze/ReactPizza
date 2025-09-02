
from flask_restx import Namespace

jwt_ns: Namespace = Namespace('JWT', path='/jwt')

from . import resources