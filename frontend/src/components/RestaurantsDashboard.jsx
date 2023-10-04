import React, { useContext } from 'react';
import { RestaurantsContext } from '../contexts/RestaurantsContext';
import RestaurantCard from './RestaurantCard';

export default function RestaurantsDashboard () {
	const { restaurants } = useContext(RestaurantsContext);

	return <>
		{restaurants.map(restaurant =>
			<RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
	</>;
}
