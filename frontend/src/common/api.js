import axios from 'axios';
<<<<<<< HEAD
<<<<<<< HEAD
import { BASE_URL, TOKEN_KEY } from './constants';
=======
import { BASE_URL } from './constants';
>>>>>>> 55f2d90... Added Axios common logic  and Updated contants
=======
import { BASE_URL, TOKEN_KEY } from './constants';
>>>>>>> 97c8cf1... Refactor UI to fit the model business model

const api = axios.create({
	baseURL: BASE_URL
});

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
>>>>>>> 55f2d90... Added Axios common logic  and Updated contants
=======
export const agent = {
	get: (url, signal) => api.get(url, { signal }),
	getTokenized: (url, signal) => api.get(url, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
		},
		signal
	})
};

>>>>>>> 97c8cf1... Refactor UI to fit the model business model
export default api;
