import React, { useContext } from 'react';
import { RestaurantsContext } from '../contexts/RestaurantsContext';

export default function RestaurantsDashboard () {
	const { restaurants } = useContext(RestaurantsContext);

	return <>
		{restaurants.map(restaurant => <div key={restaurant.id}>{restaurant.name}</div>)}
	</>;
}
