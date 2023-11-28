import React, { useContext, createContext, useState, useEffect } from 'react';
import { agent } from '../common/api';
import { endpoint } from '../common/constants';
import { defaultDishesOnSale } from '../sample/defaultDishesOnSale';

export const SaleContext = createContext();

export const useSale = () => useContext(SaleContext);

export const SaleProvider = ({ children }) => {
	const [dishesOnSale, setDishesOnSale] = useState([...defaultDishesOnSale]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await agent.get(endpoint.DISHES_ON_SALE);
				setDishesOnSale(data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	return <SaleContext.Provider value={{
		dishesOnSale,
		setDishesOnSale
	}}>
		{children}
	</SaleContext.Provider>;
};

export default SaleProvider;
