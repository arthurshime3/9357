import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: 'auto',
        flexDirection: 'column',
        fontFamily: 'Lato',
        padding: '1in',
    },
    heading: { fontSize: '24', fontWeight: 'bold' },
    h2: { fontSize: '20', fontWeight: 'bold' },
    h3: { fontSize: '16', fontWeight: 'bold' },
    th: { fontSize: '10', fontWeight: 'bold' },
    td: { fontSize: '10' },
    mealimg: { width: '30vw' },
    disclaimer: { fontSize: '10' },
});

export default styles;
