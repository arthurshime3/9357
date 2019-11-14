import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../css/CreateMealScreen.css';

import { Form } from 'semantic-ui-react';

import { sendData } from '../req/request.js';

const CreateMealScreen = () => {
    const dietrestrictions = [
        'Gluten-Free',
        'Low FODMAP',
        'Renal Failure',
        'Vegan',
        'Vegetarian',
        'Low-Sodium',
        'Low Cholesterol',
    ];
    const makeOptions = r =>
        r.map(s => ({
            key: s,
            text: s,
            value: s,
        }));
    const dietoptions = makeOptions(dietrestrictions);
    const genderoptions = makeOptions(['Male', 'Female', 'Other']);

    const handleSubmit = evt => {
        evt.preventDefault();
        const data = new FormData(evt.target);

        for (const k in selectedDR) {
            if (Array.isArray(selectedDR[k])) {
                selectedDR[k].forEach(x => {
                    data.append(k, x);
                });
            } else {
                data.append(k, selectedDR[k]);
            }
        }
        for (let [k, v] of data.entries()) {
            console.log(k, v);
        }
        sendData(data);
    };

    let selectedDR = {
        diet: '',
        gen: '',
    };

    const onSelect = (e, value, fieldName) => {
        selectedDR[fieldName] = value;
    };

    return (
        <div className="CreateMealScreen MainContent">
            <h1>Create Meal</h1>

            <Form id="formarea" name="createMealForm" onSubmit={handleSubmit}>
                <Form.Dropdown
                    label="Dietary Restrictions"
                    placeholder="Dietary Restrictions"
                    fluid
                    multiple
                    search
                    selection
                    options={dietoptions}
                    onChange={(e, { value }) => onSelect(e, value, 'diet')}
                />
                <Form.Input
                    label="Weight (lbs)"
                    name="wt"
                    fluid
                    placeholder="Weight"
                    type="number"
                />
                <Form.Input
                    label="Height (in)"
                    name="ht"
                    fluid
                    placeholder="Height"
                    type="number"
                />
                <Form.Dropdown
                    label="Gender"
                    placeholder="Gender"
                    fluid
                    selection
                    options={genderoptions}
                    onChange={(e, { value }) => onSelect(e, value, 'gen')}
                />
                <Form.Button type="submit">Create Meal Plan</Form.Button>
            </Form>
        </div>
    );
};

export default CreateMealScreen;
