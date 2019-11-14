import React from 'react';
import { Router } from '@reach/router';
import '../css/App.css';

import MainScreen from './MainScreen';
import CreateMealScreen from './CreateMealScreen';
// import InvalidNavScreen from './InvalidNavScreen';
import MissionScreen from './MissionScreen';
import LoginScreen from './LoginScreen';

function App() {
    return (
        <div className="App">
            <Router>
                <MainScreen path="/" />
                <CreateMealScreen path="create" />
                <MissionScreen path="mission" />
                <LoginScreen path="login" />
                {/* <InvalidNavScreen default /> */}
            </Router>

            <footer>Created by Junior Design #9357</footer>
        </div>
    );
}

export default App;
