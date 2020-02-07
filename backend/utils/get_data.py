import requests
import json
import mongoengine as me
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError
from tqdm import tqdm

import sys
sys.path.append('../')
from models.meal import Ingredient, Meal, Measure, Nutrient

def parse_meal(response_json):
		title = None
		image = None
		servings = None
		sourceUrl = None
		readyInMinutes = None
		pricePerServing = None
		cheap = bytes(False)
		diets = None
		dairyFree = bytes(False)
		glutenFree = bytes(False)
		ketogenic = bytes(False)
		lowFodmap = bytes(False)
		sustainable = bytes(False)
		vegan = bytes(False)
		vegetarian = bytes(False)
		dishTypes = None
		ings = None
		nutr = None

		if 'title' in response_json:
			title = response_json['title']
		if 'image' in response_json:
			image = response_json['image']
		if 'servings' in response_json:
			servings = response_json['servings']
		if 'sourceUrl' in response_json:
			sourceUrl = response_json['sourceUrl']
		if 'readyInMinutes' in response_json:
			readyInMinutes = response_json['readyInMinutes']
		if 'pricePerServing' in response_json:
			pricePerServing = response_json['pricePerServing']
		if 'cheap' in response_json:
			cheap = bytes(response_json['cheap'])
		if 'diets' in response_json:
			diets = response_json['diets']
		if 'dairyFree' in response_json:
			dairyFree = bytes(response_json['dairyFree'])
		if 'glutenFree' in response_json:
			glutenFree = bytes(response_json['glutenFree'])
		if 'ketogenic' in response_json:
			ketogenic = bytes(response_json['ketogenic'])
		if 'lowFodmap' in response_json:
			lowFodmap = bytes(response_json['lowFodmap'])
		if 'sustainable' in response_json:
			sustainable = bytes(response_json['sustainable'])
		if 'vegan' in response_json:
			vegan = bytes(response_json['vegan'])
		if 'vegetarian' in response_json:
			vegetarian = bytes(response_json['vegetarian'])
		if 'dishTypes' in response_json:
			dishTypes = response_json['dishTypes']

		if 'extendedIngredients' in response_json:
			ings = list()
			for ingredient in response_json['extendedIngredients']:
				measure = ingredient['measures']['us']
				m = Measure(amount=measure['amount'], unitLong=measure['unitLong'], unitShort=measure['unitShort'])
				ing = Ingredient(id=ingredient['id'], name=ingredient['name'], amount=ingredient['amount'], measures=[m])
				ings.append(ing)

		if 'nutrition' in response_json:
			nutr = list()
			for nutrient in response_json['nutrition']['nutrients']:
				nut = Nutrient(title=nutrient['title'], amount=nutrient['amount'], unit=nutrient['unit'], percentOfDailyNeeds=nutrient['percentOfDailyNeeds'])
				nutr.append(nut)

		# m1 = Measure(amount=1.0, unitLong='g', unitShort='g')
		# ing = Ingredient(id=1, name='butter', amount=1.0, measures=[m1])
		# nutr = Nutrient(title='Protein', amount=1.0, unit='g')

		meal = Meal(
			id=int(response_json['id']), 
			title=title, 
			image=image, 
			servings=servings, 
			sourceURL=sourceUrl,
			readyInMinutes=readyInMinutes,
			pricePerServing=pricePerServing,
			cheap=cheap,
			diets=diets,
			dairyFree=dairyFree,
			glutenFree=glutenFree,
			ketogenic=ketogenic,
			lowFodmap=lowFodmap,
			sustainable=sustainable,
			vegan=vegan,
			vegetarian=vegetarian,
			dishTypes=dishTypes,
			ingredients=ings, 
			nutrients=nutr)
		return meal

me.connect('jdtest', host='mongodb://jd:password1@ds225205.mlab.com:25205/jdtest?retryWrites=false')

headers = {
	"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.co",
	"x-rapidapi-key": "038a8a5cdemsh31ec49533d1ca9cp1dfbd7jsn1cf6b6966a3a"
}

for idx in tqdm(range(10, 20)):
	request_string = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/{}/information?includeNutrition=true".format(idx)
	try:
		response = requests.get(request_string, headers=headers)
		if response.status_code == 200:
			meal = parse_meal(response.json())
			try:
			    meal.save(force_insert=True)
			except NotUniqueError:
			    print("error occurred")
	except me.errors.ValidationError:
		print("\nskip")