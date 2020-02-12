from models.meal import Meal


def generate_meal_plan():
    pipeline = [{'$sample': {'size': 3}}]
    result = Meal.objects().aggregate(*pipeline)
    result = list(result)
    return result
