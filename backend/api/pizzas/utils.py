
from sqlalchemy.types import TypeDecorator, TEXT
import json

class JsonList(TypeDecorator):
    impl = TEXT

    def process_bind_param(self, value, dialect):
        if value is None:
            return '[]'
        return json.dumps(value)
    
    def process_result_value(self, value, dialect):
        if value is None:
            return []
        return json.loads(value)