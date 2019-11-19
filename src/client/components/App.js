import React, { createContext } from 'react';
import { Router } from '@reach/router';
import '../css/App.css';

import MainScreen from './MainScreen';
import CreateMealScreen from './CreateMealScreen';
// import InvalidNavScreen from './InvalidNavScreen';
import MissionScreen from './MissionScreen';
import LoginScreen from './LoginScreen';
import ViewMealScreen from './ViewMealScreen';

import {
    MealDataProvider,
    initMealData,
    mealDataReducer,
} from '../contexts/MealDataState';

function App() {
    return (
        <MealDataProvider initialState={initMealData} reducer={mealDataReducer}>
            <div className="App">
                <Router>
                    <MainScreen path="/" />
                    <CreateMealScreen path="create" />
                    <MissionScreen path="mission" />
                    <LoginScreen path="login" />
                    <ViewMealScreen path="view" />
                    {/* <InvalidNavScreen default /> */}
                </Router>

                <footer>Created by Junior Design #9357</footer>
            </div>
        </MealDataProvider>
    );
}

export default App;
