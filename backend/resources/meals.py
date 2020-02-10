from flask_restful import Resource
from flask_jwt_extended import jwt_required
from webargs import fields
from webargs.flaskparser import use_args
from models.meal import Meal


class MealApi(Resource):
    # @jwt_required
    @use_args({'number': fields.Int()})
    def get(self, args):
        pipeline = [{'$sample': {'size': 1}}]
        result = Meal.objects().aggregate(*pipeline)
        result = list(result)
        print(result)
        res = {'meals': list(result)}
        return res, 200
