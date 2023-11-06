import React, { createContext, useContext, useState } from 'react';
import { url } from '../common/constants';
import api from './../common/api';

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
			const { data } = await api.post(url.LOGIN, {
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
			const { data } = await api.post(url.REGISTRATION, {
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
		const { data } = await api.get(url.USER, {
			auth: {
				firstName,
				lastName,
				password
			}
		});

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
