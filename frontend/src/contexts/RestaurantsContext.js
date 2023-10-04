import React, { createContext } from 'react';
import { restaurantsData } from './../restaurantsData';

export const RestaurantsContext = createContext({
	restaurants: []
});

export const RestaurantsProvider = ({ children }) => {
	const value = {
		restaurants: restaurantsData
	};

	return <RestaurantsContext.Provider value={value}>
		{children}
	</RestaurantsContext.Provider>;
};
