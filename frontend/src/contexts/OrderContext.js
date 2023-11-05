// OrderContext.js
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
	return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getOrders = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:8080/orders');
			setOrders(response.data);
			setError(null);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	};

	const getOrder = (id) =>
		orders.find((order) => order.id === id);

	const placeOrder = async (order) => {
		try {
			const { data } = await axios.post('http://localhost:8080/orders', order);
			console.log(data);
			setOrders((prevOrders) => [...prevOrders, order]);
			setError(null);
		} catch (e) {
			setError(e);
		}
	};

	const updateOrder = async (id, order) => {
		try {
			const response = await axios.put(`/orders/${id}`, order);
			setOrders((prevOrders) => {
				const updatedOrders = prevOrders.map((order) =>
					order.id === id ? response.data : order
				);
				return updatedOrders;
			});
			setError(null);
		} catch (e) {
			setError(e);
		}
	};

	const deleteOrder = async (id) => {
		try {
			await axios.delete(`/orders/${id}`);
			setOrders((prevOrders) => prevOrders.filter(o => o.id !== id));
			setError(null);
		} catch (e) {
			setError(e);
		}
	};

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<OrderContext.Provider
			value={{
				orders,
				loading,
				error,
				getOrders,
				getOrder,
				placeOrder,
				updateOrder,
				deleteOrder
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

export default OrderProvider;
