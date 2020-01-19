from .auth import RegistrationApi, LoginApi


def initialize_routes(api):
    api.add_resource(RegistrationApi, '/api/register')
    api.add_resource(LoginApi, '/api/login')
