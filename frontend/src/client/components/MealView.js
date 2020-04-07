import React from 'react';
import { format, startOfToday, startOfWeek, addDays } from 'date-fns';
import '../css/MealView.css';

const processMealData = (data) => {
    const nutrients = data.nutrients;
    const transformedNutrients = {};
    // console.log(nutrients);
    for (const [name, nutrient] of Object.entries(nutrients)) {
        transformedNutrients[nutrient.title.toLowerCase()] = {
            amount: nutrient.amount,
            unit: nutrient.unit,
        };
    }

    return {
        title: data.title,
        image: data.image,
        ...transformedNutrients,
    };
};

const MealView = (props) => {
    const makeMealBoxData = (data, mealName) => {
        return (
            <>
                <div className="WhichMeal">{mealName}</div>
                <div className="MealTitle">
                    <p>{data.title}</p>
                </div>

                <img src={data.image} />
                <div className="MealFacts">
                    <p>{data.calories.amount} calories</p>
                    <p>
                        Carbs: {data.carbohydrates.amount}
                        {data.carbohydrates.unit}
                    </p>
                    <p>
                        Protein: {data.protein.amount}
                        {data.protein.unit}
                    </p>
                    <p>
                        Fat: {data.fat.amount}
                        {data.fat.unit}
                    </p>
                </div>
            </>
        );
    };
    const makeMealBox = (data, i) => {
        return (
            <div className="MealViewBox" key={i}>
                <div className="MealDay">
                    <p>
                        {format(
                            addDays(startOfWeek(startOfToday()), i),
                            'EEEE',
                        )}
                    </p>
                </div>
                {makeMealBoxData(data[0], 'Breakfast')}
                {makeMealBoxData(data[1], 'Lunch')}
                {makeMealBoxData(data[2], 'Dinner')}
            </div>
        );
    };

    const mealBoxes = [];
    console.log(props.data);
    props.data.forEach((singleDayOfMeals, idx) => {
        mealBoxes.push(makeMealBox(singleDayOfMeals.map(processMealData), idx));
    });

    return <div className="MealView">{mealBoxes}</div>;
};

export default MealView;
