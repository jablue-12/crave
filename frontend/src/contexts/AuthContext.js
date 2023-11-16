<<<<<<< HEAD
<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TOKEN_KEY, endpoint } from '../common/constants';
import api, { agent } from './../common/api';
=======
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
>>>>>>> 85a6cf9... Refactor frontend
=======
import React, { createContext, useContext, useState } from 'react';
<<<<<<< HEAD
import { url } from '../common/constants';
import api from './../common/api';
>>>>>>> 55f2d90... Added Axios common logic  and Updated contants
=======
import { endpoint } from '../common/constants';
import api, { agent } from './../common/api';
>>>>>>> 97c8cf1... Refactor UI to fit the model business model

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
<<<<<<< HEAD
	const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);

	useEffect(() => {
		if (token) {
			(async () => {
				try {
					console.log('Logging - AuthProvider');
					console.log(localStorage.getItem(TOKEN_KEY));
					const { data } = await agent.getTokenized(endpoint.USER);
					setUser(data);
				} catch (e) {
					console.error(e);
				}
			})();
		}
	}, []);
=======
	const [token, setToken] = useState(localStorage.getItem('token') || null);
>>>>>>> 85a6cf9... Refactor frontend

	const login = async (e) => {
		e.preventDefault();

		try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			const loginResult = await api.post(endpoint.LOGIN, {
=======
			const { data } = await api.post(url.LOGIN, {
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
			const { data } = await api.post(endpoint.LOGIN, {
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
				email,
				password
			});

<<<<<<< HEAD
			setToken(loginResult.data.token);
			localStorage.setItem(TOKEN_KEY, loginResult.data.token);

			const userResult = await agent.getTokenized(endpoint.USER);
			setUser(userResult.data);
		} catch (e) {
			alert(e);
=======
			const { data } = await axios.post('/auth/login', { email, password });
=======
			const { data } = await api.post(LOGIN_PATH, { email, password });
>>>>>>> 55f2d90... Added Axios common logic  and Updated contants
=======
			// TODO - Handle token null
>>>>>>> 1cd73ca... Add token to axios calls and refactor components

			setToken(data.token);
			localStorage.setItem('token', data.token);

			await getUser();
		} catch (e) {
			alert('Failed to login');
			console.error(e);
>>>>>>> 85a6cf9... Refactor frontend
		}
	};

	const logout = () => {
		setUser(null);
		setFirstName('');
		setLastName('');
		setPassword('');
		setToken(null);
<<<<<<< HEAD
		localStorage.removeItem(TOKEN_KEY);
=======
		localStorage.removeItem('token');
>>>>>>> 85a6cf9... Refactor frontend
	};

	const register = async e => {
		e.preventDefault();

		try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			const registrationResult = await agent.post(endpoint.REGISTRATION, {
=======
			const { data } = await api.post(url.REGISTRATION, {
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
			const { data } = await api.post(endpoint.REGISTRATION, {
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
				firstName,
				lastName,
				email,
				password
			});

<<<<<<< HEAD
			console.log('Logging - regsiter()');
			console.log(registrationResult.data);
		} catch (e) {
			alert(e);
		}
	};

=======
			const { data } = await axios.post('/auth/register', { firstName, lastName, password });
=======
			const { data } = await api.post(REGISTRATION_PATH, { firstName, lastName, password });
>>>>>>> 55f2d90... Added Axios common logic  and Updated contants
=======
			// TODO - Handle token null
>>>>>>> 1cd73ca... Add token to axios calls and refactor components

			setToken(data.token);
			localStorage.setItem('token', data.token);

			await getUser();
		} catch (e) {
			console.error(e);
		}
	};

	const getUser = async () => {
		const { data } = await agent.getTokenized(endpoint.USER);
		console.log('Logging - getUser() - AuthContext');
		console.log(data);
		setUser(data);
	};

>>>>>>> 85a6cf9... Refactor frontend
	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				firstName,
				lastName,
				email,
<<<<<<< HEAD
<<<<<<< HEAD
				password,
				setEmail,
				setFirstName,
				setLastName,
				setPassword,
				setToken,
=======
=======
				password,
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
				setEmail,
				setFirstName,
				setLastName,
				setPassword,
>>>>>>> 85a6cf9... Refactor frontend
				login,
				logout,
				register
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
