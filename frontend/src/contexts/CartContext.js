import React, { createContext, useContext, useEffect, useState } from 'react';
import { cartItems } from './../sample/cartItems';
import { useAuth } from './AuthContext';

const getCart = userId => {
	const cart = localStorage.getItem(`cart_${userId || 'default'}`);
	return cart ? JSON.parse(cart) : cartItems;
};

export const CartContext = createContext({
	dishesInCart: [],
	add: () => {},
	removeOne: () => {},
	remove: () => {},
	countDish: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const { user } = useAuth();
	const userId = user ? user.id : null;
	const [dishesInCart, setDishesInCart] = useState(() => getCart(userId));

	useEffect(() => {
		localStorage.setItem(`cart_${userId || 'default'}`, JSON.stringify(dishesInCart));
	}, [dishesInCart]);

	const countDish = (id) => {
		return dishesInCart.find(x => x.id === id)?.quantity ?? 0;
	};

	const add = (dish) => {
		const quantity = countDish(dish.id);

		if (quantity === 0) {
			setDishesInCart(dishes => [...dishes, { ...dish, quantity: 1 }]);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === dish.id
				? { ...x, quantity: x.quantity + 1 }
				: x));
		}
	};

	const removeOne = (id) => {
		const quantity = countDish(id);

		if (quantity === 1) {
			remove(id);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === id
				? { ...x, quantity: x.quantity - 1 }
				: x));
		}
	};

	const remove = (id) => {
		setDishesInCart(dishes => dishes.filter(x => x.id !== id));
	};

	const clear = () => {
		setDishesInCart([]);
		localStorage.removeItem(`cart_${userId || 'default'}`);
	};

	const value = {
		dishesInCart,
		add,
		removeOne,
		remove,
		countDish,
		clear
	};

	return <CartContext.Provider value={value}>
		{children}
	</CartContext.Provider>;
};
