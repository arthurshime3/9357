import React, { useContext } from 'react';
import { Link, navigate } from '@reach/router';

import { SessionContext, useSessionValue } from '../contexts/SessionState';
import { logout as reqlogout } from '../req/request';

import '../css/Header.css';
import GradyLogo from '../img/gradylogo.png';

const Header = () => {
    const [{ data }, dispatch] = useSessionValue();
    const sessionContext = useContext(SessionContext);
    const sessionData = sessionContext[0];
    console.log(sessionData.name);

    const logout = () => {
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        reqlogout(() => {
            dispatch({ type: 'logout' });
            navigate('/');
        });
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
                <div className="valign">
                    <p>Our Mission</p>
                </div>
            </Link>
            {/* <Link to="login" className="buttonContainer" onClick={() => login()}> */}
            {sessionData.first_name ? (
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
