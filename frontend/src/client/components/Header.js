import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { SessionContext, useSessionValue } from '../contexts/SessionState';

import '../css/Header.css';
import GradyLogo from '../img/gradylogo.png';

const Header = () => {
    const [{ data }, dispatch] = useSessionValue();
    const sessionContext = useContext(SessionContext);
    const sessionData = sessionContext[0];
    console.log(sessionData.name);

    const logout = () => {
        localStorage.removeItem('name');
        dispatch({ type: 'logout' });
    };

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
                <a onClick={() => logout()}>
                    <div className="valign link">
                        <p>Logout</p>
                    </div>
                </a>
            ) : (
                <Link to="login">
                    <button>Login / Register</button>
                </Link>
            )}
        </div>
    );
};

export default Header;
