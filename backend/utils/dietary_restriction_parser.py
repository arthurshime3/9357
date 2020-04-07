import csv
import mongoengine as me
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError

import sys
sys.path.append('../')
from models.dietary_restriction import DietaryRestriction, Restriction

# Message Marisa about how to deal with 45% min kcal units (based on calories calculation??) (units on kcal/min calories/ g/kg BW/day)
# Multiply kcal by RBW (same as for calories)

nutrients = "GT Nutrients.csv"

nutrientRows = []
numRows = 0

with open(nutrients, 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    temp = next(csvreader)
  
    for row in csvreader: nutrientRows.append(row)
    numRows = len(nutrientRows)

dietaryRestrictions = []

for ind in range(numRows):
    maxChol = None if len(nutrientRows[ind][20]) == 0 else float(nutrientRows[ind][20])
    maxPhos = None if len(nutrientRows[ind][62]) == 0 else float(nutrientRows[ind][62])
    maxPot = None if len(nutrientRows[ind][64]) == 0 else float(nutrientRows[ind][64])

    restrictionList = [Restriction(name = "Calories", value = float(nutrientRows[ind][1]), unit = 'g/kg', is_min = True, is_multiplier = True),
    Restriction(name = "Calories", value = float(nutrientRows[ind][2]), unit = 'g/kg', is_multiplier = True),
    Restriction(name = "Protein", value = float(nutrientRows[ind][3]), unit = 'g', is_min = True, is_multiplier = True),
    Restriction(name = "Protein", value = float(nutrientRows[ind][4]), unit = 'g', is_multiplier = True),
    Restriction(name = "Carbohydrates", value = float(nutrientRows[ind][5]) * float(nutrientRows[ind][1]), unit = 'g', is_min = True, is_multiplier = True),
    Restriction(name = "Carbohydrates", value = float(nutrientRows[ind][6]) * float(nutrientRows[ind][2]), unit = 'g', is_multiplier = True),
    Restriction(name = "Fat", value = float(nutrientRows[ind][7]) * float(nutrientRows[ind][1]), unit = 'g', is_min = True, is_multiplier = True),
    Restriction(name = "Fat", value = float(nutrientRows[ind][8]) * float(nutrientRows[ind][2]), unit = 'g', is_multiplier = True),
    Restriction(name = "Alcohol", value = None, unit = 'g', is_min = True),
    Restriction(name = "Alcohol", value = float(nutrientRows[ind][10]), unit = 'g'),
    Restriction(name = "Caffeine", value = None, unit = 'mg', is_min = True),
    Restriction(name = "Caffeine", value = None, unit = 'mg'),
    Restriction(name = "Copper", value = float(nutrientRows[ind][13]), unit = 'mg', is_min = True),
    Restriction(name = "Copper", value = None, unit = 'mg'),
    Restriction(name = "Calcium", value = float(nutrientRows[ind][15]), unit = 'g', is_min = True),
    Restriction(name = "Calcium", value = None, unit = 'g'),
    Restriction(name = "Chloride", value = float(nutrientRows[ind][17]), unit = 'mg', is_min = True),
    Restriction(name = "Chloride", value = None, unit = 'mg'),
    Restriction(name = "Cholesterol", value = None, unit = 'mg', is_min = True),
    Restriction(name = "Cholesterol", value = maxChol, unit = 'mg'),
    Restriction(name = "Fluoride", value = float(nutrientRows[ind][21]), unit = 'mg', is_min = True),
    Restriction(name = "Fluoride", value = None, unit = 'mg'),
    Restriction(name = "Saturated Fat", value = None, unit = 'g', is_min = True, is_multiplier = True),
    Restriction(name = "Saturated Fat", value = float(nutrientRows[ind][24]) * float(nutrientRows[ind][2]), unit = 'g', is_multiplier = True),
    Restriction(name = "Vitamin A", value = None, unit = 'IU', is_min = True),
    Restriction(name = "Vitamin A", value = None, unit = 'IU'),
    Restriction(name = "Vitamin C", value = float(nutrientRows[ind][27]), unit = 'mg', is_min = True),
    Restriction(name = "Vitamin C", value = None, unit = 'mg'),
    Restriction(name = "Vitamin D", value = float(nutrientRows[ind][29]), unit = 'mmg', is_min = True),
    Restriction(name = "Vitamin D", value = None, unit = 'mmg'),
    Restriction(name = "Vitamin E", value = float(nutrientRows[ind][31]), unit = 'mg', is_min = True),
    Restriction(name = "Vitamin E", value = None, unit = 'mg'),
    Restriction(name = "Vitamin K", value = float(nutrientRows[ind][33]), unit = 'mmg', is_min = True),
    Restriction(name = "Vitamin K", value = None, unit = 'mmg'),
    Restriction(name = "Vitamin B1", value = float(nutrientRows[ind][35]), unit = 'mg', is_min = True),
    Restriction(name = "Vitamin B1", value = None, unit = 'mg'),
    Restriction(name = "Vitamin B2", value = float(nutrientRows[ind][37]), unit = 'mg', is_min = True),
    Restriction(name = "Vitamin B2", value = None, unit = 'mg'),
    Restriction(name = "Vitamin B5", value = float(nutrientRows[ind][39]), unit = 'mg', is_min = True),
    Restriction(name = "Vitamin B5", value = None, unit = 'mg'),
    Restriction(name = "Vitamin B3", value = float(nutrientRows[ind][41]), unit = 'mg', is_min = True),
    Restriction(name = "Vitamin B3", value = None, unit = 'mg'),
    Restriction(name = "Vitamin B6", value = float(nutrientRows[ind][43]), unit = 'mg', is_min = True),
    Restriction(name = "Vitamin B6", value = None, unit = 'mg'),
    Restriction(name = "Vitamin B12", value = float(nutrientRows[ind][45]), unit = 'mmg', is_min = True),
    Restriction(name = "Vitamin B12", value = None, unit = 'mmg'),
    Restriction(name = "Fiber", value = float(nutrientRows[ind][47]), unit = 'g', is_min = True),
    Restriction(name = "Fiber", value = None, unit = 'g'),
    Restriction(name = "Folate", value = float(nutrientRows[ind][49]), unit = 'g', is_min = True),
    Restriction(name = "Folate", value = None, unit = 'g'),
    Restriction(name = "Folic Acid", value = None, unit = 'g', is_min = True),
    Restriction(name = "Folic Acid", value = None, unit = 'g'),
    Restriction(name = "Iodine", value = float(nutrientRows[ind][53]), unit = 'g', is_min = True),
    Restriction(name = "Iodine", value = None, unit = 'g'),
    Restriction(name = "Iron", value = float(nutrientRows[ind][55]), unit = 'mg', is_min = True),
    Restriction(name = "Iron", value = None, unit = 'mg'),
    Restriction(name = "Magnesium", value = float(nutrientRows[ind][57]), unit = 'mg', is_min = True),
    Restriction(name = "Magnesium", value = None, unit = 'mg'),
    Restriction(name = "Manganese", value = float(nutrientRows[ind][59]), unit = 'mg', is_min = True),
    Restriction(name = "Manganese", value = None, unit = 'mg'),
    Restriction(name = "Phosphorus", value = float(nutrientRows[ind][61]), unit = 'mg', is_min = True),
    Restriction(name = "Phosphorus", value = maxPhos, unit = 'mg'),
    Restriction(name = "Potassium", value = float(nutrientRows[ind][63]), unit = 'mg', is_min = True),
    Restriction(name = "Potassium", value = maxPot, unit = 'mg'),
    Restriction(name = "Selenium", value = float(nutrientRows[ind][65]), unit = 'g', is_min = True),
    Restriction(name = "Selenium", value = None, unit = 'g'),
    Restriction(name = "Sodium", value = float(nutrientRows[ind][67]), unit = 'mg', is_min = True),
    Restriction(name = "Sodium", value = float(nutrientRows[ind][68]), unit = 'mg'),
    Restriction(name = "Sugar", value = None, unit = 'g', is_min = True),
    Restriction(name = "Sugar", value = None, unit = 'g'),
    Restriction(name = "Zinc", value = float(nutrientRows[ind][71]), unit = 'mg', is_min = True),
    Restriction(name = "Zinc", value = None, unit = 'mg')]
    
    params = nutrientRows[ind][0].split(',')
    maxAge = None if len(params[3]) == 0 else int(params[3])
    dietaryRestriction = DietaryRestriction(name = params[0], gender = params[1], min_age = int(params[2]), max_age = maxAge, restrictions = restrictionList)

    dietaryRestrictions.append(dietaryRestriction)

me.connect('jdtest', host='mongodb://jd:password1@ds225205.mlab.com:25205/jdtest?retryWrites=false')

for dietaryRestriction in dietaryRestrictions:
    try:
    	try:
		    dietaryRestriction.save(force_insert=True)
    	except NotUniqueError:
    		print("error occurred")
    except me.errors.ValidationError:
        print("skip")