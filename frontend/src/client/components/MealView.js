import React, { useEffect, useState } from 'react';
import { format, startOfToday, startOfWeek, addDays } from 'date-fns';

import MealDetailView from './MealDetailView';

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

    const out = {
        ...data,
        ...transformedNutrients,
    };
    delete out.nutrients;
    return out;
};

const MealView = (props) => {
    const [mealdetail, setmealdetail] = useState(null);
    useEffect(() => {
        console.log(mealdetail);
    });
    const makeMealBoxData = (data, mealName, day) => {
        return (
            <div
                onClick={() => {
                    setmealdetail(`${data._id}|${mealName}|${day}`);
                }}>
                <div className="WhichMeal">{mealName}</div>
                <div className="MealTitle">
                    <p>{data.title}</p>
                </div>

                <img src={data.image} />
            </div>
        );
    };
    const showMealBox = (id) => {
        const [name, meal, day] = id.split('|');
        const mealData = props.data[day].filter((m) => m._id == name)[0];
        return (
            <MealDetailView
                mealData={mealData}
                back={() => setmealdetail(null)}
            />
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
                {makeMealBoxData(data[0], 'Breakfast', i)}
                {makeMealBoxData(data[1], 'Lunch', i)}
                {makeMealBoxData(data[2], 'Dinner', i)}
            </div>
        );
    };

    const mealBoxes = [];
    console.log(props.data);
    props.data.forEach((singleDayOfMeals, idx) => {
        mealBoxes.push(makeMealBox(singleDayOfMeals.map(processMealData), idx));
    });

    return (
        <div className="MealView">
            {mealBoxes}
            {mealdetail && showMealBox(mealdetail)}
        </div>
    );
};

export default MealView;
