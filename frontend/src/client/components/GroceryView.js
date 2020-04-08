import React from 'react';
import '../css/GroceryView.css';

const processGroceryData = (data) => {
    const out = [];

    for (const name in data) {
        out.push({
            name: name,
            ...data[name],
        });
    }

    return out.sort((a, b) => (a.name <= b.name ? -1 : 1));
};

const GroceryView = (props) => {
    const makeGroceryBox = (ingredients) => {
        return (
            <div>
                <ul>
                    {ingredients.map((i) => {
                        return (
                            <li key={i.name}>
                                {i.name} {i.amount} {i.unit}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };
    const transformedData = processGroceryData(props.data);
    console.log(transformedData);

    return <div>{makeGroceryBox(transformedData)}</div>;
};

export default GroceryView;
