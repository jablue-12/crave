import React, { createContext, useContext, useState } from 'react';
import { restful } from '../common/api';
import { endpoint } from '../common/constants';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [isPlaceOrderLoading, setIsPlaceOrderLoading] = useState(false);
	const [placeOrderFeedback, setPlaceOrderFeedback] = useState(null);

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: '',
			messageDescription: 'Your order has been placed.'
		};
	};

	const getErrorFeedback = () => {
		return {
			variant: 'danger',
			messageHeader: '',
			messageDescription: 'There was something wrong with placing an order. Please try again.'
		};
	};

	const getOrders = async () => {
		setLoading(true);

		try {
			const { data } = await restful.auth.json.get(endpoint.ORDERS);

			setOrders(data);
			setError(null);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	};

	const getOrder = id =>
		orders.find(order => order.id === id);

	const placeOrder = async (order, clearCart) => {
		setIsPlaceOrderLoading(true);
		try {
			await restful.auth.json.post(endpoint.ORDERS, order);

			setOrders((prevOrders) => [order, ...prevOrders]);
			setError(null);
			clearCart();
			setPlaceOrderFeedback(getSuccessFeedback);
		} catch (e) {
			setError(e);
			setPlaceOrderFeedback(getErrorFeedback);
		} finally {
			setIsPlaceOrderLoading(false);
			setTimeout(() => {
				setPlaceOrderFeedback(null);
			}, 3000);
		}
	};

	const updateOrder = async (id, order) => {
		try {
			const response = await restful.put(`/orders/${id}`, order);
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
			await restful.delete(`${endpoint.ORDERS}/${id}`);
			setOrders((prevOrders) => prevOrders.filter(o => o.id !== id));
			setError(null);
		} catch (e) {
			setError(e);
		}
	};

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
				deleteOrder,
				isPlaceOrderLoading,
				placeOrderFeedback
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

export default OrderProvider;
