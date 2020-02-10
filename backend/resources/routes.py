from .auth import RegistrationApi, LoginApi, LogoutApi
from .meals import MealApi


def initialize_routes(api):
    api.add_resource(RegistrationApi, '/api/register')
    api.add_resource(LoginApi, '/api/login')
    api.add_resource(LogoutApi, '/api/logout')
    api.add_resource(MealApi, '/api/meal')
