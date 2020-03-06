
## BMI calculator class
## Greg Varghese

## Input:
## MD inputs weight, height and gender in IMPERICAL units

## Output:
## Program output Recommended Body Weight (RBW) in kg


def bmiCalculator(weight, height, gender):
    height_kg = height/39.37
    dry_weight_meters = weight/(2.205)
    bmiCalc = dry_weight_meters/((height_kg)**2)

    bmiFunc = bmi(bmiCalc, gender)
    rbw_in_kg = (height_kg**2) * bmiFunc
    return(rbw_in_kg)





def bmi(bmiCalc, gender):
    if bmiCalc < 18.5: #underweight
        if gender == "male":
            bmiAfter = 23
        elif gender == "female":
            bmiAfter = 22
    if bmiCalc >= 18.5 and bmiCalc < 25: #normal
        bmiAfter = bmiCalc
    if bmiCalc >= 25 and bmiCalc < 30: #overweight
        bmiAfter = 24.9
    if bmiCalc >= 30: #obese
        bmiAfter = 24.9
    return bmiAfter
    ##print(bmiAfter)
