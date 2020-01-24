import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../css/RegisterScreen.css';

import { navigate, Link } from '@reach/router';
import { Form, Label } from 'semantic-ui-react';
import { evtTargetToObject, register } from '../req/request.js';
import { useSessionValue } from '../contexts/SessionState';

const RegisterScreen = () => {
    const [{ data }, dispatch] = useSessionValue();

    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = evtTargetToObject(evt.target);
        console.log(formData);
        setLoading(true);
        register(formData, data => onReceive(data));
    };

    const onReceive = res => {
        setLoading(false);
        console.log(res);
        if (res.hasOwnProperty('id')) {
            navigate('/login');
        }
    };

    const [fieldsEmpty, setFields] = useState([true, true, true, true]);
    const [loading, setLoading] = useState(false);
    const [emailValid, setEmailValid] = useState(true);

    const modifyFieldsEmpty = (index, e) => {
        const newArr = fieldsEmpty.slice(0);
        newArr[index] = e.target.value === '';
        setFields(newArr);
    };

    const isValidEmail = s => {
        return s.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    return (
        <>
            <div className="RegisterScreen MainContent">
                <h1>Register</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="First Name"
                        placeholder="First Name"
                        name="first_name"
                        onChange={u => modifyFieldsEmpty(0, u)}
                    />
                    <Form.Input
                        label="Last Name"
                        placeholder="Last Name"
                        name="last_name"
                        onChange={u => modifyFieldsEmpty(1, u)}
                    />
                    <Form.Input
                        label="Email"
                        placeholder="Email"
                        name="email"
                        error={!emailValid}
                        onChange={u => {
                            modifyFieldsEmpty(2, u);
                            setEmailValid(isValidEmail(u.target.value));
                        }}
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={u => modifyFieldsEmpty(3, u)}
                    />
                    <Form.Button
                        type="submit"
                        disabled={fieldsEmpty.some(x => x) || !emailValid}
                        loading={loading}>
                        Register
                    </Form.Button>
                </Form>
                <p>Already registered?</p>
                <Link to="/login">Login here</Link>
            </div>
        </>
    );
};

export default RegisterScreen;
