import React, { useContext } from 'react';
import { MealDataContext } from '../contexts/MealDataState';
import { navigate } from '@reach/router';
import MealView from './MealView';

import '../css/ViewMealScreen.css';


function ViewMealScreen() {
    const mealContext = useContext(MealDataContext);
    const mealData = mealContext[0].data;
    if (mealData == null || Object.entries(mealData).length === 0) {
        // if mealData is empty
        console.log('missing data!');
        setTimeout(() => navigate(`/create`), 1000);
        return (
            <div className="MainContent">
                <p>For some reason, there's no meal plan data...</p>
                <p>You should be redirected soon</p>
            </div>
        );
        // navigate(`/create`);
    }
    return (
        <div className="ViewMealScreen MainContent">
            <h1>Your Weekly Meal Plan</h1>
            {/* <p>Data received was:</p> */}
            {/* <p>{JSON.stringify(mealData)}</p> */}
            <MealView data={mealData}></MealView>
        </div>
    );
}

export default ViewMealScreen;
