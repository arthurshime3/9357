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
import { LI } from './custom';
import { processGroceryData } from '../components/GroceryView';

const GroceryPDF = (props) => {
    const transformedData = processGroceryData(props.data);
    console.log(transformedData);
    const columns = [];
    const numcols = 2;
    for (let i = 0; i < numcols; i++) {
        columns[i] = [];
    }
    transformedData.forEach((f, i) => {
        columns[i % numcols].push(f);
    });
    console.log(columns);
    return (
        <Document>
            <Page style={styles.page}>
                <Text
                    style={
                        ([styles.heading],
                        { textAlign: 'center', marginBottom: '10pt' })
                    }>
                    Your Weekly Grocery List
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {columns.map((c, i) => (
                        <View
                            key={i}
                            style={{
                                flexDirection: 'column',
                                width: `${100 / numcols}%`,
                            }}>
                            {c.map((item) => (
                                <View
                                    key={item.name}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    {/* <Image
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAhklEQVR4Ae3WEQyAQBiG4SAM8+XLl2u+nMIwCH7nIHfMl7u7LwivF8+uVndr7Xu3B+/fh5cpFbEGA+xlPQrcaoGLaMeIS1VwidQINnoPNtjLNu/+gGDmPTA8KHz/j4M0SIM0SIM0SIM0SIM0SIO+9snv4BI4UCJYjjXBoBm3qjHBImihVJROvyEVCvROqdcAAAAASUVORK5CYII="
                                        style={{
                                            height: '10pt',
                                            width: '10pt',
                                        }}
                                    /> */}
                                    <Text style={{ fontSize: '16' }}>
                                        <Text
                                            style={{
                                                fontFamily: 'Zilla Slab',
                                                fontSize: '20',
                                            }}>
                                            ☐
                                        </Text>
                                        {` ${item.name} ${item.amount} ${item.unit}`}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
                <Text
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    style={{
                        fontSize: '10',
                        position: 'absolute',
                        bottom: '1in',
                        right: '1in',
                    }}
                    fixed
                />
            </Page>
        </Document>
    );
};

export default GroceryPDF;
