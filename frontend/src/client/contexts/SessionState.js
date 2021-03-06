import React, { createContext, useContext, useReducer } from 'react';

export const SessionContext = createContext();
export const SessionProvider = ({ reducer, initialState, children }) => (
    <SessionContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SessionContext.Provider>
);
export const useSessionValue = () => useContext(SessionContext);

export const initSession = localStorage.getItem('first_name')
    ? {
          first_name: localStorage.getItem('first_name'),
          last_name: localStorage.getItem('last_name'),
      }
    : {};
export const sessionReducer = (state, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'add name':
            return {
                ...state,
                first_name: action.first_name,
                last_name: action.last_name,
            };
        case 'logout':
            console.log('attempting to erase session state');
            return {};
        default:
            return state;
    }
};
