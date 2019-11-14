import React from 'react';
import { Link } from '@reach/router';
import '../css/MainScreen.css';

const MainScreen = () => {
    return (
        <div className="MainScreen MainContent">
            <h1>Food as Medicine Initiative</h1>
            <Link to="create">Create Meal Plan</Link>
            <Link to="mission">Our Mission</Link>
            <Link to="login">Log In</Link>
            {/* <button>Log In</button>
            <button>Register</button> */}
        </div>
    );
};

export default MainScreen;
