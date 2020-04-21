import csv
import mongoengine as me
from mongoengine.errors import DoesNotExist, FieldDoesNotExist, NotUniqueError

import sys
sys.path.append('../')
from models.dietary_restriction import DietaryRestriction, Restriction

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
    maxChol = float(nutrientRows[ind][20]) if (nutrientRows[ind][0].split(',')[0] == "Diabetes" or nutrientRows[ind][0].split(',')[0] == "CVD" or nutrientRows[ind][0].split(',')[0] == "Hypertension") else None
    minPhos = float(nutrientRows[ind][61]) if nutrientRows[ind][0].split(',')[0] == "CKD Stage 5 w/ RRT" else None
    maxPhos = None if len(nutrientRows[ind][62]) == 0 else float(nutrientRows[ind][62])
    minPot = float(nutrientRows[ind][63]) if nutrientRows[ind][0].split(',')[0] == "CKD Stage 5 w/ RRT" else None
    maxPot = None if len(nutrientRows[ind][64]) == 0 else float(nutrientRows[ind][64])
    minCalcium = 1000 * float(nutrientRows[ind][15]) if nutrientRows[ind][0].split(',')[0] == "CKD Stage 5 w/ RRT" else None
    minSod = float(nutrientRows[ind][67]) if nutrientRows[ind][0].split(',')[0] == "CKD Stage 5 w/ RRT" else None

    # Multiply kcal by RBW (same as for calories)
    restrictionList = [Restriction(name = "Calories", value = float(nutrientRows[ind][1]), unit = 'g/kg', is_min = True, is_multiplier = True),
    Restriction(name = "Calories", value = float(nutrientRows[ind][2]), unit = 'g/kg', is_multiplier = True),
    Restriction(name = "Protein", value = float(nutrientRows[ind][3]), unit = 'g', is_min = True, is_multiplier = True),
    Restriction(name = "Protein", value = float(nutrientRows[ind][4]), unit = 'g', is_multiplier = True),
    Restriction(name = "Fat", value = float(nutrientRows[ind][8]) * float(nutrientRows[ind][2]) / 9, unit = 'g', is_multiplier = True),
    Restriction(name = "Calcium", value = minCalcium, unit = 'mg', is_min = True),
    Restriction(name = "Cholesterol", value = maxChol, unit = 'mg'),
    Restriction(name = "Saturated Fat", value = float(nutrientRows[ind][24]) * float(nutrientRows[ind][2]), unit = 'g', is_multiplier = True),
    Restriction(name = "Fiber", value = float(nutrientRows[ind][47]), unit = 'g', is_min = True),
    Restriction(name = "Magnesium", value = float(nutrientRows[ind][57]), unit = 'mg', is_min = True),
    Restriction(name = "Phosphorus", value = minPhos, unit = 'mg', is_min = True),
    Restriction(name = "Phosphorus", value = maxPhos, unit = 'mg'),
    Restriction(name = "Potassium", value = minPot, unit = 'mg', is_min = True),
    Restriction(name = "Potassium", value = maxPot, unit = 'mg'),
    Restriction(name = "Sodium", value = minSod, unit = 'mg', is_min = True),
    Restriction(name = "Sodium", value = float(nutrientRows[ind][68]), unit = 'mg')]

    count = 0
    while(count < len(restrictionList)):
        if restrictionList[count].value == None:
            del restrictionList[count]
            count -= 1
        count += 1
    
    params = nutrientRows[ind][0].split(',')
    maxAge = None if len(params[3]) == 0 else int(params[3])
    dietaryRestriction = DietaryRestriction(name = (params[0] + " Min"), gender = params[1], min_age = int(params[2]), max_age = maxAge, restrictions = restrictionList)

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