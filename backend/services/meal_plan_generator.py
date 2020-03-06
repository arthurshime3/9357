from models.meal import Meal
from models.dietary_restriction import DietaryRestriction
from pulp import *

def transform_nutrients(nutrients):
    transformed = {}
    for nutrient in nutrients:
        transformed[nutrient["title"]] = nutrient
    return transformed


def generate_meal_plan(diet):
    # randomly sample meals from mongodb
    pipeline = [{'$sample': {'size': 100}}]
    meals = Meal.objects().aggregate(*pipeline)
    meals = list(meals)

    # convert nutrients to a dict
    for meal in meals:
        meal["nutrients"] = transform_nutrients(meal["nutrients"])

    # convert meals to dict, key is _id
    meal_dict = {meal["_id"]: meal for meal in meals}

    meal_ids = list(meal_dict.keys())


    # create pulp problem
    prob = LpProblem("Daily_Meal_Plan", LpMinimize)

    # create meal variables based on meal ids
    meal_vars = LpVariable.dicts("Meal", meal_ids, lowBound=0, upBound=1, cat='Integer')

    # create variables that keep track of if a meal has been chosen
    meals_chosen = LpVariable.dict("chosen", meal_ids, lowBound=0, upBound=1, cat='Integer')

    # objective function
    prob += lpSum([meal_dict.get(i)["pricePerServing"] * meal_vars[i] for i in meal_ids])

    # only pick 3 meals
    # for i in meal_ids:
    #     #     prob += meal_vars[i] <= meals_chosen[i]*1e5
    #     # prob += lpSum(meals_chosen.get(i) for i in meal_ids) == 3
    prob += lpSum(meal_vars[i] for i in meal_ids) == 3

    # constraints
    prob += lpSum([meal_dict.get(i)["nutrients"]["Calories"]["amount"] * meal_vars[i] for i in meal_ids]) >= 800.0

    prob += lpSum([meal_dict.get(i)["nutrients"]["Calories"]["amount"] * meal_vars[i] for i in meal_ids]) <= 2400

    prob.solve()

    # for v in prob.variables():
    #     if v.varValue > 0:
    #         print(v.name, "=", v.varValue)

    for i in meal_ids:
        if (meal_vars[i].value() > 0):
            print(i)

    return [meal_dict.get(i) for i in meal_ids if meal_vars[i].value() > 0]
