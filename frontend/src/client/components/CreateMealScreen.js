import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../css/CreateMealScreen.css';

import { Form } from 'semantic-ui-react';

import {
    sendData,
    formDataToObject,
    getDietaryRestrictions,
} from '../req/request.js';

import { navigate } from '@reach/router';

import { useMealDataValue } from '../contexts/MealDataState';
import BackArrow from './BackArrow';

const dietrestrictions = [
    'Gluten-Free',
    'Low FODMAP',
    'Vegan',
    'Vegetarian',
    'Low Sodium',
    'Low Cholesterol',
    'Low Fat',
    'Shellfish Allergy',
    'Nut Allergy',
];
const makeOptions = (r) =>
    r.map((s) => ({
        key: s,
        text: s,
        value: s,
    }));

const genderoptions = makeOptions(['Male', 'Female']);

const CreateMealScreen = (props) => {
    const [{ data }, dispatch] = useMealDataValue();
    const [dietrestrictions, setdietrestrictions] = useState([]);
    const handleGetDietRestrictions = (data) => {
        setdietrestrictions(makeOptions(data));
    };

    useEffect(() => {
        getDietaryRestrictions(handleGetDietRestrictions);
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const outData = { ...formDataToObject(formData), ...selectedDR };

        console.log(outData);
        const onSuccess = (data) => {
            dispatch({
                type: 'add meal data',
                newData: data,
            });

            navigate(`/view`, { state: { opts: outData } });
        };
        sendData(outData, (val) => onSuccess(val));
    };

    let selectedDR = {
        diet: props?.location?.state?.opts?.diet,
        gen: props?.location?.state?.opts?.gen,
    };

    const onSelect = (e, value, fieldName) => {
        selectedDR[fieldName] = value;
    };

    console.log(
        `we have the following saved: ${JSON.stringify(
            props?.location?.state?.opts,
        )}`,
    );

    return (
        <div className="CreateMealScreen MainContent">
            <h1>Create Meal</h1>

            <Form id="formarea" name="createMealForm" onSubmit={handleSubmit}>
                <Form.Dropdown
                    label="Dietary Restriction"
                    placeholder="Dietary Restriction"
                    fluid
                    search
                    selection
                    options={dietrestrictions}
                    onChange={(e, { value }) => onSelect(e, value, 'diet')}
                    defaultValue={props?.location?.state?.opts?.diet}
                />
                <Form.Input
                    label="Weight (lbs)"
                    name="wt"
                    fluid
                    placeholder="Weight"
                    type="number"
                    value={props?.location?.state?.opts?.wt}
                    min={70}
                />
                <Form.Input
                    label="Height (in)"
                    name="ht"
                    fluid
                    placeholder="Height"
                    type="number"
                    value={props?.location?.state?.opts?.ht}
                    min={36}
                />
                <Form.Dropdown
                    label="Gender"
                    placeholder="Gender"
                    fluid
                    search
                    selection
                    options={genderoptions}
                    onChange={(e, { value }) => onSelect(e, value, 'gen')}
                    defaultValue={props?.location?.state?.opts?.gen}
                />
                <Form.Input
                    label="Age"
                    name="age"
                    fluid
                    placeholder="Age"
                    type="number"
                    value={props?.location?.state?.opts?.age}
                    min={1}
                />
                <Form.Input
                    label="Budget ($)"
                    name="bud"
                    fluid
                    placeholder="Budget"
                    type="number"
                    value={props?.location?.state?.opts?.bud}
                    min={1}
                />
                <Form.Button type="submit">Create Meal Plan</Form.Button>
            </Form>
        </div>
    );
};

export default CreateMealScreen;
