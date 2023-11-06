export const SOCKET_URL = 'ws://localhost:8080/ws';

export const BASE_URL = 'http://localhost:5000';
export const LOGIN_PATH = '/auth/login';
export const REGISTRATION_PATH = '/auth/register';
export const USER_PATH = '/user';
export const RESTAURANTS_PATH = '/restaurants';

export const path = {
	LOGIN: '/auth/login',
	REGISTRATION: '/auth/register',
	USER: '/user',
	RESTAURANTS: '/restaurants'
};

export const url = Object.fromEntries(
	Object.keys(path).map(key =>
		[key, BASE_URL + path[key]]));

export const iconColor = '#1E90FF';
export const infoColor = 'lightseagreen';

export const TOKEN_KEY = 'token';

export const color = {
	ICON: '#1E90FF',
	INFO: 'lightseagreen'
};
