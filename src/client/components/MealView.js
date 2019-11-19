import React from 'react';
import { format, startOfToday, startOfWeek, addDays } from 'date-fns';
import '../css/MealView.css';

const MealView = props => {
    const makeMealBox = (data, i) => {
        return (
            <div className="MealViewBox" key={i}>
                <div className="MealDay">
                    <p>{format(addDays(startOfWeek(startOfToday()), i), 'EEEE')}</p>
                </div>
                <div className="MealTitle">
                    <p>{data.title}</p>
                </div>

                <img src={data.image} />
                <div className="MealFacts">
                    <p>{data.calories} calories</p>
                    <p>Carbs: {data.carbs}</p>
                    <p>Protein: {data.protein}</p>
                    <p>Fat: {data.fat}</p>
                </div>
            </div>
        );
    };

    const mealBoxes = [];
    props.data.forEach((singleMealData, idx) => {
        mealBoxes.push(makeMealBox(singleMealData, idx));
    });

    return <div className="MealView">{mealBoxes}</div>;
};

export default MealView;
