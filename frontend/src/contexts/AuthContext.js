import React, { createContext, useContext, useState, useEffect } from 'react';
import { TOKEN_KEY, endpoint } from '../common/constants';
import api, { agent } from './../common/api';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [verificationSuccess, setVerificationSuccess] = useState(null);
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

	const getLoginSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: 'Login Success',
			messageDescription: 'Welcome back.'
		};
	};
	const getLoginErrorFeedback = () => {
		return {
			variant: 'danger',
			messageHeader: 'Error with Login',
			messageDescription: 'Please try again.'
		};
	};
	const getRegisterSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: 'Registration Success',
			messageDescription: 'Welcome to Crave.'
		};
	};
	const getRegisterErrorFeedback = () => {
		return {
			variant: 'danger',
			messageHeader: 'Error with Registration',
			messageDescription: 'Please try again.'
		};
	};

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

			setVerificationSuccess(getLoginSuccessFeedback);
		} catch (e) {
			console.error(e);
			setVerificationSuccess(getLoginErrorFeedback());
		} finally {
			setTimeout(() => {
				setVerificationSuccess(null);
			}, 3000);
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

			console.log('Logging - register()');
			console.log(registrationResult.data);

			setVerificationSuccess(getRegisterSuccessFeedback);
		} catch (e) {
			console.error(e);
			setVerificationSuccess(getRegisterErrorFeedback);
		} finally {
			setTimeout(() => {
				setVerificationSuccess(null);
			}, 3000);
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
				verificationSuccess,
				setEmail,
				setFirstName,
				setLastName,
				setPassword,
				setToken,
				setVerificationSuccess,
				login,
				logout,
				register
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
