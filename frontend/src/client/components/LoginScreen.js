import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Header from './Header';
import '../css/LoginScreen.css';

import { navigate } from '@reach/router';
import { Form } from 'semantic-ui-react';
import { login, validate, evtTargetToObject } from '../req/request.js';

const LoginScreen = () => {
    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = evtTargetToObject(evt.target);
        console.log(formData);
        login(formData, data => onReceive(data));
    };

    const onReceive = res => {
        console.log(res);
        if (res.hasOwnProperty('token')) {
            console.log(res.token);
            Cookies.set('token', res.token, { expires: 2 });
            validate(() => navigate('/'));
        } else {
            console.log('fail');
        }
    };

    const [userEmpty, setUserEmpty] = useState(true);
    const [passEmpty, setPassEmpty] = useState(true);

    return (
        <>
            <div className="LoginScreen MainContent">
                <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Username"
                        placeholder="Username"
                        name="email"
                        onChange={u => setUserEmpty(u === '')}
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={p => setPassEmpty(p === '')}
                    />
                    <Form.Button
                        type="submit"
                        disabled={userEmpty || passEmpty}>
                        Login
                    </Form.Button>
                </Form>
            </div>
        </>
    );
};

export default LoginScreen;
