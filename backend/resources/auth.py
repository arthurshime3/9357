from flask import jsonify, request, make_response
from flask_restful import Resource
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, \
    set_access_cookies, unset_jwt_cookies
from models.user import User
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError
from .errors import EmailAlreadyExistsError, InternalServerError, UnauthorizedError, SchemaValidationError
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
            resp = make_response()
            resp.status_code = 200
            set_access_cookies(resp, access_token)
            return resp
        except DoesNotExist:
            raise UnauthorizedError

    @jwt_required
    def get(self):
        try:
            user_id = get_jwt_identity()
            user = User.objects.get(id=user_id)
            response = {"first_name": user.first_name,
                        "last_name": user.last_name}
            return response, 200
        except Exception as e:
            raise InternalServerError(e)


class LogoutApi(Resource):
    @jwt_required
    def get(self):
        resp = make_response()
        resp.status_code = 200
        unset_jwt_cookies(resp)
        return resp
