import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL, DASHBOARD_URL } from '../constants/urls';

export default function useRestaurant (id) {
	const [restaurant, setRestaurant] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(BASE_URL + DASHBOARD_URL + `/${id}`);

				setRestaurant(data);
				setLoading(false);
			} catch (e) {
				setError(e);
				setLoading(false);
			}
		})();
	}, [id]);

	return {
		restaurant,
		loading,
		error
	};
};
