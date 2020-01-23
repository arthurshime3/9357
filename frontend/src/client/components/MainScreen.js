import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { SessionContext } from '../contexts/SessionState';

import Header from './Header';
import '../css/MainScreen.css';

const MainScreen = () => {
    const sessionContext = useContext(SessionContext);
    const sessionData = sessionContext[0];
    console.log(sessionData.name);

    return (
        <>
            <div className="MainScreen MainContent">
                {sessionData.name ? <p>Hey there {sessionData.name}!</p> : null}
                {/* <h1>Food as Medicine Initiative</h1>
                <Link to="create">Create Meal Plan</Link>
                <Link to="mission">Our Mission</Link>
                <Link to="login">Log In</Link> */}
            </div>
        </>
    );
};

export default MainScreen;
