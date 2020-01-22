from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from models.user import User
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError
from .errors import EmailAlreadyExistsError, UnauthorizedError, SchemaValidationError
import datetime


class RegistrationApi(Resource):
    def post(self):
        try:
            body = request.get_json()
            user = User(**body)
            user.hash_password()
            user.save()
        except FieldDoesNotExist:
            raise SchemaValidationError
        except NotUniqueError:
            raise EmailAlreadyExistsError
        return {'id': str(user.id)}, 200


class LoginApi(Resource):
    def post(self):
        try:
            body = request.get_json()
            user = User.objects.get(email=body.get('email'))
            if not user.check_password(body.get('password')):
                raise UnauthorizedError
            expires = datetime.timedelta(days=1)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {'token': access_token}, 200
        except DoesNotExist:
            raise UnauthorizedError
