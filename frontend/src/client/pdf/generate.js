import React from 'react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import GroceryPDF from './GroceryPDF';

const getGroceryPDF = async (grocerylist) => {
    console.log(grocerylist);
    const blob = await pdf(
        <GroceryPDF title="My PDF" data={grocerylist} />,
    ).toBlob();
    saveAs(blob, 'grocerylist.pdf');
};

export default getGroceryPDF;
