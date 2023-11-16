<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
export const SOCKET_URL = 'ws://localhost:8080/ws';

>>>>>>> 1cd73ca... Add token to axios calls and refactor components
export const BASE_URL = 'http://localhost:5000';
export const LOGIN_PATH = '/auth/login';
export const REGISTRATION_PATH = '/auth/register';
export const USER_PATH = '/user';
export const RESTAURANTS_PATH = '/restaurants';
<<<<<<< HEAD
>>>>>>> 55f2d90... Added Axios common logic  and Updated contants
=======

export const path = {
=======
export const REQUEST_TIMEOUT = 1000;

const PORT = 5000;
export const SOCKET_URL = `ws://localhost:${PORT}/ws`;
export const BASE_URL = `http://localhost:${PORT}`;
export const endpoint = {
	TAGS: '/tags',
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
	LOGIN: '/auth/login',
	REGISTRATION: '/auth/register',
	USER: 'auth/user',
	DISHES: '/dishes',
	ORDERS: '/orders',
	COMMENTS: '/comments'
};

export const iconColor = '#1E90FF';
export const infoColor = 'lightseagreen';
<<<<<<< HEAD
>>>>>>> 9dcfcdc... Add contants and logo image
=======

export const TOKEN_KEY = 'token';

export const color = {
	ICON: '#1E90FF',
	INFO: 'lightseagreen',
	user: {
		GUEST: 'red',
		AUTHENTICATED: 'mediumturquoise'
	}
};
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
