import React from 'react';
import { Container } from 'react-bootstrap';
import Scrollable from './../../../common/Scrollable';
import RestaurantCard from './RestaurantCard';

const DishesList = ({ dishes, setSelectedDish }) => {
	return <Container className="px-4">
		<Scrollable height={330}>
			{dishes.map(restaurant => (
				<RestaurantCard
					key={restaurant.id}
					dish={restaurant}
					setSelectedDish={setSelectedDish}
				/>
			))}
		</Scrollable>
	</Container>;
};

export default DishesList;
