import React, { createContext } from 'react';
import { requestState } from '../constants/requestState';
import useRestaurants from '../hooks/useRestaurants';

export const RestaurantsContext = createContext({
	restaurants: [],
	restaurantsRequestStatus: requestState.PENDING
});

export const RestaurantsProvider = ({ children }) => {
	const { records, requestStatus } = useRestaurants();

	const value = {
		restaurants: records,
		restaurantsRequestStatus: requestStatus
	};

	return <RestaurantsContext.Provider value={value}>
		{children}
	</RestaurantsContext.Provider>;
};
