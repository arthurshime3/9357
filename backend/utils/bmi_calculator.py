
## Input:
## MD inputs weight, height and gender in IMPERIAL units

## Output:
## Program output Recommended Body Weight (RBW) in kg

def bmiCalculator(weight, height, gender):
    return ((height/39.37)**2) * bmi((weight/(2.205))/((height/39.37)**2), gender)

def bmi(bmiCalc, gender):
    if bmiCalc < 18.5: return (23 if gender == "male" else 22) # underweight
    return (bmiCalc if bmiCalc < 25 else 24.9) # normal vs. overweight/obese (obese if bmi >= 30)