import React, { createContext, useContext, useState, useEffect } from 'react';
import { TOKEN_KEY, endpoint } from '../common/constants';
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

	const login = async (e) => {
		e.preventDefault();

		try {
			const loginResult = await api.post(endpoint.LOGIN, {
				email,
				password
			});

			setToken(loginResult.data.token);
			localStorage.setItem(TOKEN_KEY, loginResult.data.token);

			const userResult = await agent.getTokenized(endpoint.USER);
			setUser(userResult.data);
		} catch (e) {
			alert(e);
		}
	};

	const logout = () => {
		setUser(null);
		setFirstName('');
		setLastName('');
		setPassword('');
		setToken(null);
		localStorage.removeItem(TOKEN_KEY);
	};

	const register = async e => {
		e.preventDefault();

		try {
			const registrationResult = await agent.post(endpoint.REGISTRATION, {
				firstName,
				lastName,
				email,
				password
			});

			console.log('Logging - regsiter()');
			console.log(registrationResult.data);

			const userResult = await agent.getTokenized(endpoint.USER);
			setUser(userResult.data);
		} catch (e) {
			alert(e);
		}
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
				setToken,
				login,
				logout,
				register
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
