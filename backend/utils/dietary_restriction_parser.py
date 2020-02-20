import csv
import mongoengine as me
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError

import sys
sys.path.append('../')
from models.dietary_restriction import DietaryRestriction, Measurement

nutrients = "macro_micro_nutrients.csv"
ingredients = "excluded_ingredients.csv"

nutrientFields = [] 
nutrientRows = []
ingredientFields = []
ingredientRows = []
numRows = 0

with open(nutrients, 'r') as csvfile:
    csvreader = csv.reader(csvfile) 
      
    nutrientFields = next(csvreader)
  
    for row in csvreader: 
        nutrientRows.append(row)

    numRows = len(nutrientRows)

with open(ingredients, 'r') as csvfile: 
    csvreader = csv.reader(csvfile) 
      
    ingredientFields = next(csvreader)
  
    for row in csvreader: 
        ingredientRows.append(row)

restrictions = []

for ind in range(numRows):
    restriction = DietaryRestriction(name = nutrientRows[ind][0],
    excluded_ingredients = ingredientRows[ind][1].split(','),  # ERROR IN FORMATTING HERE??
    min_carbs = Measurement(multiplier = False, value = int(nutrientRows[ind][1]), unit = 'g'),
    max_carbs = Measurement(multiplier = False, value = int(nutrientRows[ind][2]), unit = 'g'),
    min_protein = Measurement(multiplier = False, value = int(nutrientRows[ind][3]), unit = 'g'),
    max_protein = Measurement(multiplier = False, value = int(nutrientRows[ind][4]), unit = 'g'),
    min_calories = Measurement(multiplier = False, value = int(nutrientRows[ind][5]), unit = 'cal'),
    max_calories = Measurement(multiplier = False, value = int(nutrientRows[ind][6]), unit = 'cal'),
    min_fat = Measurement(multiplier = False, value = int(nutrientRows[ind][7]), unit = 'g'),
    max_fat = Measurement(multiplier = False, value = int(nutrientRows[ind][8]), unit = 'g'),
    min_alcohol = Measurement(multiplier = False, value = int(nutrientRows[ind][9]), unit = 'g'),
    max_alcohol = Measurement(multiplier = False, value = int(nutrientRows[ind][10]), unit = 'g'),
    min_caffeine = Measurement(multiplier = False, value = int(nutrientRows[ind][11]), unit = 'mg'),
    max_caffeine = Measurement(multiplier = False, value = int(nutrientRows[ind][12]), unit = 'mg'),
    min_copper = Measurement(multiplier = False, value = int(nutrientRows[ind][13]), unit = 'mg'),
    max_copper = Measurement(multiplier = False, value = int(nutrientRows[ind][14]), unit = 'mg'),
    min_calcium = Measurement(multiplier = False, value = int(nutrientRows[ind][15]), unit = 'g'),
    max_calcium = Measurement(multiplier = False, value = int(nutrientRows[ind][16]), unit = 'g'),
    min_chlorine = Measurement(multiplier = False, value = int(nutrientRows[ind][17]), unit = 'mg'),
    max_chlorine = Measurement(multiplier = False, value = int(nutrientRows[ind][18]), unit = 'mg'),
    min_cholesterol = Measurement(multiplier = False, value = int(nutrientRows[ind][19]), unit = 'mg'),
    max_cholesterol = Measurement(multiplier = False, value = int(nutrientRows[ind][20]), unit = 'mg'),
    min_fluoride = Measurement(multiplier = False, value = int(nutrientRows[ind][21]), unit = 'mg'),
    max_fluoride = Measurement(multiplier = False, value = int(nutrientRows[ind][22]), unit = 'mg'),
    min_saturated_fat = Measurement(multiplier = False, value = int(nutrientRows[ind][23]), unit = 'g'),
    max_saturated_fat = Measurement(multiplier = False, value = int(nutrientRows[ind][24]), unit = 'g'),
    min_vitamin_a = Measurement(multiplier = False, value = int(nutrientRows[ind][25]), unit = 'IU'),
    max_vitamin_a = Measurement(multiplier = False, value = int(nutrientRows[ind][26]), unit = 'IU'),
    min_vitamin_c = Measurement(multiplier = False, value = int(nutrientRows[ind][27]), unit = 'mg'),
    max_vitamin_c = Measurement(multiplier = False, value = int(nutrientRows[ind][28]), unit = 'mg'),
    min_vitamin_d = Measurement(multiplier = False, value = int(nutrientRows[ind][29]), unit = 'μg'),
    max_vitamin_d = Measurement(multiplier = False, value = int(nutrientRows[ind][30]), unit = 'μg'),
    min_vitamin_e = Measurement(multiplier = False, value = int(nutrientRows[ind][31]), unit = 'mg'),
    max_vitamin_e = Measurement(multiplier = False, value = int(nutrientRows[ind][32]), unit = 'mg'),
    min_vitamin_k = Measurement(multiplier = False, value = int(nutrientRows[ind][33]), unit = 'μg'),
    max_vitamin_k = Measurement(multiplier = False, value = int(nutrientRows[ind][34]), unit = 'μg'),
    min_vitamin_b1 = Measurement(multiplier = False, value = int(nutrientRows[ind][35]), unit = 'mg'),
    max_vitamin_b1 = Measurement(multiplier = False, value = int(nutrientRows[ind][36]), unit = 'mg'),
    min_vitamin_b2 = Measurement(multiplier = False, value = int(nutrientRows[ind][37]), unit = 'mg'),
    max_vitamin_b2 = Measurement(multiplier = False, value = int(nutrientRows[ind][38]), unit = 'mg'),
    min_vitamin_b5 = Measurement(multiplier = False, value = int(nutrientRows[ind][39]), unit = 'mg'),
    max_vitamin_b5 = Measurement(multiplier = False, value = int(nutrientRows[ind][40]), unit = 'mg'),
    min_vitamin_b3 = Measurement(multiplier = False, value = int(nutrientRows[ind][41]), unit = 'mg'),
    max_vitamin_b3 = Measurement(multiplier = False, value = int(nutrientRows[ind][42]), unit = 'mg'),
    min_vitamin_b6 = Measurement(multiplier = False, value = int(nutrientRows[ind][43]), unit = 'mg'),
    max_vitamin_b6 = Measurement(multiplier = False, value = int(nutrientRows[ind][44]), unit = 'mg'),
    min_vitamin_b12 = Measurement(multiplier = False, value = int(nutrientRows[ind][45]), unit = 'μg'),
    max_vitamin_b12 = Measurement(multiplier = False, value = int(nutrientRows[ind][46]), unit = 'μg'),
    min_fiber = Measurement(multiplier = False, value = int(nutrientRows[ind][47]), unit = 'g'),
    max_fiber = Measurement(multiplier = False, value = int(nutrientRows[ind][48]), unit = 'g'),
    min_folate = Measurement(multiplier = False, value = int(nutrientRows[ind][49]), unit = 'g'),
    max_folate = Measurement(multiplier = False, value = int(nutrientRows[ind][50]), unit = 'g'),
    min_folic_acid = Measurement(multiplier = False, value = int(nutrientRows[ind][51]), unit = 'g'),
    max_folic_acid = Measurement(multiplier = False, value = int(nutrientRows[ind][52]), unit = 'g'),
    min_iodine = Measurement(multiplier = False, value = int(nutrientRows[ind][53]), unit = 'g'),
    max_iodine = Measurement(multiplier = False, value = int(nutrientRows[ind][54]), unit = 'g'),
    min_iron = Measurement(multiplier = False, value = int(nutrientRows[ind][55]), unit = 'mg'),
    max_iron = Measurement(multiplier = False, value = int(nutrientRows[ind][56]), unit = 'mg'),
    min_magnesium = Measurement(multiplier = False, value = int(nutrientRows[ind][57]), unit = 'mg'),
    max_magnesium = Measurement(multiplier = False, value = int(nutrientRows[ind][58]), unit = 'mg'),
    min_manganese = Measurement(multiplier = False, value = int(nutrientRows[ind][59]), unit = 'mg'),
    max_manganese = Measurement(multiplier = False, value = int(nutrientRows[ind][60]), unit = 'mg'),
    min_phosphorus = Measurement(multiplier = False, value = int(nutrientRows[ind][61]), unit = 'mg'),
    max_phosphorus = Measurement(multiplier = False, value = int(nutrientRows[ind][62]), unit = 'mg'),
    min_potassium = Measurement(multiplier = False, value = int(nutrientRows[ind][63]), unit = 'mg'),
    max_potassium = Measurement(multiplier = False, value = int(nutrientRows[ind][64]), unit = 'mg'),
    min_selenium = Measurement(multiplier = False, value = int(nutrientRows[ind][65]), unit = 'g'),
    max_selenium = Measurement(multiplier = False, value = int(nutrientRows[ind][66]), unit = 'g'),
    min_sodium = Measurement(multiplier = False, value = int(nutrientRows[ind][67]), unit = 'mg'),
    max_sodium = Measurement(multiplier = False, value = int(nutrientRows[ind][68]), unit = 'mg'),
    min_sugar = Measurement(multiplier = False, value = int(nutrientRows[ind][69]), unit = 'g'),
    max_sugar = Measurement(multiplier = False, value = int(nutrientRows[ind][70]), unit = 'g'),
    min_zinc = Measurement(multiplier = False, value = int(nutrientRows[ind][71]), unit = 'mg'),
    max_zinc = Measurement(multiplier = False, value = int(nutrientRows[ind][72]), unit = 'mg'))

    restrictions.append(restriction)

me.connect('jdtest', host='mongodb://jd:password1@ds225205.mlab.com:25205/jdtest?retryWrites=false')

for restriction in restrictions:
    try:
    	try:
		    restriction.save(force_insert=True)
    	except NotUniqueError:
    		print("error occurred")
    except me.errors.ValidationError:
        print("skip")