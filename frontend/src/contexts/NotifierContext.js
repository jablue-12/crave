import React, { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BASE_URL } from '../common/constants';

const NotifierContext = createContext();

export const useNotifier = () => {
	return useContext(NotifierContext);
};

export const NotifierProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const [stompClient, setStompClient] = useState(null);

	useEffect(() => {
		const socket = new SockJS(BASE_URL + '/ws');
		const client = Stomp.over(socket);

		client.connect({}, () => {
			client.subscribe('/topic/notifications', ({ body }) => {
				const orderPlaced = JSON.parse(body);
				setNotifications(x => [...x, orderPlaced]);
			});
		});

		setStompClient(client);

		return () => {
			client.disconnect();
		};
	}, []);

	const notifyOrderPlaced = orderInfo => {
		stompClient.send('/app/orderPlaced', {}, JSON.stringify({
			content: 'You order has been placed',
			orderInfo
		}));
	};

	return <NotifierContext.Provider
		value={{
			notifications,
			notifyOrderPlaced
		}}
	>
		{children}
	</NotifierContext.Provider>;
};
