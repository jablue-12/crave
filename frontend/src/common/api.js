import axios from 'axios';
import { BASE_URL, TOKEN_KEY } from './constants';

const api = axios.create({
	baseURL: BASE_URL
});

const header = {
	auth: () => ({
		Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
	}),
	json: {
		'Content-Type': 'application/json'
	},
	form: {
		'Content-Type': 'multipart/form-data'
	}
};

const headers = {
	auth: {
		json: () => ({
			headers: {
				...header.auth(),
				...header.json
			}
		}),
		form: () => ({
			headers: {
				...header.auth(),
				...header.form
			}
		})
	}
};

export const restful = {
	get: url => api.get(url),
	post: (url, body) => api.post(url, body),
	put: (url, body) => api.post(url, body),
	delete: url => api.delete(url),
	auth: {
		json: {
			get: url => api.get(url, headers.auth.json()),
			post: (url, body) => api.post(url, body, headers.auth.json()),
			put: (url, body) => api.put(url, body, headers.auth.json())
		},
		form: {
			post: (url, body) => api.post(url, body, headers.auth.form())
		}
	}
};
