from flask_restful import Resource
from flask_jwt_extended import jwt_required
from webargs import fields
from webargs.flaskparser import use_args
from services.meal_plan_generator import generate_meal_plan
from models.dietary_restriction import DietaryRestriction

GENDERS = ['Male', 'Female', 'Other']


class MealPlanApi(Resource):

    # @jwt_required
    @use_args({'wt': fields.Int(required=True, load_only='weight', validate=lambda val: val > 0),
               'ht': fields.Int(required=True, load_only='height', validate=lambda val: val > 0),
               'bud': fields.Float(required=True, load_only='budget', validate=lambda val: val > 0),
               'diet': fields.DelimitedList(fields.Str(), required=True),
               'gen': fields.Str(required=True, validate=lambda val: val in GENDERS)})
    def post(self, args):
        diet = DietaryRestriction.objects.get(pk="Low FODMAP")
        meal_plan = [generate_meal_plan(diet) for i in range(1)]
        return meal_plan, 200
