import React, { useContext, createContext, useState } from 'react';
import { defaultDishesOnSale } from '../sample/defaultDishesOnSale';

export const SaleContext = createContext();

export const useSale = () => useContext(SaleContext);

export const SaleProvider = ({ children }) => {
	const [dishesOnSale, setDishesOnSale] = useState([...defaultDishesOnSale]);

	return <SaleContext.Provider value={{
		dishesOnSale,
		setDishesOnSale
	}}>
		{children}
	</SaleContext.Provider>;
};

export default SaleProvider;
