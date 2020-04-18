import React from 'react';
import {
    Page,
    Text,
    Document,
    StyleSheet,
    Font,
    View,
    Image,
} from '@react-pdf/renderer';

import styles from './styles';
import { Table, TR, TD as BaseTD, TT } from './custom';
import OptsTable from './OptsTable';
import MealView from './MealViewPDF';

Font.register({
    family: 'Lato',
    fonts: [
        {
            src:
                'https://fonts.gstatic.com/s/lato/v13/v0SdcGFAl2aezM9Vq_aFTQ.ttf',
        }, // font-style: normal, font-weight: normal
        {
            src:
                'http://fonts.gstatic.com/s/lato/v11/iX_QxBBZLhNj5JHlTzHQzg.ttf',
            fontWeight: 700,
        },
    ],
});

Font.registerHyphenationCallback((word) => ['', word]);

const TD = (props) => <BaseTD style={{ border: 'none' }} {...props}></BaseTD>;

const Day = ({ data, index }) => {
    console.log(data);
    return (
        <View>
            <Text style={styles.heading}>Day {index}</Text>
            {data.map((meal, i) => {
                if (i > 2) return;
                return (
                    <>
                        <Text style={styles.h2}>{meal.title}</Text>
                        <Image
                            src={meal.image}
                            id="meal_img"
                            style={styles.mealimg}
                        />
                    </>
                );
            })}
            {data.map((meal, i) => {
                if (i > 2) return;
                return <MealView key={i} meal={meal} />;
            })}
        </View>
    );
};

export const MealPlanPDF = ({ data, opts }) => {
    console.log(data[0][0]);
    console.log(JSON.stringify(data[0][0]).length);
    console.log(opts);
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.heading}>Your Weekly Meal Plan</Text>

                <Text>The following data was given:</Text>
                <OptsTable opts={opts} />
                <Text style={styles.disclaimer}>
                    This meal plan was created by an automated process. It is an
                    attempt to adhere to your nutritional needs and dietary
                    restrictions. Always consult your doctor or dietician before
                    trying a new diet.
                </Text>
            </Page>
            {data.map((day, i) => (
                <Page style={styles.page}>
                    <Day data={day} index={i + 1} key={i} />
                </Page>
            ))}
        </Document>
    );
};
