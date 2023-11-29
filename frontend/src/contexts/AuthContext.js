import React, { createContext, useContext, useState, useEffect } from 'react';
import { TOKEN_KEY, endpoint } from '../common/constants';
import { restful } from './../common/api';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);

	useEffect(() => {
		if (token) {
			(async () => {
				try {
					const { data } = await restful.auth.json.get(endpoint.USER);
					setUser(data);
				} catch (e) {
					console.error(e);
				}
			})();
		}
	}, []);

	useEffect(() => {
		if (token) {
			(async () => {
				try {
					const { data } = await restful.auth.json.get(endpoint.USER);
					setUser(data);
				} catch (e) {
					console.error(e);
				}
			})();
		}
	}, [token]);

	const logout = () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem('user');
		localStorage.setItem('cart_default', localStorage.getItem(`cart_${user.email}`) ?? []);
		localStorage.removeItem(`cart_${user.email}`);

		setUser(null);
		setToken(null);
	};

	const isEmailValid = (email) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|yahoo\.com|yahoo\.ca|umanitoba\.ca|hotmail\.com|hotmail\.ca|gmail\.ca)$/;
		return emailRegex.test(email);
	};

	return (
		<AuthContext.Provider
			value={{
				isAdmin: user && user.userRole === 'ADMIN',
				token,
				user,
				setToken,
				setUser,
				logout,
				isEmailValid
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
