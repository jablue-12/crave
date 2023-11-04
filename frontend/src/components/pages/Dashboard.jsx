import axios from 'axios';
import { orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
// import Locator from './Locator';
import Restaurant from '../features/dashboard/core/Restaurant';
import Restaurants from '../features/dashboard/core/Restaurants';

export default function Dashboard () {
	const [restaurants, setRestaurants] = useState([]);
	const [restaurant, setRestaurant] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const baseUrl = 'http://localhost:5000';

		(async () => {
			try {
				const { data } = await axios.get(`${baseUrl}/restaurants`);
				setRestaurants(orderBy(data, ['rating'], ['desc']));
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setIsLoading(false);
			}
		})();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <Row className="mx-5">
		<Col md={3}>
			<h4>MAP</h4>
			{/* <Locator setRestaurants={setRestaurants} setRestaurant={setRestaurant} /> */}
		</Col>
		<Col md={4}>
			<h4>Restaurants</h4>
			<Restaurants restaurants={restaurants} setRestaurant={setRestaurant} />
		</Col>
		<Col md={4} className="mx-4">
			{restaurant && <h4>{restaurant.name}</h4>}
			{restaurant && <Restaurant restaurant={restaurant} />}
		</Col>
	</Row>;
};
