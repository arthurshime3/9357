from flask_restful import Resource
from flask_jwt_extended import jwt_required
from services.dietary_restriction_service import get_dietary_restrictions


class DietaryRestrictionApi(Resource):

    @jwt_required
    def get(self):
        diets = get_dietary_restrictions()
        return diets, 200
