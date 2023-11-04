import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

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
			const { data } = await axios.post('/auth/login', { email, password });

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
			const { data } = await axios.post('/auth/register', { firstName, lastName, password });

			setToken(data);
			localStorage.setItem('token', data);

			await getUser();
		} catch (e) {
			console.error(e);
		}
	};

	const getUser = async () => {
		const { data } = await axios.get('/user', {
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
