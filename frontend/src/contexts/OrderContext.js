<<<<<<< HEAD
<<<<<<< HEAD
import React, { createContext, useContext, useState } from 'react';
import api, { agent } from '../common/api';
import { TOKEN_KEY, endpoint } from '../common/constants';
=======
// OrderContext.js
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD
>>>>>>> abbe86c... Fix backend and frontend issues
=======
import { BASE_URL, TOKEN_KEY } from '../common/constants';
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
import React, { createContext, useContext, useState } from 'react';
import api from '../common/api';
import { TOKEN_KEY, endpoint } from '../common/constants';
>>>>>>> 97c8cf1... Refactor UI to fit the model business model

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
<<<<<<< HEAD
<<<<<<< HEAD

		try {
			const { data } = await api.get(endpoint.ORDERS, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
				}
			});

			console.log('Logging - getOrders()');
			console.log(data);

			setOrders(data);
=======
		try {
			const response = await axios.get('http://localhost:8080/orders');
			setOrders(response.data);
>>>>>>> abbe86c... Fix backend and frontend issues
=======

		try {
			const { data } = await api.get(endpoint.ORDERS, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
				}
			});

			console.log('Logging - getOrders()');
			console.log(data);

			setOrders(data);
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
			setError(null);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	};

<<<<<<< HEAD
<<<<<<< HEAD
	const getOrder = id =>
		orders.find(order => order.id === id);

	const placeOrder = async order => {
		try {
			const { data } = await agent.postTokenized(endpoint.ORDERS, order);

			console.log('Logging - placeOrder');
			console.log(data);

			setOrders((prevOrders) => [order, ...prevOrders]);
=======
	const getOrder = (id) =>
		orders.find((order) => order.id === id);
=======
	const getOrder = id =>
		orders.find(order => order.id === id);
>>>>>>> 1cd73ca... Add token to axios calls and refactor components

	const placeOrder = async order => {
		try {
			const { data } = await api.post(endpoint.ORDERS, order, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
				}
			});

			console.log('Logging - placeOrder');
			console.log(data);

			setOrders((prevOrders) => [...prevOrders, order]);
>>>>>>> abbe86c... Fix backend and frontend issues
			setError(null);
		} catch (e) {
			setError(e);
		}
	};

	const updateOrder = async (id, order) => {
		try {
<<<<<<< HEAD
<<<<<<< HEAD
			const response = await api.put(`/orders/${id}`, order);
=======
			const response = await axios.put(`/orders/${id}`, order);
>>>>>>> abbe86c... Fix backend and frontend issues
=======
			const response = await api.put(`/orders/${id}`, order);
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
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
<<<<<<< HEAD
<<<<<<< HEAD
			await api.delete(`${endpoint.ORDERS}/${id}`);
=======
			await axios.delete(`/orders/${id}`);
>>>>>>> abbe86c... Fix backend and frontend issues
=======
			await api.delete(`${endpoint.ORDERS}/${id}`);
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
			setOrders((prevOrders) => prevOrders.filter(o => o.id !== id));
			setError(null);
		} catch (e) {
			setError(e);
		}
	};

<<<<<<< HEAD
<<<<<<< HEAD
=======
	useEffect(() => {
		getOrders();
	}, []);

>>>>>>> abbe86c... Fix backend and frontend issues
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
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
