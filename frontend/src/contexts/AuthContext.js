import React, { createContext, useContext, useState } from 'react';
import { endpoint } from '../common/constants';
import api, { agent } from './../common/api';

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
	const [token, setToken] = useState(localStorage.getItem('token') || null);

	const login = async (e) => {
		e.preventDefault();

		try {
			const { data } = await api.post(endpoint.LOGIN, {
				email,
				password
			});

			// TODO - Handle token null

			setToken(data.token);
			localStorage.setItem('token', data.token);

			await getUser();
		} catch (e) {
			alert('Failed to login');
			console.error(e);
		}
	};

	const logout = () => {
		setUser(null);
		setFirstName('');
		setLastName('');
		setPassword('');
		setToken(null);
		localStorage.removeItem('token');
	};

	const register = async e => {
		e.preventDefault();

		try {
			const { data } = await api.post(endpoint.REGISTRATION, {
				firstName,
				lastName,
				email,
				password
			});

			// TODO - Handle token null

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

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				firstName,
				lastName,
				email,
				password,
				setEmail,
				setFirstName,
				setLastName,
				setPassword,
				login,
				logout,
				register
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
