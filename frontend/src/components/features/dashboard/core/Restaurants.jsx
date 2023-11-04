import React from 'react';
import Scrollable from './../../../common/Scrollable';
import RestaurantCard from './RestaurantCard';

const Restaurants = ({ restaurants, setRestaurant }) => {
	return <Scrollable height={700}>
		{restaurants.map(restaurant => (
			<RestaurantCard key={restaurant.place_id} restaurant={restaurant} setRestaurant={setRestaurant} />
		))}
	</Scrollable>;
};

export default Restaurants;
