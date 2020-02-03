import mongoengine as me
from models.meal import Ingredient, Meal, Measure, Nutrient
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError

me.connect('jdtest', host='mongodb://jd:password1@ds225205.mlab.com:25205/jdtest?retryWrites=false')

m1 = Measure(amount=1.0, unitLong='g', unitShort='g')


ing = Ingredient(id=1, name='butter', amount=1.0, measures=[m1])

nutr = Nutrient(title='Protein', amount=1.0, unit='g')
#
meal = Meal(id=1, title='My First Meal', servings=1, ingredients=[ing], nutrients=[nutr])

try:
    meal.save(force_insert=True)
except NotUniqueError:
    print("error occurred")

#
# API_KEY = ''
# API_RECIPE_BULK_ENDPOINT = 'https://api.spoonacular.com/recipes/informationBulk'
# recipe_ids = []
#
# PARAMS = {'apiKey': API_KEY, 'ids': recipe_ids, 'includeNutrition': True}