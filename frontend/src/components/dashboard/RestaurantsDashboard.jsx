import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { requestState } from '../../constants/requestState';
import { RestaurantsContext } from '../../contexts/RestaurantsContext';
import Loader from '../loader/Loader';
import Map from './Map';
import RestaurantCard from './RestaurantCard';

export default function RestaurantsDashboard () {
	const { restaurants, restaurantsRequestStatus } = useContext(RestaurantsContext);

	if (restaurantsRequestStatus === requestState.PENDING) {
		return <Loader />;
	}

	return restaurants && (
		<>
			<Row className="g-4">
				<Col>
					<Map />
				</Col>
			</Row>
			<Row className="g-4" xs={1} md={2} lg={3}>
				{restaurants.map(restaurant => <Col key={restaurant.id}>
					<RestaurantCard restaurant={restaurant} />
				</Col>)}
			</Row>
		</>
	);
}
