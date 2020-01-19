import React from 'react';
import { navigate } from '@reach/router';
import '../css/BackArrow.css';

const BackArrow = () => {
    return (
        <button className="BackArrow" onClick={() => navigate('/')}>
            <img src="../../public/backarrow.png" />
        </button>
    );
};

export default BackArrow;
