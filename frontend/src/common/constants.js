export const REQUEST_TIMEOUT = 1000;

const PORT = 8080;
export const SOCKET_URL = `ws://localhost:${PORT}/ws`;
export const BASE_URL = `http://localhost:${PORT}`;
export const endpoint = {
	TAGS: '/tags',
	LOGIN: '/auth/login',
	REGISTRATION: '/auth/register',
	USER: 'auth/user',
	DISHES: '/dishes',
	ORDERS: '/orders',
	COMMENTS: '/comments',
	INGREDIENTS: '/ingredients'
};

export const path = {
	LOGIN: '/auth/login',
	REGISTRATION: '/auth/register',
	USER: 'auth/user',
	RESTAURANTS: '/restaurants',
	ORDERS: '/orders',
	COMMENTS: '/comments'
};

export const iconColor = 'rgb(30, 144, 255)';
export const infoColor = 'rgb(32, 178, 170)';

export const TOKEN_KEY = 'token';

export const color = {
	ICON: 'rgb(30, 144, 255)',
	INFO: 'rgb(32, 178, 170)',
	user: {
		GUEST: 'rgb(255, 0, 0)',
		AUTHENTICATED: 'rgb(72, 209, 204)'
	}
};
