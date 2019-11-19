import React, { createContext, useContext, useReducer } from 'react';

export const MealDataContext = createContext();
export const MealDataProvider = ({ reducer, initialState, children }) => (
    <MealDataContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </MealDataContext.Provider>
);
export const useMealDataValue = () => useContext(MealDataContext);

export const initMealData = { data: {} };
export const mealDataReducer = (state, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'add meal data':
            return {
                ...state,
                data: action.newData,
            };
        default:
            return state;
    }
};