from flask_restful import Resource
from flask_jwt_extended import jwt_required
from webargs import fields
from webargs.flaskparser import use_args
from models.meal import Meal


class GroceryApi(Resource):
    @jwt_required
    @use_args({'meals': fields.List(fields.Int())})
    def post(self, args):
        meals = Meal.objects().only('ingredients').in_bulk(args.get('meals'))
        grocery = dict()
        num_not_same = 0
        for meal in meals.values():
            for ingredient in meal.ingredients:
                if ingredient.name in grocery:
                    if grocery[ingredient.name]['unit'] == ingredient.measures[0].unitShort:
                        grocery[ingredient.name]['amount'] += ingredient.measures[0].amount
                    # else:
                    #     print(ingredient.name)
                    #     print(grocery[ingredient.name]['unit'])
                    #     print(ingredient.measures[0].unitShort)
                        num_not_same += 1
                else:
                    grocery[ingredient.name] = {'amount': ingredient.measures[0].amount,
                                                'unit': ingredient.measures[0].unitShort}
        print(num_not_same)
        return grocery, 200
