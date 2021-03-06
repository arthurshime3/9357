import React, { createContext } from 'react';
import { Router } from '@reach/router';
import '../css/App.css';

import MainScreen from './MainScreen';
import CreateMealScreen from './CreateMealScreen';
import InvalidNavScreen from './InvalidNavScreen';
import MissionScreen from './MissionScreen';
import LoginScreen from './LoginScreen';
import ViewGroceryScreen from './ViewGroceryScreen';
import ViewMealScreen from './ViewMealScreen';
import RegisterScreen from './RegisterScreen';
import Header from './Header';

import {
    MealDataProvider,
    initMealData,
    mealDataReducer,
} from '../contexts/MealDataState';

import {
    SessionProvider,
    initSession,
    sessionReducer,
} from '../contexts/SessionState';

function App() {
    return (
        <SessionProvider initialState={initSession} reducer={sessionReducer}>
            <MealDataProvider
                initialState={initMealData}
                reducer={mealDataReducer}>
                <div className="App">
                    <Header />
                    <Router>
                        <MainScreen path="/" />
                        <CreateMealScreen path="create" />
                        <MissionScreen path="mission" />
                        <LoginScreen path="login" />
                        <RegisterScreen path="register" />
                        <ViewMealScreen path="view" />
                        <ViewGroceryScreen path="grocery" />
                        <InvalidNavScreen default />
                    </Router>

                    <footer>Created by Junior Design #9357</footer>
                </div>
            </MealDataProvider>
        </SessionProvider>
    );
}

export default App;
