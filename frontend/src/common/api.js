import axios from 'axios';
import { BASE_URL, TOKEN_KEY } from './constants';

const api = axios.create({
	baseURL: BASE_URL
});

export const agent = {
	get: (url) => api.get(url),
	post: (url, body) => api.post(url, body),
	getTokenized: (url) => api.get(url, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			'Content-Type': 'application/json'
		}
	}),
	putTokenized: (url, body) => api.put(url, body, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			'Content-Type': 'application/json'
		}
	}),
	postTokenized: (url, body) => api.post(url, body, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
			'Content-Type': 'application/json'
		}
	})
};

export default api;
