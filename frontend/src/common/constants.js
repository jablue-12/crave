const PORT = 8080;
export const BASE_URL = process.env.REACT_APP_API_URL || `http://localhost:${PORT}`;
export const endpoint = {
	TAGS: '/tags',
	LOGIN: '/auth/login',
	REGISTRATION: '/auth/register',
	USER: 'auth/user',
	DISHES: '/dishes',
	ORDERS: '/orders',
	COMMENTS: '/comments',
	INGREDIENTS: '/ingredients',
	DISHES_ON_SALE: '/sale'
};

export const TOKEN_KEY = 'token';

export const color = {
	ICON: 'rgb(54, 53, 56)',
	INFO: 'rgb(37, 207, 88)',
	user: {
		GUEST: 'rgb(255, 0, 0)',
		AUTHENTICATED: 'rgb(72, 209, 204)'
	}
};

export const iconSize = 28;
