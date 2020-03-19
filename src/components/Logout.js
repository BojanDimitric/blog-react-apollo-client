import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { store } from '../store';

const Logout = () => {
    const { dispatch } = useContext(store);
    
    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('expiry');
        dispatch({ type: 'logout' });
    }, []);

    return <Redirect to='/' />;
};

export default Logout;