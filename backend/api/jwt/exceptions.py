
class JWTAuthorizationError(Exception):
    def __init__(
        self,
        message: dict[str, str], 
        error_code: int
        ) -> None:
        super().__init__()
        self.message = message
        self.error_code = error_code

class JWTTokenError(Exception):
    def __init__(
        self,
        message: dict[str, str],
        error_code: int
    ) -> None:
        super().__init__()
        self.message = message
        self.error_code = error_code

class NoAdminError(Exception):
    def __init__(
        self,
        message: dict[str, str], 
        error_code: int
        ) -> None:
        super().__init__()
        self.message = message
        self.error_code = error_code