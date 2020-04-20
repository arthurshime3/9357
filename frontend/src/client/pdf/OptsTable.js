import { inToFtIn } from '../util';
import React from 'react';
import { Text, View } from '@react-pdf/renderer';

const OptsTable = ({ opts, style }) => {
    let useopts = opts;
    if (useopts == null) {
        console.log(
            "%cI'm using pregenerated options!!",
            'font-size:200%; color:#ffffff; background-color:red;',
        );
        useopts = {
            wt: 200,
            ht: 66,
            age: 45,
            bud: 100,
            diet: 'Diabetes',
            gen: 'Male',
        };
    }

    const { wt, ht, age, bud, diet, gen } = useopts;
    console.log(ht);
    console.log(inToFtIn(ht));
    return (
        <View style={{ width: 'auto' }}>
            <View>
                <Text>Weight: {wt} lb</Text>
            </View>
            <View>
                <Text>Height: {inToFtIn(ht)}</Text>
            </View>
            <View>
                <Text>Age: {age}</Text>
            </View>
            <View>
                <Text>Gender: {gen}</Text>
            </View>
            <View>
                <Text>Budget: ${bud}/week</Text>
            </View>
            <View>
                <Text>Dietary Restriction: {diet}</Text>
            </View>
        </View>
    );
};

export default OptsTable;
