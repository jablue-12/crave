export const REQUEST_TIMEOUT = 1000;

const PORT = 5000;
export const SOCKET_URL = `ws://localhost:${PORT}/ws`;
export const BASE_URL = `http://localhost:${PORT}`;
export const endpoint = {
	TAGS: '/tags',
	LOGIN: '/auth/login',
	REGISTRATION: '/auth/register',
	USER: 'auth/user',
	DISHES: '/dishes',
	ORDERS: '/orders',
	COMMENTS: '/comments'
};

export const path = {
	LOGIN: '/auth/login',
	REGISTRATION: '/auth/register',
	USER: 'auth/user',
	RESTAURANTS: '/restaurants',
	ORDERS: '/orders',
	COMMENTS: '/comments'
};

export const iconColor = '#1E90FF';
export const infoColor = 'lightseagreen';

export const TOKEN_KEY = 'token';

export const color = {
	ICON: '#1E90FF',
	INFO: 'lightseagreen',
	user: {
		GUEST: 'red',
		AUTHENTICATED: 'mediumturquoise'
	}
};
