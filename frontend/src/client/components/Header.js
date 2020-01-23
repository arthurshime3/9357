import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { SessionContext } from '../contexts/SessionState';

import '../css/Header.css';
import GradyLogo from '../img/gradylogo.png';

const Header = () => {
    const sessionContext = useContext(SessionContext);
    const sessionData = sessionContext[0];
    console.log(sessionData.name);

    return (
        <div className="header">
            <Link to="/">
                <div className="logobox valign">
                    <img src={GradyLogo} className="logoimg" />
                    Food as Medicine Initiative
                </div>
            </Link>
            <Link className="link" to="create">
                <div className="valign">
                    <p>Create Meal Plan</p>
                </div>
            </Link>
            <Link className="link valign" to="mission">
                Our Mission
            </Link>
            {/* <Link to="login" className="buttonContainer" onClick={() => login()}> */}
            {sessionData.name ? (
                <p>Logout</p>
            ) : (
                <Link to="login">
                    <button>Login / Register</button>
                </Link>
            )}
        </div>
    );
};

export default Header;
