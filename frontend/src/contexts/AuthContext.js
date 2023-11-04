import React, { createContext, useContext, useState } from 'react';
import { LOGIN_PATH, REGISTRATION_PATH, USER_PATH } from '../common/constants';
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
			const { data } = await api.post(LOGIN_PATH, { email, password });

			setToken(data);
			localStorage.setItem('token', data);

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
			const { data } = await api.post(REGISTRATION_PATH, { firstName, lastName, password });

			setToken(data);
			localStorage.setItem('token', data);

			await getUser();
		} catch (e) {
			console.error(e);
		}
	};

	const getUser = async () => {
		const { data } = await api.get(USER_PATH, {
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
				setEmail,
				setFirstName,
				setLastName,
				password,
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
