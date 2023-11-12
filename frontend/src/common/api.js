import axios from 'axios';
import { BASE_URL, TOKEN_KEY } from './constants';

const api = axios.create({
	baseURL: BASE_URL
});

const headers = {
	Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
};

export const agent = {
	get: (url, signal) => api.get(url, { signal }),
	getTokenized: (url, signal) => api.get(url, {
		headers,
		signal
	}),
	putTokenized: (url, body) => api.put(url, body, {
		headers
	}),
	postTokenized: (url, body) => api.put(url, body, {
		headers
	})
};

export default api;
