import React, { useContext, useEffect, useState } from 'react';
import { MealDataContext } from '../contexts/MealDataState';
import MealOne from '../testdata/MealOne';
import { getGroceryList } from '../req/request';

import '../css/ViewGroceryScreen.css';
import GroceryView from './GroceryView';
import { Link } from '@reach/router';

const ViewGroceryScreen = () => {
    const [grocerylist, setgrocerylist] = useState(null);
    const handleGetGroceryList = (data) => {
        setgrocerylist(data);
    };

    const mealContext = useContext(MealDataContext);
    let mealData = mealContext[0].data;

    if (mealData == null || Object.entries(mealData).length === 0) {
        mealData = JSON.parse(MealOne);
        console.log(
            "%cI'm using pregenerated data!!",
            'font-size:200%; color:#ffffff; background-color:red;',
        );
    }
    const getIDs = (data) => {
        const out = [];
        data.forEach((day) => {
            day.forEach((meal, i) => {
                if (i < 3) {
                    // console.log(meal._id);
                    out.push(meal._id);
                }
            });
        });
        return out;
    };
    const mealIDs = getIDs(mealData);
    useEffect(() => {
        getGroceryList({ meals: mealIDs }, handleGetGroceryList);
    }, []);
    return (
        <div className="ViewGroceryScreen MainContent">
            <h1>Your Weekly Grocery List</h1>
            {/* {JSON.stringify(grocerylist)} */}
            <Link to="/view">Back to Meal Plan</Link>

            {grocerylist == null ? (
                <p>Loading...</p>
            ) : (
                <GroceryView data={grocerylist} />
            )}
        </div>
    );
};

export default ViewGroceryScreen;
