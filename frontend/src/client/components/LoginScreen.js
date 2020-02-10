import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../css/LoginScreen.css';

import { navigate, Link } from '@reach/router';
import { Form } from 'semantic-ui-react';
import { login, getProfile, evtTargetToObject } from '../req/request.js';
import { useSessionValue } from '../contexts/SessionState';

const LoginScreen = () => {
    const [{ data }, dispatch] = useSessionValue();

    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = evtTargetToObject(evt.target);
        console.log(formData);
        login(formData, data => onReceive(data));
    };

    const onReceive = res => {
        console.log(res);
        if (res.status == 200) {
            console.log('success!');
            getProfile(data => {
                localStorage.setItem('first_name', data.first_name);
                localStorage.setItem('last_name', data.last_name);
                dispatch({
                    type: 'add name',
                    first_name: data.first_name,
                    last_name: data.last_name,
                });
                navigate('/');
            });
        } else {
            console.log('fail');
            setWrongUserPass(true);
        }
    };

    const [userEmpty, setUserEmpty] = useState(true);
    const [passEmpty, setPassEmpty] = useState(true);
    const [wrongUserPass, setWrongUserPass] = useState(false);

    return (
        <>
            <div className="LoginScreen MainContent">
                <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Email"
                        placeholder="Email"
                        name="email"
                        error={wrongUserPass}
                        onChange={u => {
                            setUserEmpty(u.target.value === '');
                            setWrongUserPass(false);
                        }}
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        error={wrongUserPass}
                        onChange={p => {
                            setPassEmpty(p.target.value === '');
                            setWrongUserPass(false);
                        }}
                    />
                    <Form.Button
                        type="submit"
                        disabled={userEmpty || passEmpty}>
                        Login
                    </Form.Button>
                </Form>
                <p className="error">
                    {wrongUserPass ? 'Invalid username or password' : ''}
                </p>
                <div className="logininfo">
                    <p>Not registered?</p>
                    <Link to="/register">Create an account here</Link>
                </div>
            </div>
        </>
    );
};

export default LoginScreen;
