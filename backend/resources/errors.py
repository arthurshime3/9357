class EmailAlreadyExistsError(Exception):
    pass


class InternalServerError(Exception):
    pass


class SchemaValidationError(Exception):
    pass


class UnauthorizedError(Exception):
    pass


errors = {
    "EmailAlreadyExistsError": {
         "message": "User with given email already exists",
         "status": 400
     },
    "InternalServerError": {
        "message": "The server encountered an unexpected condition which prevented it from fulfilling the request.",
        "status": 500
    },
    "SchemaValidationError": {
         "message": "Request is missing required fields",
         "status": 400
     },
    "UnauthorizedError": {
         "message": "Invalid email or password",
         "status": 401
    }
}