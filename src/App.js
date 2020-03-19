import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Logout from './components/Logout';
import Blogs from './components/Blogs';
import Posts from './components/Posts';
import Post from './components/Post';

import { store } from './store'; 

const App = () => {
	const { state, dispatch } = useContext(store);

	useEffect(() => {
		const token = localStorage.getItem('token');
        if (!token) {
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			localStorage.removeItem('expiry');
			dispatch({ type: 'logout' });
        } else {
            const expiry = new Date(localStorage.getItem('expiry'));
            if (expiry.getTime() <= new Date().getTime()) {
                localStorage.removeItem('user');
				localStorage.removeItem('token');
				localStorage.removeItem('expiry');
				dispatch({ type: 'logout' });
            } else {
				const user = localStorage.getItem('user');
				localStorage.setItem('user', user);
				localStorage.setItem('token', token);
				localStorage.setItem('expiry', expiry);
				dispatch({ type: 'login', user, token, expiry});
				setTimeout(() => {
					localStorage.removeItem('user');
					localStorage.removeItem('token');
					localStorage.removeItem('expiry');
					dispatch({ type: 'logout' });
				}, expiry.getTime() - new Date().getTime());
            };
        };
	}, []);

	let routes = (
		<Switch>
			<Route exact path='/' component={Login} />
			<Route path='/login' component={Login} />
			<Redirect to='/' /> 
		</Switch>
	); 
	if (state.token !== null) {
		routes = (
			<Switch>
				<Route path='/blogs' component={Blogs} />
				<Route path='/posts' component={Posts} />
				<Route path='/post' component={Post} /> 
				<Route path='/logout' component={Logout} />
				<Redirect to='/blogs' /> 
			</Switch>
		);
	};

	return (
		<>
			<Navigation />
			{routes}
		</>			
	);
}

export default App;
