import axios from 'axios';
import { BASE_URL, TOKEN_KEY } from './constants';

const api = axios.create({
	baseURL: BASE_URL
});

export const agent = {
	get: (url, signal) => api.get(url, { signal }),
	getTokenized: (url, signal) => api.get(url, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
		},
		signal
	})
};

export default api;
