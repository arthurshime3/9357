from models.meal import Meal
from models.dietary_restriction import DietaryRestriction
from services.dietary_restriction_service import get_dietary_restriction
from utils.bmi_calculator import bmiCalculator
from pulp import *


def transform_nutrients(nutrients):
    transformed = {}
    for nutrient in nutrients:
        transformed[nutrient["title"]] = nutrient
    return transformed


def generate_daily_meal_plan(weight, height, budget, dietary_restriction, gender, age):
    dietary_restriction = get_dietary_restriction(dietary_restriction, age, gender)
    rbw = bmiCalculator(weight, height, gender)
    # print("RBW", rbw)

    # meal prices are in us cents
    budget = budget * 100

    # randomly sample meals from mongodb
    pipeline = [{'$sample': {'size': 3000}}]
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

    # objective function
    prob += 0

    # limit number of meals chosen
    prob += lpSum([meal_vars[i] for i in meal_ids]) == 3, "Num meals"

    # budget constraint
    prob += lpSum([(meal_dict.get(i)["pricePerServing"]) * meal_vars[i] for i in meal_ids]) <= budget, "budget"

    # dietary restriction nutrition constraints
    for res in dietary_restriction['restrictions']:
        constraint = lpSum([(meal_dict[i]['nutrients'][res.name]['amount'] / meal_dict.get(i)["servings"]) * meal_vars[i] for i in meal_ids if res.name in meal_dict[i]['nutrients']])
        val = res.value
        if res.is_multiplier:
            val = val * rbw
        if res.is_min:
            prob += constraint >= val, "Min " + res.name
            # print("Min ", res.name, ": ", val)
        else:
            prob += constraint <= val, "Max " + res.name
            # print("Max ", res.name, ": ", val)

    prob.solve()
    print("Status:", LpStatus[prob.status])

    # only return if optimal else return no meals
    if LpStatus[prob.status] == "Optimal":
        return [meal_dict.get(i) for i in meal_ids if meal_vars[i].value() > 0]
    return []


def generate_meal_plan(days, weight, height, budget, dietary_restriction, gender, age):
    return [generate_daily_meal_plan(weight, height, budget, dietary_restriction, gender, age) for i in range(days)]
