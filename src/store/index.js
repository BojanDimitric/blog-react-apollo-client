import React, { createContext, useReducer } from 'react';

const initialState = {
    user: null,
    token: null,
    expiry: null
};

const store = createContext(initialState);

const { Provider } = store;

const reducer = (state, action) => {
    switch (action.type) {
        case 'login': 
            return {
                user: action.user,
                token: action.token,
                expiry: action.expiry
            };
        case 'logout': 
            return {
                user: null,
                token: null,
                expiry: null
            };
        default: 
            return state;
    };
};

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>
};

export {
    store,
    StateProvider
};