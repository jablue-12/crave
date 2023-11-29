import React, { createContext, useContext, useState, useEffect } from 'react';
import { TOKEN_KEY, endpoint } from '../common/constants';
import { restful } from './../common/api';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const formFieldStyle = { boxShadow: 'none' };
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

	const logout = async () => {
		try {
			await restful.auth.json.post(endpoint.LOGOUT);
		} catch (e) {
			console.error(e);
		} finally {
			localStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem('user');
			localStorage.setItem('cart_default', localStorage.getItem(`cart_${user.email}`) ?? []);
			localStorage.removeItem(`cart_${user.email}`);

			setUser(null);
			setToken(null);
		}
	};

	const isEmailValid = (email) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|yahoo\.com|yahoo\.ca|myumanitoba\.ca|hotmail\.com|hotmail\.ca|gmail\.ca)$/;
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
				isEmailValid,
				formFieldStyle
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
