from flask_restful import Resource
from flask_jwt_extended import jwt_required
from models.dietary_restriction import DietaryRestriction


class DietaryRestrictionApi(Resource):

    # @jwt_required
    def get(self):
        diets = list(DietaryRestriction.objects.values_list("pk").order_by('pk'))
        return diets, 200
