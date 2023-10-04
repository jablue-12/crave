import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RestaurantsContext } from '../contexts/RestaurantsContext';
import RestaurantCard from './RestaurantCard';

const RestaurantsDashboard = () => {
	const { restaurants } = useContext(RestaurantsContext);

	return <Row className="g-4" xs={1} md={2} lg={3}>
		{restaurants.map(restaurant => <Col key={restaurant.id}>
			<RestaurantCard restaurant={restaurant} />
		</Col>)}
	</Row>;
};

export default RestaurantsDashboard;
